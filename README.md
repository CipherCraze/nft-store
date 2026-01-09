# � NFT Store - Recency-Weighted Royalty Platform

A decentralized NFT marketplace with innovative recency-weighted royalty distribution. Built for **HACKEFX Hackathon**.

## 🎯 Project Structure

```
NFT-STORE/
│
├── frontend/              👈 React + Vite + Tailwind UI
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Main pages
│   │   ├── context/      # Web3 context
│   │   ├── contracts/    # Contract ABI & address
│   │   └── utils/        # Helper functions
│   ├── package.json
│   └── vite.config.js
│
├── blockchain/            👈 Hardhat Smart Contracts
│   ├── contracts/
│   │   └── RoyaltyNFT.sol     # Main contract
│   ├── scripts/
│   │   └── deploy.js          # Deployment script
│   ├── test/
│   │   └── RoyaltyNFT.test.js # Contract tests
│   ├── hardhat.config.js
│   └── package.json
│
└── README.md              👈 You are here
```

## 🚀 Quick Start (Full Stack)

### Prerequisites

- Node.js v18+
- MetaMask browser extension
- Git

### Step 1: Clone & Setup

```bash
# Clone repository
git clone <repo-url>
cd NFT-Store

# Install blockchain dependencies
cd blockchain
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Start Blockchain

```bash
# Terminal 1 - Start Hardhat node
cd blockchain
npm run node

# Keep this running! You'll see 20 accounts with 10,000 ETH each
```

### Step 3: Deploy Contract

```bash
# Terminal 2 - Deploy contract
cd blockchain
npm run deploy

# Copy the contract address from output
# Example: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Step 4: Update Frontend

**Update Contract Address:**

```javascript
// frontend/src/contracts/contractAddress.js
export const CONTRACT_ADDRESS = "0x5FbDB2..."; // Paste your address
```

**Update ABI:**

```bash
# Copy the entire "abi" array from:
blockchain/artifacts/contracts/RoyaltyNFT.sol/RoyaltyNFT.json

# Paste into:
frontend/src/contracts/abi.json
```

### Step 5: Configure MetaMask

1. **Add Hardhat Network:**
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency: `ETH`

2. **Import Test Accounts:**
   ```
   Account 1: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   Account 2: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   Account 3: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   ```

### Step 6: Start Frontend

```bash
# Terminal 3 - Start React app
cd frontend
npm run dev

# Open http://localhost:5173
```

### Step 7: Test Integration

1. **Connect Wallet** - Click "Connect Wallet" in navbar
2. **Mint NFT** - Go to Mint page, create NFT #1 with 1 ETH
3. **View Marketplace** - See your NFT listed
4. **Buy NFT** - Switch accounts, buy the NFT
5. **Check History** - View ownership & royalty distribution

⚠️ These are Hardhat's default test accounts with 10,000 ETH each.

### 5. Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:5173`

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Navigation with wallet status
│   ├── WalletStatus.jsx        # MetaMask connection UI
│   ├── NFTCard.jsx             # NFT display card
│   ├── OwnershipHistory.jsx   # Timeline of previous owners
│   └── RoyaltyBreakdown.jsx   # Visual royalty distribution
│
├── pages/
│   ├── Home.jsx                # Landing page
│   ├── MintNFT.jsx             # NFT minting interface
│   ├── Marketplace.jsx         # Browse all NFTs
│   └── NFTDetail.jsx           # Individual NFT details
│
├── context/
│   └── Web3Context.jsx         # Wallet & contract state management
│
├── contracts/
│   ├── contractAddress.js      # ⚠️ UPDATE THIS
│   └── abi.json                # ⚠️ UPDATE THIS
│
├── utils/
│   └── formatEth.js            # ETH formatting utilities
│
├── App.jsx                     # Main app with routing
└── main.jsx                    # Entry point with Web3Provider
```

## 🎯 Demo Flow (For Judges)

### Setup (3 MetaMask Accounts)
1. Label accounts: Owner-1, Owner-2, Owner-3
2. Ensure each has test ETH

### Demo Script

**Step 1: Mint NFT (Owner-1)**
- Connect wallet (Owner-1)
- Navigate to "Mint"
- Token ID: `1`
- Price: `0.1 ETH`
- Click "Mint NFT"
- Confirm MetaMask transaction
- **Result:** Owner-1 owns NFT #1 at Level 1

**Step 2: First Sale (Owner-2 buys)**
- Disconnect Owner-1
- Connect Owner-2
- Navigate to Marketplace
- Click on NFT #1
- Click "Buy NFT"
- Confirm MetaMask (pays 0.1 ETH)
- **Result:** Owner-2 owns NFT #1 at Level 2
- **Show:** Ownership History displays both owners

**Step 3: Second Sale (Owner-3 buys)**
- Disconnect Owner-2
- Connect Owner-3
- Navigate to NFT #1 details
- Click "Buy NFT"
- Confirm MetaMask
- **Result:** Owner-3 owns NFT #1 at Level 3
- **Show:** Royalty Breakdown displays:
  - Owner-1: Level 1 weight (gets X%)
  - Owner-2: Level 2 weight (gets Y%)
  - Total royalty pool from sale

**Step 4: Verify Transparency**
- Show Ownership Timeline (3 owners visible)
- Show Royalty Distribution (weighted by level)
- Explain: "Contract enforces payouts automatically"

## 🔑 Key Smart Contract Functions Used

```javascript
// Mint new NFT
await contract.mintNFT(tokenId, priceInWei);

