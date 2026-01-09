# 🎯 DEMO EXECUTION GUIDE

**Quick reference for live presentation to judges**

---

## ⚡ PRE-DEMO SETUP (Do This First!)

### 1. MetaMask Preparation
- [ ] Open 3 browser profiles or use 3 different browsers
- [ ] Label accounts clearly:
  - **Profile 1:** "Owner-1" (Initial Minter)
  - **Profile 2:** "Owner-2" (First Buyer)
  - **Profile 3:** "Owner-3" (Second Buyer)
- [ ] Ensure each account has **at least 0.5 ETH** (test network)

### 2. Start Application
```bash
npm run dev
```
- Verify it opens at `http://localhost:5173`
- Keep terminal visible to show "no errors"

### 3. Verify Contract Configuration
- [ ] Contract address is deployed and correct
- [ ] ABI matches deployed contract
- [ ] Network is correct (Sepolia/Localhost/etc.)

---

## 🎬 DEMO SCRIPT (Follow Exactly)

### **ACT 1: MINTING (Owner-1) - 2 minutes**

1. **Open Browser Profile 1**
2. Navigate to homepage
3. **SAY:** "This is VAULT, a transparent NFT marketplace with automatic royalty distribution."
4. Click **"Connect Wallet"**
5. Approve MetaMask connection
6. **SHOW:** Wallet address appears (top-right)
7. Click **"Mint NFT"** in navbar
8. Fill in:
   - Token ID: `1`
   - Price: `0.1` ETH
9. Click **"Mint NFT"** button
10. **Confirm transaction in MetaMask**
11. **SAY:** "Owner-1 has minted NFT #1. They are now Level 1 owner."
12. Wait for confirmation
13. Navigate to **Marketplace**
14. **SHOW:** NFT #1 appears with price

---

### **ACT 2: FIRST SALE (Owner-2) - 2 minutes**

1. **Switch to Browser Profile 2**
2. Connect wallet (Owner-2)
3. **SAY:** "Owner-2 wants to purchase this NFT."
4. Go to **Marketplace**
5. Click on **NFT #1**
6. **SHOW** NFT Detail page:
   - Current owner (Owner-1)
   - Current price (0.1 ETH)
   - Ownership History (only Owner-1)
7. Click **"Buy NFT"**
8. **Confirm transaction in MetaMask**
9. **SAY:** "The smart contract automatically transfers ownership AND sends funds to Owner-1."
10. Wait for confirmation
11. **REFRESH PAGE**
12. **SHOW:**
   - Current owner is now Owner-2
   - Ownership History shows:
     - Current Owner: Owner-2 (Level 2)
     - Previous Owner: Owner-1 (Level 1)

---

### **ACT 3: SECOND SALE + ROYALTIES (Owner-3) - 3 minutes**

1. **Switch to Browser Profile 3**
2. Connect wallet (Owner-3)
3. **SAY:** "Now Owner-3 wants to buy. This is where royalties kick in."
4. Navigate to **NFT #1** in marketplace
5. **BEFORE BUYING, SHOW:**
   - Ownership History (2 owners)
   - Royalty Breakdown section
6. **SAY:** "Notice the royalty preview. Owner-1 gets X%, Owner-2 gets Y%, weighted by their ownership levels."
7. **Scroll to Royalty Breakdown**
8. **POINT OUT:**
   - Total Royalty Pool
   - Individual shares based on level weights
   - Disclaimer: "Preview only - contract enforces"
9. Click **"Buy NFT"**
10. **Confirm transaction**
11. Wait for confirmation
12. **REFRESH PAGE**
13. **SHOW FINAL STATE:**
   - Current Owner: Owner-3 (Level 3)
   - Ownership Timeline:
     - Owner-3 → Level 3 (Current)
     - Owner-2 → Level 2
     - Owner-1 → Level 1 (Original)
   - Royalty Breakdown (updated percentages)

---

## 💬 JUDGE INTERACTION RESPONSES

### Expected Questions & Your Answers

**Q: "How do you calculate the royalty split?"**
> "The frontend displays a preview by reading ownership levels from the contract. The actual calculation and distribution happens entirely on-chain during the `buyNFT` transaction. We just visualize it for transparency."

