# ⚡ QUICK START - Read This First!

**5-minute guide to get up and running**

---

## 🎯 What Is This?

A complete NFT marketplace frontend where:
- Users mint NFTs with MetaMask
- Users buy/sell NFTs
- Previous owners earn automatic royalties
- Everything is transparent and on-chain

---

## 🚀 How to Run Right Now

```bash
# Already done (dependencies installed)
# npm install

# Start the app
npm run dev
```

**Open:** http://localhost:5173 (or 5174)

**What you'll see:**
- Beautiful cyber-themed homepage
- "Connect Wallet" button
- Navigation: Home | Mint | Marketplace

---

## ⚠️ CRITICAL: Before Demo

You **MUST** update these 2 files with real contract data:

### 1. Contract Address
📁 `src/contracts/contractAddress.js`

```javascript
// Change this:
export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

// To Member-1's Hardhat deployed address:
export const CONTRACT_ADDRESS = "0xYourRealContractAddressHere";
```

### 2. Contract ABI
📁 `src/contracts/abi.json`

Replace entire file with the ABI JSON from Member-1.

### 3. Configure MetaMask for Hardhat

📚 **Quick Setup:** See `HARDHAT_QUICKREF.md`

**Add Hardhat Network:**
- Network Name: `Hardhat Local`
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `31337`

**Import Test Accounts:**
- Owner-1: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
- Owner-2: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`
- Owner-3: `0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a`

📚 **Full guide:** `HARDHAT_SETUP.md`

---

## 📖 Documentation Files (Read in Order)

| # | File | When to Read | Time |
|---|------|--------------|------|
| 1 | `README.md` | First (overview) | 10 min |
| 2 | `INTEGRATION_CHECKLIST.md` | When you get contract | 15 min |
| 3 | `DEMO_GUIDE.md` | Before presenting | 20 min |
| 4 | `VISUAL_PREVIEW.md` | To understand design | 5 min |
| 5 | `PROJECT_COMPLETE.md` | Final summary | 5 min |

---

## 🎬 Demo Flow (Super Quick)

1. **Owner-1 mints NFT #1** (0.1 ETH)
2. **Owner-2 buys NFT #1** (pays 0.1 ETH)
3. **Owner-3 buys NFT #1** (pays 0.1 ETH, royalties distributed)
4. **Show ownership history** (3 owners with levels)
5. **Show royalty breakdown** (weighted distribution)

**Done!** Judges impressed. ✅

---

## 🔧 Tech Stack

- **React 18** - Frontend
- **Vite 6** - Build tool
- **Tailwind CSS 3** - Styling
- **ethers.js** - Blockchain
- **MetaMask** - Wallet

---

## 📂 Key Files to Know

### Components
- `Navbar.jsx` - Top navigation
- `WalletStatus.jsx` - Connect wallet button
- `NFTCard.jsx` - NFT display card
- `OwnershipHistory.jsx` - Timeline of owners
- `RoyaltyBreakdown.jsx` - Royalty visualization

### Pages
- `Home.jsx` - Landing page
- `MintNFT.jsx` - Create NFTs
- `Marketplace.jsx` - Browse NFTs
- `NFTDetail.jsx` - NFT details + buy

### Core
- `Web3Context.jsx` - Wallet state
- `App.jsx` - Routing
- `main.jsx` - Entry point

---

## 🎨 Design

**Fonts:**
- Headers: **Orbitron** (futuristic)
- Body: **Raleway** (elegant)

**Colors:**
- Cyan: `#00fff9`
- Pink: `#ff006e`
- Purple: `#8338ec`
- Background: `#050508`

**Vibe:** Cyber-luxury, neon, dark theme

---

## ✅ What Works Right Now

- ✅ App runs
- ✅ Routing works
- ✅ UI looks amazing
- ✅ MetaMask detection ready
- ✅ Contract calls prepared

## ⚠️ What Needs Member-1

- ❌ Contract address (placeholder)
- ❌ Contract ABI (template)
- ❌ Deployed network info

---

## 🚨 Common First Questions

**Q: Why won't MetaMask connect?**
> You need to update the contract address first.

**Q: Where do I get the contract address?**
> Ask Member-1 (blockchain team) for the deployed contract address.

**Q: How do I test without a contract?**
> You can browse the UI, but minting/buying requires a deployed contract.

**Q: Is the design supposed to be this cool?**
> Yes! We avoided generic "AI slop" aesthetics on purpose.

---

## 📞 Next Steps

1. **Run the app** (`npm run dev`)
2. **Explore the UI** (all pages work)
3. **Read `INTEGRATION_CHECKLIST.md`** (when you get contract)
4. **Practice demo** with `DEMO_GUIDE.md`

---

## 🎯 Your Goal

Present a working demo where:
- 3 wallets interact
- NFT changes hands 2 times
- Ownership history is visible
- Royalty distribution is transparent

**You have everything you need!** 🚀

---

## 📋 Before You Present

- [ ] Contract address updated
- [ ] ABI updated
- [ ] 3 MetaMask accounts ready
- [ ] Test ETH in all accounts
- [ ] App runs without errors
- [ ] Practiced demo once
- [ ] Read Q&A responses

---

**Time to run:** 30 seconds  
**Time to integrate contract:** 30 minutes  
**Time to practice demo:** 30 minutes  
**Total prep time:** ~1 hour

**You've got this! 💎**

---

**Start here:** `npm run dev`  
**Then read:** `README.md`  
**Questions?** Check `INTEGRATION_CHECKLIST.md`  
**Demo day?** Use `DEMO_GUIDE.md`
