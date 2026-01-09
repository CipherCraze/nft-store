# 🔗 INTEGRATION CHECKLIST

**What to do when Member-1 gives you the contract**

---

## Step 1: Get Contract Details from Member-1

Ask Member-1 to provide:

- [ ] **Deployed Contract Address**
  - Example: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
  - Must be on the correct network (Sepolia, Localhost, etc.)

- [ ] **Contract ABI (Application Binary Interface)**
  - This is a JSON array describing contract functions
  - Should include: `mintNFT`, `buyNFT`, `getOwnershipHistory`, `getCurrentPrice`, `getRoyaltyPool`, `ownerOf`

- [ ] **Network Details**
  - Network Name (e.g., "Sepolia Testnet", "Localhost")
  - Chain ID (e.g., 11155111 for Sepolia)
  - RPC URL (if using custom network)

---

## Step 2: Update Contract Address

📁 **File:** `src/contracts/contractAddress.js`

**BEFORE:**
```javascript
export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";
```

**AFTER:**
```javascript
export const CONTRACT_ADDRESS = "0xYOUR_ACTUAL_CONTRACT_ADDRESS_HERE";
```

⚠️ **IMPORTANT:**
- Use the EXACT address (case-sensitive)
- Include the `0x` prefix
- No spaces or quotes inside the string

---

## Step 3: Update Contract ABI

📁 **File:** `src/contracts/abi.json`

**Replace the entire file** with the ABI provided by Member-1.

**Expected ABI structure:**
```json
[
  {
    "inputs": [...],
    "name": "mintNFT",
    "outputs": [...],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [...],
    "name": "buyNFT",
    ...
  },
  ...
]
```

⚠️ **Validation:**
- Must be valid JSON (use a JSON validator)
- Should include all required functions
- Check for syntax errors (missing commas, brackets)

---

## Step 4: Configure MetaMask Network (If Custom)

If using a custom network (e.g., local Hardhat):

1. Open MetaMask
2. Click network dropdown → "Add Network"
3. Fill in:
   - **Network Name:** (e.g., "Localhost")
   - **RPC URL:** `http://localhost:8545` (or Member-1's URL)
   - **Chain ID:** (e.g., `31337` for Hardhat)
   - **Currency Symbol:** ETH
4. Save

---

## Step 5: Test Connection

Run these checks:

### 5.1 Start Dev Server
```bash
npm run dev
```

### 5.2 Open Browser Console (F12)
Look for:
- ✅ No errors related to contract address
- ✅ No errors related to ABI parsing

### 5.3 Connect Wallet
1. Click "Connect Wallet"
2. Approve MetaMask
3. Check console for:
   ```
   ✅ Wallet connected: 0xYourAddress
   ```

### 5.4 Try Reading Contract
Navigate to Marketplace. Check console for:
- ✅ No "Contract not found" errors
- ✅ No "Invalid address" errors

---

## Step 6: Verify Contract Functions

### Test 1: Read Function (Safe)
Try loading NFT data:
- Navigate to Marketplace
- Check console logs
- Should see: `Loaded NFTs: []` (if no NFTs minted yet)

### Test 2: Write Function (Costs Gas)
Try minting an NFT:
1. Go to Mint page
2. Fill in Token ID: `1`, Price: `0.01`
3. Click "Mint NFT"
4. **MetaMask should popup** ✅
5. Check transaction details in MetaMask
6. Confirm if test ETH available

⚠️ **If MetaMask doesn't popup:**
- Check console for errors
- Verify contract address is correct
- Ensure you're on the right network

---

## Step 7: Function Mapping Verification

Ensure your frontend calls match the contract:

| Frontend Function | Contract Function | Parameters |
|-------------------|-------------------|------------|
| `contract.mintNFT(tokenId, price)` | `mintNFT(uint256, uint256)` | tokenId, initialPrice |
| `contract.buyNFT(tokenId, {value})` | `buyNFT(uint256)` payable | tokenId |
| `contract.getOwnershipHistory(tokenId)` | `getOwnershipHistory(uint256)` view | tokenId |
| `contract.getCurrentPrice(tokenId)` | `getCurrentPrice(uint256)` view | tokenId |
| `contract.getRoyaltyPool(tokenId)` | `getRoyaltyPool(uint256)` view | tokenId |
| `contract.ownerOf(tokenId)` | `ownerOf(uint256)` view | tokenId |

⚠️ **If function names don't match:**
- Ask Member-1 for the correct function names
- Update calls in:
  - `src/pages/MintNFT.jsx`
  - `src/pages/NFTDetail.jsx`
  - `src/pages/Marketplace.jsx`

---

## Step 8: Common Issues & Fixes

### Issue 1: "Contract not deployed"
**Symptoms:** Console error: "Contract not found at address"
**Fix:**
- Verify contract address is correct
- Ensure you're on the correct network
- Ask Member-1 if contract is actually deployed

### Issue 2: "Function not found"
**Symptoms:** Console error: "contract.mintNFT is not a function"
**Fix:**
- Check ABI includes the function
- Verify function name matches exactly (case-sensitive)
- Re-save `abi.json` and restart dev server

### Issue 3: "Invalid address"
**Symptoms:** Console error: "Invalid address"
**Fix:**
- Ensure address starts with `0x`
- Check for typos
- Verify address is 42 characters (0x + 40 hex chars)

### Issue 4: MetaMask says "Wrong Network"
**Symptoms:** MetaMask shows red warning
**Fix:**
- Switch to the network where contract is deployed
- If custom network, add it to MetaMask (see Step 4)

### Issue 5: Transaction Fails
**Symptoms:** MetaMask shows "Transaction failed"
**Fix:**
- Check you have enough ETH for gas
- Verify function parameters are correct
- Ask Member-1 if contract has restrictions

---

## Step 9: Final Pre-Demo Checklist

- [ ] Contract address updated
- [ ] ABI updated
- [ ] Dev server runs without errors
- [ ] Wallet connects successfully
- [ ] Can read from contract (marketplace loads)
- [ ] Can write to contract (minting works)
- [ ] Ownership history displays
- [ ] Royalty breakdown displays
- [ ] Tested on 3 different accounts
- [ ] All MetaMask accounts have test ETH

---

## 📞 Questions to Ask Member-1

If you run into issues, ask Member-1:

1. **"What network is the contract deployed on?"**
   - Sepolia? Localhost? Mainnet?

2. **"Can you send me the full contract address and ABI?"**
   - Preferably as a JSON file

3. **"What are the exact function signatures?"**
   - Especially for `mintNFT` and `buyNFT`

4. **"Are there any access restrictions?"**
   - Can anyone mint?
   - Any whitelist?

5. **"What's the royalty percentage/logic?"**
   - For documentation purposes

6. **"Do you have test accounts with ETH?"**
   - For demo purposes

---

## 🚀 You're Ready When...

✅ Dev server starts with **no errors**  
✅ Wallet connects and shows address  
✅ Can view marketplace (even if empty)  
✅ MetaMask popup appears when clicking "Mint NFT"  
✅ Can successfully mint a test NFT  
✅ Can view NFT details page  
✅ Ownership history shows up  
✅ Royalty breakdown calculates correctly  

---

**Once all checks pass, you're ready to demo! 🎉**

Save this checklist and run through it every time Member-1 deploys a new contract version.
