// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title RoyaltyNFT
 * @dev NFT with Recency-Weighted Royalty Distribution
 * 
 * Key Features:
 * - Minting with initial price
 * - Automatic price increase (10% per sale)
 * - Recency-weighted royalty sharing (10% of sale)
 * - Complete ownership history tracking
 * - Transparent royalty distribution
 */
contract RoyaltyNFT is ERC721, Ownable {
    
    // ============ Structs ============
    
    struct OwnershipRecord {
        address owner;
        uint256 level;      // 1 = most recent, 2 = second, etc.
        uint256 timestamp;
    }
    
    struct RoyaltyShare {
        address owner;
        uint256 level;
        uint256 weight;
        uint256 share;      // in wei
    }
    
    // ============ State Variables ============
    
    // Token ID to current price
    mapping(uint256 => uint256) public tokenPrices;
    
    // Token ID to ownership history
    mapping(uint256 => OwnershipRecord[]) public ownershipHistory;
    
    // Token ID to total royalty pool collected
    mapping(uint256 => uint256) public royaltyPools;
    
    // Constants
    uint256 public constant ROYALTY_PERCENTAGE = 10; // 10%
    uint256 public constant PRICE_INCREMENT = 10;    // 10%
    
    uint256 private _tokenIdCounter;
    
    // ============ Events ============
    
    event NFTMinted(
        uint256 indexed tokenId,
        address indexed minter,
        uint256 price
    );
    
    event NFTBought(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed buyer,
        uint256 price
    );
    
    event RoyaltyPaid(
        uint256 indexed tokenId,
        address indexed recipient,
        uint256 amount
    );
    
    // ============ Constructor ============
    
    constructor() ERC721("RoyaltyNFT", "RNFT") Ownable(msg.sender) {}
    
    // ============ Public Functions ============
    
    /**
     * @dev Mint a new NFT with initial price
     * @param initialPrice Initial price in wei
     */
    function mintNFT(uint256 initialPrice) external returns (uint256) {
        require(initialPrice > 0, "Price must be greater than 0");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(msg.sender, tokenId);
        tokenPrices[tokenId] = initialPrice;
        
        // Record initial ownership
        ownershipHistory[tokenId].push(
            OwnershipRecord({
                owner: msg.sender,
                level: 1,
                timestamp: block.timestamp
            })
        );
        
        emit NFTMinted(tokenId, msg.sender, initialPrice);
        
        return tokenId;
    }
    
    /**
     * @dev Buy an NFT - handles transfer, royalty distribution, and price update
     * @param tokenId Token ID to purchase
     */
    function buyNFT(uint256 tokenId) external payable {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        
        address seller = ownerOf(tokenId);
        require(seller != msg.sender, "Cannot buy your own NFT");
        
        uint256 price = tokenPrices[tokenId];
        require(msg.value >= price, "Insufficient payment");
        
        // Calculate royalty (10% of price)
        uint256 royaltyAmount = (price * ROYALTY_PERCENTAGE) / 100;
        uint256 sellerAmount = price - royaltyAmount;
        
        // Distribute royalties to previous owners
        _distributeRoyalties(tokenId, royaltyAmount);
        
        // Pay seller (90% of price)
        (bool sellerPaid, ) = payable(seller).call{value: sellerAmount}("");
        require(sellerPaid, "Seller payment failed");
        
        // Transfer NFT
        _transfer(seller, msg.sender, tokenId);
        
        // Update ownership history (increase all levels, add new owner at level 1)
        _updateOwnershipHistory(tokenId, msg.sender);
        
        // Increase price by 10%
        tokenPrices[tokenId] = price + (price * PRICE_INCREMENT) / 100;
        
        // Add to royalty pool tracking
        royaltyPools[tokenId] += royaltyAmount;
        
        emit NFTBought(tokenId, seller, msg.sender, price);
        
        // Refund excess payment
        if (msg.value > price) {
            (bool refunded, ) = payable(msg.sender).call{value: msg.value - price}("");
            require(refunded, "Refund failed");
        }
    }
    
    /**
     * @dev Get current price of NFT
     */
    function getCurrentPrice(uint256 tokenId) external view returns (uint256) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return tokenPrices[tokenId];
    }
    
    /**
     * @dev Get complete ownership history for an NFT
     */
    function getOwnershipHistory(uint256 tokenId) 
        external 
        view 
        returns (OwnershipRecord[] memory) 
    {
        return ownershipHistory[tokenId];
    }
    
    /**
     * @dev Get royalty distribution breakdown for current sale
     * Returns array of shares each previous owner would receive
     */
    function getRoyaltyPool(uint256 tokenId) 
        external 
        view 
        returns (RoyaltyShare[] memory) 
    {
        OwnershipRecord[] memory history = ownershipHistory[tokenId];
        
        // Exclude current owner (they don't get royalties from their own sale)
        uint256 eligibleOwners = history.length - 1;
        
        if (eligibleOwners == 0) {
            return new RoyaltyShare[](0);
        }
        
        RoyaltyShare[] memory shares = new RoyaltyShare[](eligibleOwners);
        
        // Calculate total weight (sum of all levels except current owner)
        uint256 totalWeight = 0;
        for (uint256 i = 0; i < eligibleOwners; i++) {
            totalWeight += history[i].level;
        }
        
        // Calculate individual shares
        uint256 currentPrice = tokenPrices[tokenId];
        uint256 royaltyAmount = (currentPrice * ROYALTY_PERCENTAGE) / 100;
        
        for (uint256 i = 0; i < eligibleOwners; i++) {
            uint256 weight = history[i].level;
            uint256 share = (royaltyAmount * weight) / totalWeight;
            
            shares[i] = RoyaltyShare({
                owner: history[i].owner,
                level: history[i].level,
                weight: weight,
                share: share
            });
        }
        
        return shares;
    }
    
    /**
     * @dev Get total royalties collected for this NFT
     */
    function getTotalRoyalties(uint256 tokenId) external view returns (uint256) {
        return royaltyPools[tokenId];
    }
    
    // ============ Internal Functions ============
    
    /**
     * @dev Distribute royalties to previous owners based on recency weighting
     */
    function _distributeRoyalties(uint256 tokenId, uint256 royaltyAmount) internal {
        OwnershipRecord[] memory history = ownershipHistory[tokenId];
        
        // Skip if only one owner (no one to pay royalties to)
        if (history.length <= 1) {
            return;
        }
        
        // Calculate total weight (exclude current owner at index length-1)
        uint256 totalWeight = 0;
        for (uint256 i = 0; i < history.length - 1; i++) {
            totalWeight += history[i].level;
        }
        
        // Distribute to each previous owner
        for (uint256 i = 0; i < history.length - 1; i++) {
            uint256 weight = history[i].level;
            uint256 share = (royaltyAmount * weight) / totalWeight;
            
            if (share > 0) {
                (bool sent, ) = payable(history[i].owner).call{value: share}("");
                require(sent, "Royalty payment failed");
                
                emit RoyaltyPaid(tokenId, history[i].owner, share);
            }
        }
    }
    
    /**
     * @dev Update ownership history when NFT is sold
     * Increments all existing levels and adds new owner at level 1
     */
    function _updateOwnershipHistory(uint256 tokenId, address newOwner) internal {
        // Increment all existing owner levels
        for (uint256 i = 0; i < ownershipHistory[tokenId].length; i++) {
            ownershipHistory[tokenId][i].level++;
        }
        
        // Add new owner at level 1
        ownershipHistory[tokenId].push(
            OwnershipRecord({
                owner: newOwner,
                level: 1,
                timestamp: block.timestamp
            })
        );
    }
    
    /**
     * @dev Get total supply of minted NFTs
     */
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }
}
