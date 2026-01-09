// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract RoyaltyNFT is ERC721 {

    uint256 public tokenCounter;
    uint256 public royaltyPercent = 10;

    struct OwnerInfo {
        address owner;
        uint256 level;
    }

    mapping(uint256 => OwnerInfo[]) public ownershipHistory;
    mapping(uint256 => uint256) public currentPrice;

    constructor() ERC721("RoyaltyNFT", "RNFT") {
        tokenCounter = 0;
    }

    function mintNFT(uint256 initialPrice) public {
        require(initialPrice > 0, "Price must be > 0");

        uint256 tokenId = tokenCounter;

        _safeMint(msg.sender, tokenId);

        ownershipHistory[tokenId].push(
            OwnerInfo(msg.sender, 1)
        );

        currentPrice[tokenId] = initialPrice;
        tokenCounter++;
    }

    function buyNFT(uint256 tokenId) public payable {
        require(msg.value >= currentPrice[tokenId], "Insufficient payment");

        address seller = ownerOf(tokenId);
        uint256 previousPrice = currentPrice[tokenId];

        uint256 royaltyPool = (previousPrice * royaltyPercent) / 100;

        _distributeRoyalty(tokenId, royaltyPool);

        payable(seller).transfer(msg.value - royaltyPool);

        _transfer(seller, msg.sender, tokenId);

        ownershipHistory[tokenId].push(
            OwnerInfo(msg.sender, ownershipHistory[tokenId].length + 1)
        );

        currentPrice[tokenId] = (currentPrice[tokenId] * 110) / 100;
    }

    function _distributeRoyalty(uint256 tokenId, uint256 royaltyPool) internal {
        OwnerInfo[] memory history = ownershipHistory[tokenId];
        uint256 sumLevels = 0;

        for (uint i = 0; i < history.length - 1; i++) {
            sumLevels += history[i].level;
        }

        for (uint i = 0; i < history.length - 1; i++) {
            uint256 share = (royaltyPool * history[i].level) / sumLevels;
            payable(history[i].owner).transfer(share);
        }
    }
}
