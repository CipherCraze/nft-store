import { Link } from "react-router-dom";
import WalletStatus from "./WalletStatus";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-[#00fff9]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00fff9] to-[#ff006e] rounded-lg group-hover:scale-110 transition-transform"></div>
            <span
              className="text-2xl font-black tracking-tight"
              style={{
                fontFamily: "Orbitron, sans-serif",
                background: "linear-gradient(135deg, #00fff9 0%, #ff006e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              VAULT
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-400 hover:text-[#00fff9] transition-colors text-sm uppercase tracking-wider"
            >
              Home
            </Link>
            <Link
              to="/mint"
              className="text-gray-400 hover:text-[#ff006e] transition-colors text-sm uppercase tracking-wider"
            >
              Mint
            </Link>
            <Link
              to="/marketplace"
              className="text-gray-400 hover:text-[#8338ec] transition-colors text-sm uppercase tracking-wider"
            >
              Marketplace
            </Link>
          </div>

          {/* Wallet Status */}
          <WalletStatus />
        </div>
      </div>
    </nav>
  );
}
