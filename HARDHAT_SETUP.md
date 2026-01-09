# 🔨 Hardhat Setup Guide for Member-2 (Frontend)

## Prerequisites

- [ ] Member-1 has deployed the contract on Hardhat
- [ ] Member-1 has provided contract address and ABI
- [ ] Hardhat node is running (`npx hardhat node`)

---

## Step 1: Configure MetaMask for Hardhat

### Add Hardhat Network to MetaMask

1. Open MetaMask extension
2. Click the network dropdown (top center)
3. Click **"Add Network"** → **"Add a network manually"**
4. Fill in these details:

   | Field | Value |
   |-------|-------|
   | Network Name | `Hardhat Local` |
   | RPC URL | `http://127.0.0.1:8545` |
   | Chain ID | `31337` |
   | Currency Symbol | `ETH` |

5. Click **"Save"**
6. Switch to "Hardhat Local" network

---

## Step 2: Import Hardhat Test Accounts

Hardhat provides 20 pre-funded accounts with 10,000 ETH each.

### Import Account 1 (Owner-1)
1. Open MetaMask
2. Click account icon → **"Import Account"**
3. Paste private key:
   ```
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
4. Rename to: **"Owner-1 (Hardhat)"**

### Import Account 2 (Owner-2)
Repeat with private key:
```
0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```
Rename to: **"Owner-2 (Hardhat)"**

### Import Account 3 (Owner-3)
Repeat with private key:
```
0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
```
Rename to: **"Owner-3 (Hardhat)"**

⚠️ **SECURITY NOTE**: These are Hardhat's default test accounts. **NEVER** use them on mainnet or with real funds!

---

## Step 3: Update Contract Configuration

### Update Contract Address

📁 **`src/contracts/contractAddress.js`**

```javascript
// Replace with actual address from Member-1
export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
```

### Update ABI

📁 **`src/contracts/abi.json`**

Replace the entire file with the ABI from Member-1.

---

## Step 4: Verify Connection

### Start Development Server
```bash
npm run dev
```

### Test Wallet Connection
1. Open http://localhost:5174
2. Click **"Connect Wallet"**
3. MetaMask should popup
4. Select **"Owner-1 (Hardhat)"**
5. Click **"Connect"**

✅ **Success**: You should see the wallet address in the navbar

---

## Step 5: Test Minting (Optional)

1. Navigate to **Mint** page
2. Fill in:
   - Token ID: `1`
   - Price: `0.1`
3. Click **"Mint NFT"**
4. Confirm transaction in MetaMask

⚠️ **If MetaMask shows error**: Make sure Hardhat node is running!

---

## Common Issues & Solutions

### Issue 1: "Cannot connect to Hardhat"
**Solution:**
```bash
# In Member-1's terminal, start Hardhat node:
npx hardhat node
```
This must stay running!

### Issue 2: "Nonce too high"
**Solution:**
1. Open MetaMask
2. Settings → Advanced
3. Click **"Clear activity tab data"**
4. Try again

### Issue 3: "Insufficient funds"
**Solution:**
- Make sure you imported the Hardhat test accounts (they have 10,000 ETH each)
- Hardhat resets when you restart the node, so re-import accounts

### Issue 4: "Contract not deployed"
**Solution:**
- Ask Member-1 to redeploy the contract
- Update the contract address in `contractAddress.js`

---

## Hardhat Node Info

When Member-1 runs `npx hardhat node`, they'll see:

```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
```

---

## Demo Preparation Checklist

Before the demo:

- [ ] Hardhat node is running (Member-1's responsibility)
- [ ] Contract is deployed and you have the address
- [ ] ABI is updated in `src/contracts/abi.json`
- [ ] MetaMask is configured with Hardhat network
- [ ] 3 test accounts are imported to MetaMask
- [ ] Each account is switched to "Hardhat Local" network
- [ ] Dev server is running (`npm run dev`)
- [ ] You've tested minting at least once

---

## Quick Start Commands

```bash
# Terminal 1 (Member-1): Start Hardhat node
npx hardhat node

# Terminal 2 (Member-1): Deploy contract
npx hardhat run scripts/deploy.js --network localhost

# Terminal 3 (You): Start frontend
npm run dev
```

---

**You're ready when**: You can connect wallet, mint an NFT, and see it in the marketplace! 🚀