**Q: "What prevents someone from bypassing royalties?"**
> "The smart contract enforces it. Every transfer goes through `buyNFT`, which atomically distributes royalties before updating ownership. It's impossible to transfer without paying previous owners."

**Q: "Why use levels instead of equal splits?"**
> "Levels weight royalties based on how early you owned the NFT. Level 1 (original minter) has the lowest weight, while higher levels get proportionally more. This incentivizes holding."

**Q: "What if the contract has a bug?"**
> "The contract logic is Member-1's responsibility. Our frontend only reads on-chain state and submits transactions. We don't modify balances or royalty logic—it's all enforced by Ethereum."

**Q: "Can you show me the code?"**
> "Absolutely. Let me show you:"
- Open `src/context/Web3Context.jsx` (wallet connection)
- Open `src/pages/NFTDetail.jsx` (buy function)
- Open `src/components/RoyaltyBreakdown.jsx` (display logic)

**Q: "How does MetaMask work with this?"**
> "MetaMask acts as the user's Ethereum wallet. We use ethers.js to communicate with it. When a user clicks 'Buy NFT', we call `contract.buyNFT(tokenId, {value: price})`, which opens MetaMask for confirmation. The transaction is then sent to the blockchain."

---

## 🎨 VISUAL HIGHLIGHTS TO POINT OUT

- **Cyber-luxury aesthetic** (neon colors, dark theme, no generic gradients)
- **Animated backgrounds** (floating blobs, shimmer effects)
- **Orbitron font** for futuristic vibe
- **Timeline visualization** (ownership history with colored dots)
- **Progress bars** in royalty breakdown
- **Real-time updates** (ownership changes immediately)

---

## 🚨 TROUBLESHOOTING (If Things Go Wrong)

### MetaMask Doesn't Open
- Check browser console for errors
- Ensure MetaMask is unlocked
- Try disconnecting and reconnecting wallet

### Transaction Pending Forever
- Check Etherscan/block explorer
- Might need to speed up transaction
- Worst case: refresh and try again

### Price Not Updating
- Refresh page
- Check console for contract errors
- Verify contract address is correct

### "NFT Not Found" Error
- Confirm NFT was actually minted
- Check token ID matches
- Verify you're on correct network

---

## 📊 SUCCESS METRICS

By end of demo, judges should see:

✅ **3 connected wallets** (Owner-1, Owner-2, Owner-3)  
✅ **1 NFT minted** (Token #1)  
✅ **2 completed sales** (Owner-1 → Owner-2 → Owner-3)  
✅ **Ownership timeline** showing all 3 owners with levels  
✅ **Royalty breakdown** showing weighted distribution  
✅ **No errors** in console or UI  
✅ **Smooth UX** with MetaMask confirmations  

---

## 🎤 OPENING STATEMENT (30 seconds)

> "Hi, I'm [Your Name], and I handled the frontend for VAULT. This is a transparent NFT marketplace where every previous owner automatically earns royalties on future sales. The smart contract enforces this—there's no way to bypass it. Let me show you how it works with a live demo using three different wallets."

---

## 🎤 CLOSING STATEMENT (30 seconds)

> "As you can see, the ownership history is fully transparent, and royalty distribution is calculated on-chain. The frontend just visualizes this data to make the blockchain logic understandable. Everything you saw—wallet connection, minting, buying, royalty payouts—is enforced by the Ethereum smart contract. Thank you!"

---

## ⏱️ TIMING BREAKDOWN

| Section | Time | Critical Actions |
|---------|------|-----------------|
| Intro | 30s | Explain concept |
| Mint (Owner-1) | 2m | Connect wallet, mint NFT #1 |
| First Sale (Owner-2) | 2m | Buy NFT, show ownership transfer |
| Second Sale (Owner-3) | 3m | Buy NFT, show royalty distribution |
| Q&A | 2-3m | Answer judge questions |
| **Total** | **9-10 minutes** | |

---

## 🔥 PRO TIPS

1. **Keep MetaMask unlocked** in all profiles before starting
2. **Practice the flow** at least twice before the actual demo
3. **Have backup token IDs** ready (2, 3, 4) in case #1 fails
4. **Show the terminal** (no errors = clean code)
5. **Open browser console** (F12) to show real-time logs
6. **Prepare to show code** if asked
7. **Smile and be confident** - you built this!

---

**Good luck! You got this! 🚀**
