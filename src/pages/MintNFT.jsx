import { useState, useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { parseEth } from "../utils/formatEth";

export default function MintNFT() {
  const { account, contract } = useContext(Web3Context);
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");

  async function handleMint(e) {
    e.preventDefault();

    if (!account) {
      setError("Please connect your wallet first");
      return;
    }

    if (!contract) {
      setError("Contract not initialized");
      return;
    }

    if (!tokenId || !price) {
      setError("Please fill in all fields");
      return;
    }

    setIsMinting(true);
    setError("");
    setTxHash("");

    try {
      // Convert price to Wei
      const priceInWei = parseEth(price);

      console.log("Minting NFT...", { tokenId, price, priceInWei: priceInWei.toString() });

      // Call contract's mintNFT function
      const tx = await contract.mintNFT(tokenId, priceInWei);

      console.log("Transaction sent:", tx.hash);
      setTxHash(tx.hash);

      // Wait for confirmation
      await tx.wait();

      console.log("✅ NFT Minted successfully!");

      // Reset form
      setTokenId("");
      setPrice("");
      
      // Show success message
      alert(`NFT #${tokenId} minted successfully! Transaction: ${tx.hash}`);
    } catch (err) {
      console.error("Minting error:", err);
      setError(err.message || "Failed to mint NFT");
    } finally {
      setIsMinting(false);
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl md:text-6xl font-black mb-4"
            style={{
              fontFamily: "Orbitron, sans-serif",
              background: "linear-gradient(135deg, #00fff9 0%, #ff006e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Mint NFT
          </h1>
          <p className="text-gray-400">Create a new NFT with initial pricing</p>
        </div>

        {/* Mint Form */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00fff9] via-[#ff006e] to-[#8338ec] rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

          {/* Form Card */}
          <div className="relative bg-gradient-to-br from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-xl border border-[#00fff9]/20 rounded-2xl p-8">
            <form onSubmit={handleMint} className="space-y-6">
              {/* Token ID Input */}
              <div>
                <label className="block text-sm text-gray-400 uppercase tracking-wider mb-2">
                  Token ID
                </label>
                <input
                  type="number"
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                  placeholder="e.g., 1"
                  className="w-full px-4 py-3 bg-[#0a0a0f]/50 border border-[#00fff9]/20 rounded-lg text-white placeholder-gray-600 focus:border-[#00fff9] focus:outline-none transition-colors"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                  disabled={isMinting}
                  required
                />
              </div>

              {/* Initial Price Input */}
              <div>
                <label className="block text-sm text-gray-400 uppercase tracking-wider mb-2">
                  Initial Price (ETH)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g., 0.1"
                  className="w-full px-4 py-3 bg-[#0a0a0f]/50 border border-[#00fff9]/20 rounded-lg text-white placeholder-gray-600 focus:border-[#00fff9] focus:outline-none transition-colors"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                  disabled={isMinting}
                  required
                />
                <p className="text-xs text-gray-600 mt-2">
                  Set the initial sale price for this NFT
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              {/* Transaction Hash */}
              {txHash && (
                <div className="p-4 bg-[#00fff9]/10 border border-[#00fff9]/30 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Transaction Hash:</p>
                  <p className="text-sm text-[#00fff9] font-mono break-all">{txHash}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isMinting || !account}
                className="w-full relative group/btn overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00fff9] to-[#ff006e] opacity-100 group-hover/btn:opacity-80 transition-opacity"></div>
                <div
                  className="relative py-4 px-8 text-lg font-bold tracking-wider uppercase"
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    color: "#0a0a0f",
                  }}
                >
                  {isMinting ? "Minting..." : account ? "Mint NFT" : "Connect Wallet First"}
                </div>
              </button>
            </form>

            {/* Info Box */}
            <div className="mt-8 pt-6 border-t border-[#00fff9]/10">
              <h4 className="text-sm font-bold text-white mb-3" style={{ fontFamily: "Orbitron, sans-serif" }}>
                How Minting Works
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#00fff9] mt-0.5">●</span>
                  <span>Choose a unique Token ID (must not already exist)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff006e] mt-0.5">●</span>
                  <span>Set an initial price in ETH</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8338ec] mt-0.5">●</span>
                  <span>Confirm the transaction in MetaMask</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00fff9] mt-0.5">●</span>
                  <span>You become the first owner (Level 1)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
