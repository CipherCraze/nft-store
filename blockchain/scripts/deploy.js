const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment...\n");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString(), "wei\n");

  // Deploy RoyaltyNFT contract
  console.log("⏳ Deploying RoyaltyNFT...");
  const RoyaltyNFT = await hre.ethers.getContractFactory("RoyaltyNFT");
  const royaltyNFT = await RoyaltyNFT.deploy();

  await royaltyNFT.waitForDeployment();

  const contractAddress = await royaltyNFT.getAddress();

  console.log("✅ RoyaltyNFT deployed to:", contractAddress);
  console.log("\n" + "=".repeat(80));
  console.log("📋 DEPLOYMENT SUMMARY");
  console.log("=".repeat(80));
  console.log("Contract Address:", contractAddress);
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", (await hre.ethers.provider.getNetwork()).chainId.toString());
  console.log("=".repeat(80));

  console.log("\n🔧 NEXT STEPS:");
  console.log("1. Copy the contract address above");
  console.log("2. Update frontend/src/contracts/contractAddress.js:");
  console.log(`   export const CONTRACT_ADDRESS = "${contractAddress}";`);
  console.log("\n3. Copy the ABI from:");
  console.log("   blockchain/artifacts/contracts/RoyaltyNFT.sol/RoyaltyNFT.json");
  console.log("   to: frontend/src/contracts/abi.json");
  console.log("\n4. Make sure Hardhat node is still running in another terminal");
  console.log("5. Test the integration!");

  console.log("\n✨ Deployment complete!\n");

  // Return deployment info for programmatic use
  return {
    contractAddress,
    deployer: deployer.address,
    network: hre.network.name,
    chainId: (await hre.ethers.provider.getNetwork()).chainId.toString()
  };
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
