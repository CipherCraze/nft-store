const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RoyaltyNFT", function () {
  let royaltyNFT;
  let owner, buyer1, buyer2, buyer3;
  let initialPrice;

  beforeEach(async function () {
    // Get signers
    [owner, buyer1, buyer2, buyer3] = await ethers.getSigners();

    // Deploy contract
    const RoyaltyNFT = await ethers.getContractFactory("RoyaltyNFT");
    royaltyNFT = await RoyaltyNFT.deploy();
    await royaltyNFT.waitForDeployment();

    // Set initial price (1 ETH)
    initialPrice = ethers.parseEther("1.0");
  });

  describe("Minting", function () {
    it("Should mint NFT with correct initial price", async function () {
      const tx = await royaltyNFT.connect(owner).mintNFT(initialPrice);
      await tx.wait();

      const price = await royaltyNFT.getCurrentPrice(0);
      expect(price).to.equal(initialPrice);
    });

    it("Should record ownership history on mint", async function () {
      await royaltyNFT.connect(owner).mintNFT(initialPrice);

      const history = await royaltyNFT.getOwnershipHistory(0);
      expect(history.length).to.equal(1);
      expect(history[0].owner).to.equal(owner.address);
      expect(history[0].level).to.equal(1);
    });

    it("Should emit NFTMinted event", async function () {
      await expect(royaltyNFT.connect(owner).mintNFT(initialPrice))
        .to.emit(royaltyNFT, "NFTMinted")
        .withArgs(0, owner.address, initialPrice);
    });
  });

  describe("Buying NFTs", function () {
    beforeEach(async function () {
      // Mint NFT first
      await royaltyNFT.connect(owner).mintNFT(initialPrice);
    });

    it("Should transfer NFT and pay seller", async function () {
      const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);

      await royaltyNFT.connect(buyer1).buyNFT(0, { value: initialPrice });

      const newOwner = await royaltyNFT.ownerOf(0);
      expect(newOwner).to.equal(buyer1.address);

      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
      const sellerAmount = initialPrice * 90n / 100n; // 90% of price
      expect(ownerBalanceAfter - ownerBalanceBefore).to.equal(sellerAmount);
    });

    it("Should increase price by 10%", async function () {
      await royaltyNFT.connect(buyer1).buyNFT(0, { value: initialPrice });

      const newPrice = await royaltyNFT.getCurrentPrice(0);
      const expectedPrice = initialPrice * 110n / 100n;
      expect(newPrice).to.equal(expectedPrice);
    });

    it("Should update ownership history correctly", async function () {
      await royaltyNFT.connect(buyer1).buyNFT(0, { value: initialPrice });

      const history = await royaltyNFT.getOwnershipHistory(0);
      expect(history.length).to.equal(2);
      
      // Original owner should now be level 2
      expect(history[0].level).to.equal(2);
      expect(history[0].owner).to.equal(owner.address);
      
      // New owner should be level 1
      expect(history[1].level).to.equal(1);
      expect(history[1].owner).to.equal(buyer1.address);
    });
  });

  describe("Royalty Distribution", function () {
    beforeEach(async function () {
      // Mint NFT
      await royaltyNFT.connect(owner).mintNFT(initialPrice);
      // First sale: owner → buyer1
      await royaltyNFT.connect(buyer1).buyNFT(0, { value: initialPrice });
    });

    it("Should distribute royalties on second sale", async function () {
      const price1 = await royaltyNFT.getCurrentPrice(0);
      const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);

      // Second sale: buyer1 → buyer2
      await royaltyNFT.connect(buyer2).buyNFT(0, { value: price1 });

      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
      const royaltyReceived = ownerBalanceAfter - ownerBalanceBefore;

      // Owner should receive 10% royalty
      const expectedRoyalty = price1 * 10n / 100n;
      expect(royaltyReceived).to.equal(expectedRoyalty);
    });

    it("Should distribute recency-weighted royalties on third sale", async function () {
      const price1 = await royaltyNFT.getCurrentPrice(0);
      
      // Second sale: buyer1 → buyer2
      await royaltyNFT.connect(buyer2).buyNFT(0, { value: price1 });

      const price2 = await royaltyNFT.getCurrentPrice(0);

      const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
      const buyer1BalanceBefore = await ethers.provider.getBalance(buyer1.address);

      // Third sale: buyer2 → buyer3
      await royaltyNFT.connect(buyer3).buyNFT(0, { value: price2 });

      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
      const buyer1BalanceAfter = await ethers.provider.getBalance(buyer1.address);

      // Calculate expected royalties (recency-weighted)
      const totalRoyalty = price2 * 10n / 100n;
      const totalWeight = 3n + 2n; // owner (level 3) + buyer1 (level 2)
      
      const ownerShare = (totalRoyalty * 3n) / totalWeight;
      const buyer1Share = (totalRoyalty * 2n) / totalWeight;

      expect(ownerBalanceAfter - ownerBalanceBefore).to.equal(ownerShare);
      expect(buyer1BalanceAfter - buyer1BalanceBefore).to.equal(buyer1Share);
    });

    it("Should emit RoyaltyPaid events", async function () {
      const price1 = await royaltyNFT.getCurrentPrice(0);

      await expect(royaltyNFT.connect(buyer2).buyNFT(0, { value: price1 }))
        .to.emit(royaltyNFT, "RoyaltyPaid");
    });
  });

  describe("View Functions", function () {
    it("Should return correct royalty pool breakdown", async function () {
      await royaltyNFT.connect(owner).mintNFT(initialPrice);
      await royaltyNFT.connect(buyer1).buyNFT(0, { value: initialPrice });

      const shares = await royaltyNFT.getRoyaltyPool(0);
      expect(shares.length).to.equal(1);
      expect(shares[0].owner).to.equal(owner.address);
      expect(shares[0].level).to.equal(2);
    });

    it("Should track total royalties collected", async function () {
      await royaltyNFT.connect(owner).mintNFT(initialPrice);
      
      const price1 = initialPrice;
      await royaltyNFT.connect(buyer1).buyNFT(0, { value: price1 });

      const totalRoyalties = await royaltyNFT.getTotalRoyalties(0);
      const expectedRoyalty = price1 * 10n / 100n;
      
      expect(totalRoyalties).to.equal(expectedRoyalty);
    });
  });

  describe("Edge Cases", function () {
    it("Should revert if buying non-existent token", async function () {
      await expect(
        royaltyNFT.connect(buyer1).buyNFT(999, { value: initialPrice })
      ).to.be.revertedWith("Token does not exist");
    });

    it("Should revert if buying own NFT", async function () {
      await royaltyNFT.connect(owner).mintNFT(initialPrice);

      await expect(
        royaltyNFT.connect(owner).buyNFT(0, { value: initialPrice })
      ).to.be.revertedWith("Cannot buy your own NFT");
    });

    it("Should revert if insufficient payment", async function () {
      await royaltyNFT.connect(owner).mintNFT(initialPrice);

      const insufficientAmount = initialPrice / 2n;
      await expect(
        royaltyNFT.connect(buyer1).buyNFT(0, { value: insufficientAmount })
      ).to.be.revertedWith("Insufficient payment");
    });

    it("Should refund excess payment", async function () {
      await royaltyNFT.connect(owner).mintNFT(initialPrice);

      const excessAmount = initialPrice * 2n;
      const balanceBefore = await ethers.provider.getBalance(buyer1.address);

      const tx = await royaltyNFT.connect(buyer1).buyNFT(0, { value: excessAmount });
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;

      const balanceAfter = await ethers.provider.getBalance(buyer1.address);
      const spent = balanceBefore - balanceAfter;

      // Should only spend price + gas, excess refunded
      expect(spent).to.be.closeTo(initialPrice + gasUsed, ethers.parseEther("0.001"));
    });
  });
});
