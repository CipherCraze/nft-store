# 🎨 NFT Store - Frontend

React + Vite + Tailwind CSS frontend for the NFT Store platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── WalletStatus.jsx # Wallet connection UI
│   │   ├── NFTCard.jsx      # NFT display card
│   │   ├── OwnershipHistory.jsx    # Timeline visualization
│   │   └── RoyaltyBreakdown.jsx    # Royalty display
│   │
│   ├── pages/               # Main application pages
│   │   ├── Home.jsx         # Landing page
│   │   ├── MintNFT.jsx      # NFT minting interface
│   │   ├── Marketplace.jsx  # NFT marketplace
│   │   ├── NFTDetail.jsx    # Individual NFT view
│   │   └── TransactionHistory.jsx  # Transaction log
│   │
│   ├── context/             # React Context
│   │   └── Web3Context.jsx  # Web3 & wallet state
│   │
│   ├── contracts/           # Contract integration
│   │   ├── contractAddress.js    # Deployed address
│   │   └── abi.json         # Contract ABI
│   │
│   ├── utils/               # Helper functions
│   │   └── formatEth.js     # ETH formatting utilities
│   │
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
│
├── index.html               # HTML entry point
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── postcss.config.js        # PostCSS configuration
```

## 🎨 Design System

### Colors

```javascript
Primary: #00fff9 (Cyan)
Secondary: #ff006e (Pink)
Accent: #8338ec (Purple)
Background: #050508 (Dark)
```

### Fonts

- **Headers:** Orbitron (bold, futuristic)
- **Body:** Raleway (clean, readable)

### Components

All components use:
- Glassmorphism effects
- Neon glow animations
- Gradient backgrounds
- Smooth transitions

## 🔌 Web3 Integration

### Setup

1. **Install MetaMask** browser extension

2. **Add Hardhat Network:**
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency: `ETH`

3. **Import Test Accounts:**
   ```
   # Account 1 (Owner)
   Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

   # Account 2 (Buyer 1)
   Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

   # Account 3 (Buyer 2)
   Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   ```

### Contract Integration

After blockchain deployment:

1. **Update Contract Address:**
   ```javascript
   // src/contracts/contractAddress.js
   export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
   ```

2. **Update ABI:**
   ```bash
   # Copy from blockchain/artifacts/contracts/RoyaltyNFT.sol/RoyaltyNFT.json
   # Paste into src/contracts/abi.json
   ```

## 📄 Pages Overview

### 1. Home (`/`)

- Landing page with hero section
- Features overview
- Call-to-action buttons
- Animated background effects

### 2. Mint NFT (`/mint`)

- Token ID input
- Initial price setting (in ETH)
- MetaMask transaction flow
- Success/error feedback

### 3. Marketplace (`/marketplace`)

- Grid of all minted NFTs
- Current price display
- Current owner info
- Click to view details

### 4. NFT Detail (`/nft/:tokenId`)

- NFT information summary
- Current owner & price
- **Ownership History** - Timeline of all owners with levels
- **Royalty Breakdown** - Visual distribution display
- Buy button (triggers MetaMask)

### 5. Transaction History (`/history`)

- All wallet transactions
- Filter by type (Mint, Buy, Sell, Royalty)
- Transaction details with hashes
- Copy transaction hash button

## 🧩 Key Components

### `Web3Context.jsx`

Manages global Web3 state:

```javascript
const { 
  account,      // Connected wallet address
  contract,     // Contract instance
  provider,     // Ethers provider
  connectWallet,    // Connect function
  disconnectWallet  // Disconnect function
} = useContext(Web3Context);
```

### `OwnershipHistory.jsx`

Displays ownership timeline:

```javascript
<OwnershipHistory history={[
  { owner: "0x123...", level: 3, timestamp: 1234567890 },
  { owner: "0x456...", level: 2, timestamp: 1234567891 },
  { owner: "0x789...", level: 1, timestamp: 1234567892 }
]} />
```

### `RoyaltyBreakdown.jsx`

Shows royalty distribution:

```javascript
<RoyaltyBreakdown 
  royaltyPool={ethers.parseEther("10")}
  shares={[
    { owner: "0x123...", level: 3, weight: 3, share: "5000000000000000000" },
    { owner: "0x456...", level: 2, weight: 2, share: "3333333333333333333" }
  ]}
  currentPrice={ethers.parseEther("100")}
