// Contract address from environment variable
// Set VITE_CONTRACT_ADDRESS in your .env file
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";

// HOW TO SET UP:
// 1. Copy .env.example to .env in the frontend directory
// 2. Update VITE_CONTRACT_ADDRESS with your deployed contract address
// 
// HOW TO GET CONTRACT ADDRESS:
// 1. Member-1 runs: npx hardhat node
// 2. Member-1 runs: npx hardhat run scripts/deploy.js --network localhost
// 3. Console will show: "RoyaltyNFT deployed to: 0x..."
// 4. Copy that address to your .env file as VITE_CONTRACT_ADDRESS
//
// Local Network Info:
// - RPC URL: http://127.0.0.1:8545
// - Chain ID: 1337
// - Make sure MetaMask is connected to local network (Chain ID: 1337)!
