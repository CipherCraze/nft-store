# 🔗 NFT Store - Blockchain

Smart contracts for NFT Store with Recency-Weighted Royalty Sharing system.

## 📁 Structure

```
blockchain/
├── contracts/
│   └── RoyaltyNFT.sol      # Main NFT contract with royalty logic
├── scripts/
│   └── deploy.js            # Deployment script
├── test/
│   └── RoyaltyNFT.test.js   # Contract tests
├── hardhat.config.js        # Hardhat configuration
└── package.json             # Dependencies
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd blockchain
npm install
```

### 2. Start Local Network

```bash
npm run node
```

This starts a Hardhat node at `http://127.0.0.1:8545` (Chain ID: 31337)

### 3. Deploy Contract (in new terminal)

```bash
cd blockchain
npm run deploy
```

You'll see output like:

```
✅ RoyaltyNFT deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### 4. Update Frontend

**Copy Contract Address:**

```javascript
// frontend/src/contracts/contractAddress.js
export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
```

**Copy ABI:**

```bash
# Copy from:
blockchain/artifacts/contracts/RoyaltyNFT.sol/RoyaltyNFT.json

# To:
frontend/src/contracts/abi.json
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run node` | Start Hardhat local network |
| `npm run compile` | Compile smart contracts |
| `npm run deploy` | Deploy to localhost |
| `npm run test` | Run contract tests |
| `npm run clean` | Clean cache and artifacts |

## 🧪 Run Tests

```bash
npm test
```

Expected output:

```
  RoyaltyNFT
    Minting
      ✓ Should mint NFT with correct initial price
      ✓ Should record ownership history on mint
      ✓ Should emit NFTMinted event
    Buying NFTs
      ✓ Should transfer NFT and pay seller
      ✓ Should increase price by 10%
      ✓ Should update ownership history correctly
    Royalty Distribution
      ✓ Should distribute royalties on second sale
      ✓ Should distribute recency-weighted royalties on third sale
      ✓ Should emit RoyaltyPaid events
```

## 📝 Contract Features

### RoyaltyNFT.sol

**Core Functions:**

```solidity
// Minting
function mintNFT(uint256 initialPrice) returns (uint256)

// Buying
function buyNFT(uint256 tokenId) payable

// View Functions
function getCurrentPrice(uint256 tokenId) returns (uint256)
function getOwnershipHistory(uint256 tokenId) returns (OwnershipRecord[])
function getRoyaltyPool(uint256 tokenId) returns (RoyaltyShare[])
function getTotalRoyalties(uint256 tokenId) returns (uint256)
```

**Events:**

```solidity
event NFTMinted(uint256 indexed tokenId, address indexed minter, uint256 price)
event NFTBought(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price)
event RoyaltyPaid(uint256 indexed tokenId, address indexed recipient, uint256 amount)
```

**Royalty Logic:**

- 10% of sale price goes to previous owners
- Distribution is recency-weighted:
  - Most recent owner (level 1) = weight 1
  - Second owner (level 2) = weight 2
  - Third owner (level 3) = weight 3
  - etc.
- Share = (weight / totalWeight) × royaltyPool

**Example:**

```
NFT sold for 100 ETH
Royalty pool: 10 ETH (10%)
Seller receives: 90 ETH (90%)

Previous owners:
- Owner-3 (level 3, weight 3): 10 × (3/6) = 5 ETH
- Owner-2 (level 2, weight 2): 10 × (2/6) = 3.33 ETH
- Owner-1 (level 1, weight 1): 10 × (1/6) = 1.67 ETH
```

## 🔧 Configuration

### Hardhat Network Settings

```javascript
// hardhat.config.js
networks: {
  localhost: {
    url: "http://127.0.0.1:8545",
    chainId: 31337
  }
}
```

### Solidity Version

```javascript
solidity: {
  version: "0.8.20",
  optimizer: {
    enabled: true,
    runs: 200
  }
}
```

## 🧑‍💻 Development Workflow

1. **Make Changes:** Edit `contracts/RoyaltyNFT.sol`
2. **Compile:** `npm run compile`
3. **Test:** `npm test`
4. **Deploy:** `npm run deploy`
5. **Update Frontend:** Copy address and ABI

## 📊 Test Accounts

Hardhat provides 20 accounts with 10,000 ETH each:

```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
```

## 🐛 Troubleshooting

### "Error: cannot estimate gas"

- Make sure Hardhat node is running
- Check contract has no errors
- Verify function parameters are correct

### "Nonce too high"

Reset MetaMask:
1. Settings → Advanced
2. Clear activity tab data
3. Refresh page

### "Contract not deployed"

Redeploy contract:

```bash
npm run deploy
```

Update frontend with new address.

## 📚 Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Ethers.js Documentation](https://docs.ethers.org)

## 🤝 Integration with Frontend

After deployment:

1. **Copy contract address** to `frontend/src/contracts/contractAddress.js`
2. **Copy ABI** from `artifacts/contracts/RoyaltyNFT.sol/RoyaltyNFT.json`
3. **Paste ABI** into `frontend/src/contracts/abi.json`
4. **Keep Hardhat node running** during testing
5. **Test in frontend** at http://localhost:5174

---

**Ready to deploy!** 🚀
