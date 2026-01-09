#!/usr/bin/env node

/**
 * 🚀 NFT Store - Quick Start Script
 * Run this to verify your setup
 */

const fs = require('fs');
const path = require('path');

console.log('\n🏪 NFT Store - Setup Verification\n');
console.log('='.repeat(50));

// Check directories
const checks = {
  '📂 Frontend Directory': fs.existsSync('frontend'),
  '📂 Blockchain Directory': fs.existsSync('blockchain'),
  '📄 Frontend package.json': fs.existsSync('frontend/package.json'),
  '📄 Blockchain package.json': fs.existsSync('blockchain/package.json'),
  '📄 RoyaltyNFT.sol': fs.existsSync('blockchain/contracts/RoyaltyNFT.sol'),
  '📄 Deploy script': fs.existsSync('blockchain/scripts/deploy.js'),
  '📄 Test file': fs.existsSync('blockchain/test/RoyaltyNFT.test.js'),
  '📄 Hardhat config': fs.existsSync('blockchain/hardhat.config.js'),
  '📂 Frontend src': fs.existsSync('frontend/src'),
  '📄 Frontend index.html': fs.existsSync('frontend/index.html'),
};

let allGood = true;

console.log('\n📋 Checking Project Structure:\n');

for (const [check, result] of Object.entries(checks)) {
  const status = result ? '✅' : '❌';
  console.log(`${status} ${check}`);
  if (!result) allGood = false;
}

console.log('\n' + '='.repeat(50));

if (allGood) {
  console.log('\n🎉 SUCCESS! Project structure is correct!\n');
  console.log('📚 Next Steps:');
  console.log('   1. cd blockchain && npm install');
  console.log('   2. npm run node (in blockchain/)');
  console.log('   3. npm run deploy (in blockchain/)');
  console.log('   4. Update frontend/src/contracts/ with address & ABI');
  console.log('   5. cd frontend && npm run dev');
  console.log('\n📖 Read SETUP_GUIDE.md for detailed instructions\n');
} else {
  console.log('\n⚠️  Some files are missing!');
  console.log('\n📖 Check PROJECT_STRUCTURE.md for details\n');
}