// Buy existing NFT
await contract.buyNFT(tokenId, { value: priceInWei });

// Get ownership history
const history = await contract.getOwnershipHistory(tokenId);

// Get current price
const price = await contract.getCurrentPrice(tokenId);

// Get royalty pool
const pool = await contract.getRoyaltyPool(tokenId);
```

## 💡 Judge Q&A Responses

**Q: Who calculates royalties?**
> "The smart contract. The frontend only reads on-chain data."

**Q: Can someone cheat payouts?**
> "No. Transfers are atomic and enforced by Ethereum."

**Q: Why this UI?**
> "To make on-chain royalty logic transparent and verifiable."

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite 6** - Build tool
- **Tailwind CSS 3** - Styling
- **ethers.js** - Ethereum interaction
- **React Router** - Navigation
- **MetaMask** - Wallet connection

## 🎨 Design Philosophy

- **Orbitron** font for futuristic headers
- **Raleway** for elegant body text
- **Neon color palette:** Cyan (#00fff9), Hot Pink (#ff006e), Purple (#8338ec)
- **Dark theme** with animated gradient backgrounds
- **Floating animations** and glow effects
- Avoids generic "AI slop" aesthetics

## 🚨 Common Issues & Solutions

### MetaMask Not Detected
```javascript
// Install MetaMask: https://metamask.io/download/
```

### Wrong Network
- Switch to the network where contract is deployed
- Common: Localhost, Sepolia, or Mainnet

### Transaction Fails
- Ensure sufficient ETH balance
- Check gas fees
- Verify contract address is correct

### NFT Not Loading
- Confirm NFT has been minted
- Check token ID exists on contract
- Refresh page to reload contract state

## 📝 Development Scripts

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔗 Important Links

- [MetaMask](https://metamask.io/)
- [ethers.js Docs](https://docs.ethers.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## ✅ Final Checklist

Before demo:
- [ ] Contract address updated in `contractAddress.js`
- [ ] ABI updated in `abi.json`
- [ ] 3 MetaMask accounts ready with test ETH
- [ ] Development server running
- [ ] Test minting works
- [ ] Test buying works
- [ ] Ownership history displays
- [ ] Royalty breakdown displays

## 👥 Team Roles

- **Member-1:** Smart contract development & deployment
- **Member-2:** Frontend, MetaMask integration, UI/UX (this repo)

## 📄 License

MIT License

---

**Built with 💎 for transparent NFT royalties**


```
nft-store/
├── public/          # Static assets
├── src/
│   ├── App.jsx      # Main App component
│   ├── main.jsx     # Application entry point
│   └── index.css    # Global styles with Tailwind directives
├── index.html       # HTML template
├── package.json     # Project dependencies
├── vite.config.js   # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── postcss.config.js   # PostCSS configuration
```

## Technologies

- [React](https://react.dev/) - A JavaScript library for building user interfaces
- [Vite](https://vite.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
#   n f t - s t o r e 
 
 