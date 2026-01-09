import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from "../contracts/abi.json";
import { CONTRACT_ADDRESS } from "../contracts/contractAddress";

export const Web3Context = createContext();

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== "undefined";
  };

  // Connect wallet function
  async function connectWallet() {
    if (!isMetaMaskInstalled()) {
      setError("Please install MetaMask to use this dApp");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      
      // Check if on Hardhat network (Chain ID: 31337)
      if (network.chainId !== 31337n) {
        const networkName = network.name === "unknown" ? `Chain ID ${network.chainId}` : network.name;
        console.warn(`⚠️ Connected to ${networkName}, but contract is on Hardhat (Chain ID: 31337)`);
        setError(`Wrong network! Please switch to Hardhat Local (Chain ID: 31337) in MetaMask.`);
        setIsConnecting(false);
        return;
      }

      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // Initialize contract instance
      const contractInstance = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
      );

      setProvider(provider);
      setAccount(address);
      setContract(contractInstance);

      console.log("✅ Wallet connected:", address);
      console.log("📡 Network:", network.name, "Chain ID:", network.chainId.toString());
    } catch (err) {
      console.error("Wallet connection error:", err);
      setError(err.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  }

  // Disconnect wallet
  function disconnectWallet() {
    setAccount(null);
    setContract(null);
    setProvider(null);
    console.log("🔌 Wallet disconnected");
  }

  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (accounts[0] !== account) {
        // Reconnect with new account
        connectWallet();
      }
    };

    const handleChainChanged = () => {
      // Reload page on network change (recommended by MetaMask)
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [account]);

  // Auto-connect if previously connected
  useEffect(() => {
    async function checkConnection() {
      if (!isMetaMaskInstalled()) return;

      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          connectWallet();
        }
      } catch (err) {
        console.error("Auto-connect error:", err);
      }
    }

    checkConnection();
  }, []);

  const value = {
    account,
    contract,
    provider,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    isMetaMaskInstalled: isMetaMaskInstalled(),
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}
