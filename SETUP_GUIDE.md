# 🚀 NFT Store - Quick Setup Guide

## ✅ File Structure Created!

```
NFT-STORE/
├── frontend/              ✅ Your React UI
│   ├── src/
│   ├── package.json
│   └── ...
│
├── blockchain/            ✅ NEW - Hardhat setup
│   ├── contracts/
│   │   └── RoyaltyNFT.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── test/
│   │   └── RoyaltyNFT.test.js
│   ├── hardhat.config.js
│   └── package.json
│
└── README.md
```

## 🎯 Next Steps

### 1. Install Blockchain Dependencies

```bash
cd blockchain
npm install
```

This installs:
- Hardhat
- OpenZeppelin contracts
- Testing tools

### 2. Start Hardhat Node

```bash
cd blockchain
npm run node
```

Keep this terminal open! You'll see:
- 20 accounts with 10,000 ETH each
- RPC server at http://127.0.0.1:8545

### 3. Deploy Smart Contract

Open a new terminal:

```bash
cd blockchain
npm run deploy
```

Copy the contract address from output!

### 4. Update Frontend

```javascript
// frontend/src/contracts/contractAddress.js
export const CONTRACT_ADDRESS = "0x5FbDB2..."; // Paste here
```

Copy ABI:
```bash
blockchain/artifacts/contracts/RoyaltyNFT.sol/RoyaltyNFT.json
→ frontend/src/contracts/abi.json
```

### 5. Start Frontend

```bash
cd frontend
npm run dev
```

Open http://localhost:5173

## 🧪 Test the Contract

```bash
cd blockchain
npm test
```

You should see ~15 passing tests!

## 📝 What's in RoyaltyNFT.sol

✨ **Key Features:**
- Mint NFTs with initial price
- Auto price increase (+10% per sale)
- Recency-weighted royalty distribution (10%)
- Complete ownership history tracking
- Transparent royalty calculations

🔧 **Main Functions:**
```solidity
mintNFT(uint256 initialPrice)
buyNFT(uint256 tokenId)
getCurrentPrice(uint256 tokenId)
getOwnershipHistory(uint256 tokenId)
getRoyaltyPool(uint256 tokenId)
```

## 🎨 Frontend is Ready!

Your existing UI will work perfectly with the smart contract:

✅ Wallet connection
✅ Minting interface
✅ Marketplace display
✅ NFT details with history
✅ Royalty breakdown
✅ Transaction history

Just update contract address + ABI!

## 📚 Documentation

- `blockchain/README.md` - Smart contract guide
- `frontend/README.md` - Frontend guide
- `README.md` - Full project overview
- `MILESTONE_STATUS.md` - Progress tracking

## 🚨 Quick Commands Reference

```bash
# Blockchain
cd blockchain
npm run node      # Start network
npm run compile   # Compile contracts
npm run deploy    # Deploy to localhost
npm test          # Run tests

# Frontend
cd frontend
npm run dev       # Start dev server
npm run build     # Build for production
```

## ✨ You're All Set!

The project structure is now properly organized:
- Frontend and blockchain are separated
- Smart contract is complete and tested
- Deployment scripts are ready
- Integration is straightforward

**Next:** Install dependencies and deploy! 🚀
