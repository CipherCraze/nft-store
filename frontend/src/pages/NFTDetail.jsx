import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Web3Context } from "../context/Web3Context";
import OwnershipHistory from "../components/OwnershipHistory";
import RoyaltyBreakdown from "../components/RoyaltyBreakdown";
import { formatEth, parseEth, shortenAddress } from "../utils/formatEth";

export default function NFTDetail() {
  const { tokenId } = useParams();
  const navigate = useNavigate();
  const { account, contract } = useContext(Web3Context);

  const [nftData, setNftData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuying, setIsBuying] = useState(false);
  const [error, setError] = useState("");
  const [txHash, setTxHash] = useState("");

  useEffect(() => {
    loadNFTData();
  }, [tokenId, contract]);

  async function loadNFTData() {
    if (!contract || !tokenId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Load NFT data from contract
      const owner = await contract.ownerOf(tokenId);
      const price = await contract.getCurrentPrice(tokenId);
      const history = await contract.getOwnershipHistory(tokenId);
      const royaltyPool = await contract.getRoyaltyPool(tokenId);

      setNftData({
        owner,
        price,
        history,
        royaltyPool,
      });

      console.log("NFT Data loaded:", { owner, price, history, royaltyPool });
    } catch (err) {
      console.error("Error loading NFT:", err);
      setError("Failed to load NFT details. This NFT may not exist.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleBuy() {
    if (!account) {
      setError("Please connect your wallet first");
      return;
    }

    if (!contract || !nftData) {
      setError("Contract not initialized");
      return;
    }

    setIsBuying(true);
    setError("");
    setTxHash("");

    try {
      console.log("Buying NFT...", { tokenId, price: nftData.price.toString() });

      // Call contract's buyNFT function
      const tx = await contract.buyNFT(tokenId, { value: nftData.price });

      console.log("Transaction sent:", tx.hash);
      setTxHash(tx.hash);

      // Wait for confirmation
      await tx.wait();

      console.log("✅ NFT Purchased successfully!");

      // Reload NFT data
      await loadNFTData();

      alert(`NFT #${tokenId} purchased successfully! Transaction: ${tx.hash}`);
    } catch (err) {
      console.error("Purchase error:", err);
      setError(err.message || "Failed to purchase NFT");
    } finally {
      setIsBuying(false);
    }
  }

  if (!account) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h2
              className="text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Connect Your Wallet
            </h2>
            <p className="text-gray-400">Please connect your wallet to view NFT details</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[#00fff9]/20 border-t-[#00fff9] rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading NFT...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !nftData) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚠️</div>
            <h2
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              NFT Not Found
            </h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => navigate("/marketplace")}
              className="px-6 py-3 bg-gradient-to-r from-[#00fff9] to-[#ff006e] text-[#0a0a0f] rounded-lg hover:opacity-90 transition-opacity"
            >
              <span className="font-bold" style={{ fontFamily: "Orbitron, sans-serif" }}>
                Back to Marketplace
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isOwner =
    nftData && account && nftData.owner.toLowerCase() === account.toLowerCase();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/marketplace")}
          className="mb-8 text-gray-400 hover:text-[#00fff9] transition-colors flex items-center gap-2"
        >
          ← Back to Marketplace
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - NFT Display */}
          <div className="space-y-6">
            {/* NFT Visual */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00fff9] via-[#ff006e] to-[#8338ec] rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative aspect-square bg-gradient-to-br from-[#00fff9]/20 via-[#ff006e]/20 to-[#8338ec]/20 rounded-2xl flex items-center justify-center border border-[#00fff9]/20">
                <div
                  className="text-9xl font-black"
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    background:
                      "linear-gradient(135deg, #00fff9 0%, #ff006e 50%, #8338ec 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  #{tokenId}
                </div>
              </div>
            </div>

            {/* NFT Info Card */}
            <div className="p-6 bg-gradient-to-br from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-xl border border-[#00fff9]/20 rounded-xl">
              <h2
                className="text-3xl font-black mb-6"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                NFT #{tokenId}
              </h2>

              {/* Current Owner */}
              <div className="mb-6 pb-6 border-b border-[#00fff9]/10">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Current Owner
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-mono text-[#00fff9]">
                    {nftData && shortenAddress(nftData.owner, 10, 8)}
                  </div>
                  {isOwner && (
                    <span className="px-2 py-1 bg-[#00fff9]/10 border border-[#00fff9]/30 rounded text-xs text-[#00fff9]">
                      You
                    </span>
                  )}
                </div>
              </div>

              {/* Current Price */}
              <div className="mb-6">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Current Price
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-4xl font-black text-white"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                    {nftData && formatEth(nftData.price)}
                  </span>
                  <span className="text-lg text-gray-400">ETH</span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-4">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              {/* Transaction Hash */}
              {txHash && (
                <div className="p-4 bg-[#00fff9]/10 border border-[#00fff9]/30 rounded-lg mb-4">
                  <p className="text-xs text-gray-400 mb-1">Transaction Hash:</p>
                  <p className="text-sm text-[#00fff9] font-mono break-all">{txHash}</p>
                </div>
              )}

              {/* Buy Button */}
              {!isOwner && (
                <button
                  onClick={handleBuy}
                  disabled={isBuying}
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
                    {isBuying ? "Processing..." : "Buy NFT"}
                  </div>
                </button>
              )}

              {isOwner && (
                <div className="p-4 bg-[#00fff9]/10 border border-[#00fff9]/30 rounded-lg text-center">
                  <p className="text-sm text-[#00fff9]">
                    ✓ You own this NFT
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - History & Royalties */}
          <div className="space-y-8">
            {/* Ownership History */}
            <div className="p-6 bg-gradient-to-br from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-xl border border-[#00fff9]/20 rounded-xl">
              {nftData && <OwnershipHistory history={nftData.history} />}
            </div>

            {/* Royalty Breakdown */}
            <div className="p-6 bg-gradient-to-br from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-xl border border-[#00fff9]/20 rounded-xl">
              {nftData && (
                <RoyaltyBreakdown
                  history={nftData.history}
                  royaltyPool={nftData.royaltyPool}
                  currentPrice={nftData.price}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
