import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MintNFT from "./pages/MintNFT";
import Marketplace from "./pages/Marketplace";
import NFTDetail from "./pages/NFTDetail";

function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated background layers */}
        <div className="fixed inset-0 bg-[#050508]">
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

        {/* Grid overlay */}
        <div
          className="fixed inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#00fff9 1px, transparent 1px), linear-gradient(90deg, #00fff9 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mint" element={<MintNFT />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/nft/:tokenId" element={<NFTDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
