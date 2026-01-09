import { useContext, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import { ethers } from "ethers";
import { formatEth } from "../utils/formatEth";

export default function History() {
  const { contract, account } = useContext(Web3Context);
  const [tokenId, setTokenId] = useState("");
  const [history, setHistory] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate price at each transfer point
  // Price increases by 10% each time, so we work backwards from current price
  // If there are n entries:
  // - Entry 0 (mint): initialPrice = currentPrice / 1.1^(n-1)
  // - Entry 1 (1st purchase): price = initialPrice = currentPrice / 1.1^(n-1)
  // - Entry 2 (2nd purchase): price = initialPrice * 1.1 = currentPrice / 1.1^(n-2)
  // - Entry i (i > 0): price = currentPrice / 1.1^(n-i)
  const calculatePriceAtTransfer = (currentPrice, totalEntries, entryIndex) => {
    if (totalEntries === 1) {
      // Only mint, no sales yet
      return currentPrice;
    }
    
    const power = totalEntries - 1 - entryIndex;
    
    if (power === 0) {
      return currentPrice;
    }
    
    // Calculate 1.1^power = (110/100)^power
    // We need: currentPrice / 1.1^power = currentPrice * 100^power / 110^power
    let divisor = BigInt(1);
    let multiplier = BigInt(1);
    
    for (let j = 0; j < power; j++) {
      divisor = divisor * BigInt(110);
      multiplier = multiplier * BigInt(100);
    }
    
    return (currentPrice * multiplier) / divisor;
  };

  // Calculate royalty distribution for a specific transfer
  const calculateRoyaltyDistribution = (salePrice, historyUpToIndex) => {
    const royaltyPercent = 10n; // 10%
    const royaltyPool = (salePrice * royaltyPercent) / 100n;
    
    // Calculate sum of levels (excluding the seller who is at historyUpToIndex)
    let sumLevels = 0n;
    for (let i = 0; i < historyUpToIndex; i++) {
      sumLevels += BigInt(historyUpToIndex[i].level);
    }

    // Calculate each owner's share
    const distribution = [];
    for (let i = 0; i < historyUpToIndex; i++) {
      const level = BigInt(historyUpToIndex[i].level);
      const share = sumLevels > 0n ? (royaltyPool * level) / sumLevels : 0n;
      distribution.push({
        owner: historyUpToIndex[i].owner,
        level: historyUpToIndex[i].level,
        share: share,
      });
    }

    return {
      royaltyPool,
      sellerReceives: salePrice - royaltyPool,
      distribution,
    };
  };

  const fetchHistory = async () => {
    if (!contract) {
      setError("Contract not initialized");
      return;
    }

    if (!tokenId) {
      setError("Please enter a token ID");
      return;
    }

    setIsLoading(true);
    setError("");
    setHistory([]);
    setExpandedIndex(null);

    try {
      const historyArray = [];
      let index = 0;
      let hasMore = true;

      // Fetch ownership history entries one by one
      while (hasMore) {
        try {
          const entry = await contract.ownershipHistory(tokenId, index);
          historyArray.push({
            owner: entry.owner,
            level: entry.level.toString(),
            index: index,
          });
          index++;
        } catch (err) {
          if (err.message && err.message.includes("revert")) {
            hasMore = false;
          } else if (index === 0) {
            throw new Error("Token ID not found or has no ownership history");
          } else {
            hasMore = false;
          }
        }
      }

      if (historyArray.length === 0) {
        setError("No ownership history found for this token ID");
      } else {
        // Get current price to calculate historical prices
        const currentPrice = await contract.currentPrice(tokenId);
        
        // Calculate price and transaction details for each transfer
        const enrichedHistory = historyArray.map((entry, i) => {
          if (i === 0) {
            // First entry is the mint - get initial price
            return {
              ...entry,
              type: "mint",
              price: currentPrice ? calculatePriceAtTransfer(currentPrice, historyArray.length, 0) : 0n,
              transactionDetails: null,
            };
          } else {
            // Calculate the sale price when this owner bought it
            const salePrice = calculatePriceAtTransfer(currentPrice, historyArray.length, i);
            const transactionDetails = calculateRoyaltyDistribution(salePrice, historyArray.slice(0, i));
            
            return {
              ...entry,
              type: "purchase",
              price: salePrice,
              transactionDetails,
            };
          }
        });

        setHistory(enrichedHistory);
      }
    } catch (err) {
      console.error("Error fetching history:", err);
      setError(err.message || "Failed to fetch ownership history");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Ownership History
          </h1>
          <p className="text-gray-400">View the complete ownership history of any NFT</p>
        </div>

        {/* Search Form */}
        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00fff9] via-[#ff006e] to-[#8338ec] rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          
          <div className="relative bg-gradient-to-br from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-xl border border-[#00fff9]/20 rounded-2xl p-8">
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Enter Token ID"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                className="flex-1 px-4 py-3 bg-[#0a0a0f]/50 border border-[#00fff9]/20 rounded-lg text-white placeholder-gray-600 focus:border-[#00fff9] focus:outline-none transition-colors"
                style={{ fontFamily: "Orbitron, sans-serif" }}
                disabled={isLoading}
              />
              <button
                onClick={fetchHistory}
                disabled={isLoading || !account || !tokenId}
                className="px-8 py-3 bg-gradient-to-r from-[#00fff9] to-[#ff006e] text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                {isLoading ? "Loading..." : "Fetch History"}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-6">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* History List */}
        {history.length > 0 && (
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00fff9] via-[#ff006e] to-[#8338ec] rounded-2xl blur-xl opacity-20"></div>
            
            <div className="relative bg-gradient-to-br from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-xl border border-[#00fff9]/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "Orbitron, sans-serif" }}>
                Token #{tokenId} Ownership History
              </h2>
              
              <div className="space-y-4">
                {history.map((h, i) => (
                  <div
                    key={i}
                    className="p-4 bg-[#0a0a0f]/50 border border-[#00fff9]/20 rounded-lg hover:border-[#00fff9]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00fff9] to-[#ff006e] flex items-center justify-center text-white font-bold">
                          {h.level}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-mono text-sm">{h.owner}</p>
                          <p className="text-gray-400 text-xs">
                            {h.type === "mint" ? "Minted" : `Purchased at ${formatEth(h.price)} ETH`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {(h.type === "purchase" || h.type === "mint") && (
                          <div className="mb-2">
                            <p className="text-[#00fff9] font-bold text-sm">
                              {formatEth(h.price)} ETH
                            </p>
                            <p className="text-gray-500 text-xs">
                              {h.type === "mint" ? "Initial Price" : "Sale Price"}
                            </p>
                          </div>
                        )}
                        {i === 0 && (
                          <span className="text-xs text-[#00fff9] block">Original Owner</span>
                        )}
                        {i === history.length - 1 && i > 0 && (
                          <span className="text-xs text-[#ff006e] block">Current Owner</span>
                        )}
                      </div>
                    </div>

                    {/* Expandable Transaction Details */}
                    {h.type === "purchase" && h.transactionDetails && (
                      <div className="mt-4 pt-4 border-t border-[#00fff9]/10">
                        <button
                          onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                          className="w-full text-left text-sm text-[#00fff9] hover:text-[#00fff9]/80 transition-colors flex items-center justify-between"
                        >
                          <span>View Transaction Details</span>
                          <span className="text-lg">
                            {expandedIndex === i ? "−" : "+"}
                          </span>
                        </button>

                        {expandedIndex === i && (
                          <div className="mt-4 space-y-3 animate-fadeIn">
                            {/* Sale Summary */}
                            <div className="p-3 bg-[#0a0a0f]/70 rounded-lg">
                              <h4 className="text-xs text-gray-400 uppercase mb-2">Sale Summary</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Sale Price:</span>
                                  <span className="text-white font-bold">{formatEth(h.price)} ETH</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Royalty Pool (10%):</span>
                                  <span className="text-[#00fff9] font-bold">
                                    {formatEth(h.transactionDetails.royaltyPool)} ETH
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Seller Receives:</span>
                                  <span className="text-[#ff006e] font-bold">
                                    {formatEth(h.transactionDetails.sellerReceives)} ETH
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Royalty Distribution */}
                            {h.transactionDetails.distribution.length > 0 && (
                              <div className="p-3 bg-[#0a0a0f]/70 rounded-lg">
                                <h4 className="text-xs text-gray-400 uppercase mb-2">
                                  Royalty Distribution to Previous Owners
                                </h4>
                                <div className="space-y-2">
                                  {h.transactionDetails.distribution.map((dist, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center justify-between p-2 bg-[#0a0a0f]/50 rounded"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">Level {dist.level}</span>
                                        <span className="text-white font-mono text-xs">
                                          {dist.owner.slice(0, 6)}...{dist.owner.slice(-4)}
                                        </span>
                                      </div>
                                      <span className="text-[#00fff9] font-bold text-sm">
                                        {formatEth(dist.share)} ETH
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-[#00fff9]/10">
                <p className="text-sm text-gray-400">
                  Total ownership transfers: <span className="text-[#00fff9] font-bold">{history.length}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && history.length === 0 && !error && tokenId && (
          <div className="text-center py-12">
            <p className="text-gray-400">Enter a token ID and click "Fetch History" to view ownership history</p>
          </div>
        )}
      </div>
    </div>
  );
}
