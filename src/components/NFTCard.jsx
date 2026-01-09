import { Link } from "react-router-dom";
import { formatEth } from "../utils/formatEth";

export default function NFTCard({ tokenId, price, owner, currentUser }) {
  const isOwner = owner && currentUser && owner.toLowerCase() === currentUser.toLowerCase();

  return (
    <Link to={`/nft/${tokenId}`} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-xl border border-[#00fff9]/20 hover:border-[#00fff9]/50 transition-all duration-300">
        {/* Glow effect on hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00fff9] via-[#ff006e] to-[#8338ec] rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

        <div className="relative p-6">
          {/* NFT Visual */}
          <div className="aspect-square mb-4 rounded-lg bg-gradient-to-br from-[#00fff9]/20 via-[#ff006e]/20 to-[#8338ec]/20 flex items-center justify-center overflow-hidden">
            <div
              className="text-6xl font-black"
              style={{
                fontFamily: "Orbitron, sans-serif",
                background: "linear-gradient(135deg, #00fff9 0%, #ff006e 50%, #8338ec 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              #{tokenId}
            </div>
          </div>

          {/* Token Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Token ID</span>
              <span
                className="text-sm font-bold text-[#00fff9]"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                #{tokenId}
              </span>
            </div>

            {price && (
              <div className="flex items-center justify-between pt-3 border-t border-[#00fff9]/10">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Price</span>
                <div className="flex items-center gap-1">
                  <span
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                    {formatEth(price)}
                  </span>
                  <span className="text-xs text-gray-400">ETH</span>
                </div>
              </div>
            )}

            {/* Owner badge */}
            {isOwner && (
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#00fff9]/10 border border-[#00fff9]/30 rounded text-xs text-[#00fff9]">
                  <span>●</span> You own this
                </span>
              </div>
            )}
          </div>

          {/* Hover indicator */}
          <div className="mt-4 pt-4 border-t border-[#00fff9]/10 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs text-[#00fff9] uppercase tracking-wider">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
