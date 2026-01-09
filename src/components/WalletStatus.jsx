import { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { shortenAddress } from "../utils/formatEth";

export default function WalletStatus() {
  const { account, connectWallet, disconnectWallet, isConnecting, error, isMetaMaskInstalled } =
    useContext(Web3Context);

  if (!isMetaMaskInstalled) {
    return (
      <a
        href="https://metamask.io/download/"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        Install MetaMask
      </a>
    );
  }

  if (account) {
    return (
      <div className="flex items-center gap-3">
        {/* Connected status indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#00fff9]/10 border border-[#00fff9]/30 rounded-lg">
          <div className="w-2 h-2 bg-[#00fff9] rounded-full animate-pulse"></div>
          <span className="text-xs text-[#00fff9] font-mono">
            {shortenAddress(account)}
          </span>
        </div>

        {/* Disconnect button */}
        <button
          onClick={disconnectWallet}
          className="px-4 py-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="relative group overflow-hidden px-6 py-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00fff9] to-[#ff006e] opacity-100 group-hover:opacity-80 transition-opacity"></div>
        <span
          className="relative text-sm font-bold tracking-wider uppercase"
          style={{
            fontFamily: "Orbitron, sans-serif",
            color: "#0a0a0f",
          }}
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </span>
      </button>
      
      {error && (
        <span className="text-xs text-red-400 max-w-[200px] truncate">
          {error}
        </span>
      )}
    </div>
  );
}
