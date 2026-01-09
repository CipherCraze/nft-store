# 🔨 Hardhat Network Configuration

## FOR MEMBER-1 TO FILL IN:

After deploying the smart contract on Hardhat, provide these details:

---

## 📡 Network Details

- **Network Name**: Hardhat Local Network
- **RPC URL**: `http://127.0.0.1:8545`
- **Chain ID**: `31337`
- **Currency Symbol**: ETH

---

## 📝 Contract Deployment Info

**Contract Address**: 
```
0x_______________________________________
```
*(Replace with actual deployed address)*

**Deployment Block**: ___________

**Deployment Date**: _____________

---

## 🔑 Test Accounts (Hardhat Default Accounts)

Hardhat provides 20 pre-funded accounts. Use these for testing:

**Account 1 (Owner-1 for Demo):**
- Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

**Account 2 (Owner-2 for Demo):**
- Address: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
- Private Key: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`

**Account 3 (Owner-3 for Demo):**
- Address: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`
- Private Key: `0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a`

---

## 📋 Contract Functions (Checklist)

Verify your contract includes these functions:

- [ ] `mintNFT(uint256 tokenId, uint256 initialPrice)`
- [ ] `buyNFT(uint256 tokenId)` payable
- [ ] `getOwnershipHistory(uint256 tokenId)` returns OwnershipRecord[]
- [ ] `getCurrentPrice(uint256 tokenId)` returns uint256
- [ ] `getRoyaltyPool(uint256 tokenId)` returns uint256
- [ ] `ownerOf(uint256 tokenId)` returns address

---

## 📄 ABI JSON

Paste the ABI here (from `artifacts/contracts/YourContract.sol/YourContract.json`):

```json
[
  // PASTE ABI HERE
]
```

---

## 🚀 How Member-1 Should Get This Info

### 1. Start Hardhat Node
```bash
npx hardhat node
```
Output will show:
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
```

### 2. Deploy Contract
```bash
npx hardhat run scripts/deploy.js --network localhost
```
Output will show:
```
NFTRoyalty deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```
**Copy this address!**

### 3. Get ABI
```bash
# ABI is located in:
artifacts/contracts/NFTRoyalty.sol/NFTRoyalty.json
```

Open that file and copy the `"abi"` array.

---

## ✅ Once You Fill This In

Send this information to Member-2 (Frontend Team) so they can:
1. Update `src/contracts/contractAddress.js`
2. Update `src/contracts/abi.json`
3. Configure MetaMask
4. Start testing!

---

**Status**: ⏳ Waiting for deployment info from Member-1