/>
```

## 🛠️ Utility Functions

### `formatEth(wei)`

Convert wei to ETH string:

```javascript
formatEth("1000000000000000000") // "1.00"
```

### `parseEth(eth)`

Convert ETH to wei:

```javascript
parseEth("1.5") // BigInt wei value
```

### `shortenAddress(address)`

Shorten wallet address:

```javascript
shortenAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
// "0xf39F...2266"
```

### `formatDate(timestamp)`

Format Unix timestamp:

```javascript
formatDate(1704844800) // "Jan 9, 2026, 10:00 PM"
```

## 🎯 Development Workflow

### Add New Page

1. Create `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/Navbar.jsx`

### Add New Component

1. Create `src/components/NewComponent.jsx`
2. Import where needed
3. Use Web3Context if blockchain interaction needed

### Styling Guidelines

- Use Tailwind utility classes
- Keep consistent spacing (`p-4`, `p-6`, `p-8`)
- Use neon colors for accents
- Add hover effects for interactivity
- Include loading states for async operations

## 🧪 Testing

### Manual Testing Checklist

- [ ] Wallet connects successfully
- [ ] Network validation works (Chain ID 31337)
- [ ] Can mint NFT with custom price
- [ ] Minted NFT appears in marketplace
- [ ] Can view NFT details
- [ ] Ownership history displays correctly
- [ ] Royalty breakdown calculates properly
- [ ] Can buy NFT (with different account)
- [ ] Transaction history populates
- [ ] Can filter transaction history

### Browser Testing

Test in:
- Chrome + MetaMask
- Firefox + MetaMask
- Brave (built-in wallet)

## 📱 Responsive Design

Breakpoints:

```javascript
sm: '640px'   // Small devices
md: '768px'   // Tablets
lg: '1024px'  // Laptops
xl: '1280px'  // Desktops
```

Mobile-first approach - all components responsive.

## 🚀 Build & Deploy

### Development

```bash
npm run dev
# Runs on http://localhost:5173
```

### Production Build

```bash
npm run build
# Creates optimized build in dist/
```

### Preview Production

```bash
npm run preview
# Preview production build locally
```

## 🔧 Configuration

### Vite Config

```javascript
// vite.config.js
export default {
  plugins: [react()],
  server: {
    port: 5173
  }
}
```

### Tailwind Config

```javascript
// tailwind.config.js
content: ['./index.html', './src/**/*.{js,jsx}']
```

## 📦 Dependencies

### Core

- `react` - UI framework
- `react-dom` - React DOM renderer
- `react-router-dom` - Client-side routing
- `ethers` - Blockchain interaction

### UI

- `tailwindcss` - Utility-first CSS
- `lucide-react` - Icon library

### Dev

- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin
- `autoprefixer` - CSS vendor prefixes
- `postcss` - CSS processing

## 🐛 Common Issues

### "Module not found: ethers"

```bash
npm install ethers
```

### Tailwind styles not applying

```bash
npm run dev
# Ensure tailwind.config.js includes all files
```

### MetaMask not detecting

- Check if MetaMask is installed
- Try refreshing page
- Check browser console for errors

### Wrong network error

- Switch MetaMask to "Hardhat Local"
- Verify Chain ID is 31337

## 💡 Best Practices

- Always handle loading states
- Show clear error messages
- Provide transaction feedback
- Include empty states
- Add hover effects for better UX
- Use semantic HTML
- Keep components small and focused
- Extract reusable logic to utils

## 📞 Support

For issues:
1. Check browser console
2. Verify MetaMask connection
3. Confirm contract is deployed
4. Check network is correct (31337)

---

**Built with React + Vite + Tailwind CSS** ⚛️⚡🎨
