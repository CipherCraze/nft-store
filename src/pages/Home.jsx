import { Link } from "react-router-dom";
import { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { Shield, Gem, Zap, Link2 } from "lucide-react";

export default function Home() {
  const { account } = useContext(Web3Context);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8338ec] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00fff9] rounded-full mix-blend-screen filter blur-[140px] opacity-20"
            style={{ animation: "rotate-gradient 20s linear infinite" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#ff006e] rounded-full mix-blend-screen filter blur-[100px] opacity-25"
            style={{ animation: "float 15s ease-in-out infinite" }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center space-y-8">
            <h1
              className="text-6xl md:text-8xl font-black mb-6"
              style={{
                fontFamily: "Orbitron, sans-serif",
                background: "linear-gradient(135deg, #00fff9 0%, #ff006e 50%, #8338ec 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 200%",
                animation: "shimmer 3s ease-in-out infinite",
              }}
            >
              VAULT
            </h1>

            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-xl md:text-2xl text-gray-300 font-light">
                Transparent NFT Marketplace with{" "}
                <span className="text-[#00fff9] font-semibold">On-Chain Royalty Distribution</span>
              </p>
              <p className="text-gray-500 text-sm md:text-base">
                Every previous owner earns royalties automatically. Powered by Ethereum smart
                contracts.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link
                to="/mint"
                className="group relative overflow-hidden px-8 py-4 rounded-lg min-w-[200px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00fff9] to-[#ff006e] opacity-100 group-hover:opacity-80 transition-opacity"></div>
                <span
                  className="relative text-lg font-bold tracking-wider uppercase"
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    color: "#0a0a0f",
                  }}
                >
                  Mint NFT
                </span>
              </Link>

              <Link
                to="/marketplace"
                className="px-8 py-4 border-2 border-[#00fff9] text-[#00fff9] rounded-lg hover:bg-[#00fff9]/10 transition-colors min-w-[200px]"
              >
                <span
                  className="text-lg font-bold tracking-wider uppercase"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  Explore
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 bg-gradient-to-br from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-xl border border-[#00fff9]/20 rounded-xl">
            <div className="w-12 h-12 bg-[#00fff9]/20 rounded-lg flex items-center justify-center mb-4">
              <Link2 size={24} className="text-[#00fff9]" />
            </div>
            <h3
              className="text-xl font-bold text-white mb-3"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              On-Chain History
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every ownership transfer is recorded on the blockchain. Full transparency, zero
              manipulation.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 bg-gradient-to-br from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-xl border border-[#ff006e]/20 rounded-xl">
            <div className="w-12 h-12 bg-[#ff006e]/20 rounded-lg flex items-center justify-center mb-4">
              <Gem size={24} className="text-[#ff006e]" />
            </div>
            <h3
              className="text-xl font-bold text-white mb-3"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Automatic Royalties
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Previous owners earn royalties on every resale. Weighted by ownership level.
              Enforced by smart contract.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 bg-gradient-to-br from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-xl border border-[#8338ec]/20 rounded-xl">
            <div className="w-12 h-12 bg-[#8338ec]/20 rounded-lg flex items-center justify-center mb-4">
              <Zap size={24} className="text-[#8338ec]" />
            </div>
            <h3
              className="text-xl font-bold text-white mb-3"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Instant Transfers
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Buy, sell, and transfer NFTs instantly. All transactions are atomic and secure on
              Ethereum.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {account && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="p-8 bg-gradient-to-r from-[#00fff9]/10 via-[#ff006e]/10 to-[#8338ec]/10 border border-[#00fff9]/20 rounded-xl">
            <div className="text-center mb-6">
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                Ready to Start?
              </h3>
              <p className="text-gray-400 mt-2">Wallet connected. Choose your next action.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/mint"
                className="px-6 py-3 bg-gradient-to-r from-[#00fff9] to-[#ff006e] text-[#0a0a0f] rounded-lg hover:opacity-90 transition-opacity"
              >
                <span className="font-bold" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  Mint Your First NFT
                </span>
              </Link>
              <Link
                to="/marketplace"
                className="px-6 py-3 border border-[#00fff9] text-[#00fff9] rounded-lg hover:bg-[#00fff9]/10 transition-colors"
              >
                <span className="font-bold" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  Browse Marketplace
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
