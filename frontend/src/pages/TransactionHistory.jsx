import { useContext, useState } from "react";
import { Web3Context } from "../context/Web3Context";

export default function History() {
  const { contract, account } = useContext(Web3Context);
  const [tokenId, setTokenId] = useState("");
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

    try {
      const historyArray = [];
      let index = 0;
      let hasMore = true;

      // Fetch ownership history entries one by one
      // We'll keep fetching until we get an error (which means we've reached the end)
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
          // If we get an error, we've likely reached the end of the array
          // Check if it's a "revert" error (which means index out of bounds)
          if (err.message && err.message.includes("revert")) {
            hasMore = false;
          } else if (index === 0) {
            // If we get an error on the first fetch, the token might not exist
            throw new Error("Token ID not found or has no ownership history");
          } else {
            hasMore = false;
          }
        }
      }

      if (historyArray.length === 0) {
        setError("No ownership history found for this token ID");
      } else {
        setHistory(historyArray);
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
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00fff9] to-[#ff006e] flex items-center justify-center text-white font-bold">
                          {h.level}
                        </div>
                        <div>
                          <p className="text-white font-mono text-sm">{h.owner}</p>
                          <p className="text-gray-400 text-xs">Level {h.level} Owner</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-xs">Entry #{h.index}</p>
                        {i === 0 && (
                          <span className="text-xs text-[#00fff9]">Original Owner</span>
                        )}
                        {i === history.length - 1 && i > 0 && (
                          <span className="text-xs text-[#ff006e]">Current Owner</span>
                        )}
                      </div>
                    </div>
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
