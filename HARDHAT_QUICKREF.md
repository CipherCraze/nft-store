# 🔨 HARDHAT QUICK REFERENCE

**One-page cheat sheet for Hardhat integration**

---

## 📋 What You Need from Member-1

1. **Contract Address** (after they deploy)
2. **ABI JSON** (from `artifacts/` folder)
3. **Confirmation that Hardhat node is running**

---

## 🔧 MetaMask Configuration

### Add Hardhat Network

| Setting | Value |
|---------|-------|
| Network Name | `Hardhat Local` |
| RPC URL | `http://127.0.0.1:8545` |
| Chain ID | `31337` |
| Currency | `ETH` |

### Import 3 Test Accounts

**Owner-1:**
```
0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

**Owner-2:**
```
0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

**Owner-3:**
```
0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
```

---

## ✏️ Files to Update

### 1. Contract Address
📁 `src/contracts/contractAddress.js`
```javascript
export const CONTRACT_ADDRESS = "0xYourAddressFromMember1";
```

### 2. ABI
📁 `src/contracts/abi.json`
- Get from Member-1's `artifacts/contracts/NFTRoyalty.sol/NFTRoyalty.json`
- Copy the `"abi"` array

---

## ✅ Testing Checklist

- [ ] Hardhat node running (Member-1's terminal)
- [ ] Contract deployed (Member-1 did this)
- [ ] Contract address updated
- [ ] ABI updated
- [ ] MetaMask configured with Hardhat network
- [ ] 3 accounts imported
- [ ] Dev server running: `npm run dev`
- [ ] Can connect wallet
- [ ] Can mint NFT
- [ ] Can view marketplace

---

## 🚨 Common Errors

| Error | Fix |
|-------|-----|
| "Wrong network" | Switch MetaMask to "Hardhat Local" |
| "Cannot connect" | Make sure Hardhat node is running |
| "Nonce too high" | Clear MetaMask activity data |
| "Contract not deployed" | Ask Member-1 to redeploy |

---

## 💻 Terminal Commands

**Member-1 (Backend):**
```bash
# Start Hardhat node (keep running)
npx hardhat node

# Deploy contract (new terminal)
npx hardhat run scripts/deploy.js --network localhost
```

**You (Frontend):**
```bash
# Start dev server
npm run dev
```

---

## 📞 Message Template for Member-1

Copy and send this:

> Hey! I'm ready to integrate. Please provide:
> 
> 1. **Contract Address** - After you deploy, what address did it deploy to?
> 2. **ABI** - Send me the content of `artifacts/contracts/NFTRoyalty.sol/NFTRoyalty.json` (just the "abi" part)
> 3. **Confirmation** - Is the Hardhat node running at http://127.0.0.1:8545?
> 
> Files I need to update:
> - `src/contracts/contractAddress.js`
> - `src/contracts/abi.json`
> 
> See `CONTRACT_INFO_HARDHAT.md` for the template!

---

## 🎯 Demo Day Setup

**5 Minutes Before:**
1. Confirm Hardhat node running
2. All 3 MetaMask accounts on "Hardhat Local" network
3. Dev server running
4. Test mint once to verify everything works

**During Demo:**
- Switch between 3 browser profiles/windows
- Each with different MetaMask account
- Follow `DEMO_GUIDE.md`

---

**Need help?** See `HARDHAT_SETUP.md` for full details.
