import { formatEth } from "../utils/formatEth";

export default function RoyaltyBreakdown({ history, royaltyPool, currentPrice }) {
  if (!history || history.length === 0) {
    return (
      <div className="p-6 bg-[#0a0a0f]/50 border border-[#00fff9]/10 rounded-lg">
        <p className="text-gray-500 text-center">No royalty data available</p>
      </div>
    );
  }

  // Calculate weights based on ownership levels
  const totalWeight = history.reduce((sum, record) => {
    const level = Number(record.level);
    return sum + level;
  }, 0);

  // Calculate individual shares
  const royaltyShares = history.map((record) => {
    const level = Number(record.level);
    const weight = level;
    const percentage = totalWeight > 0 ? (weight / totalWeight) * 100 : 0;
    const share = royaltyPool
      ? (BigInt(royaltyPool) * BigInt(weight)) / BigInt(totalWeight)
      : 0n;

    return {
      ...record,
      weight,
      percentage,
      share,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3
          className="text-xl font-bold text-white"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Royalty Distribution
        </h3>
        <div className="text-xs bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-3 py-1 rounded-full">
          Preview Only
        </div>
      </div>

      {/* Royalty Pool Display */}
      <div className="p-6 bg-gradient-to-br from-[#00fff9]/10 to-[#ff006e]/10 border border-[#00fff9]/30 rounded-lg">
        <div className="text-center">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">
            Total Royalty Pool
          </div>
          <div className="flex items-baseline justify-center gap-2">
            <span
              className="text-4xl font-black text-white"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {royaltyPool ? formatEth(royaltyPool) : "0.0000"}
            </span>
            <span className="text-lg text-gray-400">ETH</span>
          </div>
          {currentPrice && (
            <div className="text-xs text-gray-500 mt-2">
              From sale at {formatEth(currentPrice)} ETH
            </div>
          )}
        </div>
      </div>

      {/* Individual Shares */}
      <div className="space-y-3">
        <div className="text-sm text-gray-400 uppercase tracking-wider">
          Distribution Breakdown
        </div>

        {royaltyShares.map((share, index) => (
          <div
            key={index}
            className="p-4 bg-[#0a0a0f]/50 border border-[#00fff9]/10 rounded-lg hover:border-[#00fff9]/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="px-2 py-1 bg-[#ff006e]/10 border border-[#ff006e]/30 rounded text-xs font-bold text-[#ff006e]"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  L{share.level.toString()}
                </div>
                <div className="text-sm font-mono text-gray-300">
                  {share.owner.slice(0, 6)}...{share.owner.slice(-4)}
                </div>
              </div>
              <div className="text-right">
                <div
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {share.percentage.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-[#0a0a0f] rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-[#00fff9] to-[#ff006e] rounded-full transition-all duration-500"
                style={{ width: `${share.percentage}%` }}
              ></div>
            </div>

            {/* Share amount */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">
                Weight: {share.weight} / {totalWeight}
              </span>
              <span className="text-[#00fff9] font-mono">
                {formatEth(share.share)} ETH
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
        <p className="text-xs text-yellow-400/80 leading-relaxed">
          ⚠️ <strong>Preview Only:</strong> This breakdown is calculated for display purposes.
          Actual royalty distribution is enforced by the smart contract and executed atomically
          during NFT transfers. The contract guarantees transparent, immutable payouts.
        </p>
      </div>
    </div>
  );
}
