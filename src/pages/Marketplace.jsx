import { useState, useEffect, useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import NFTCard from "../components/NFTCard";

export default function Marketplace() {
  const { account, contract } = useContext(Web3Context);
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNFTs();
  }, [contract]);

  async function loadNFTs() {
    if (!contract) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // For demo purposes, let's try to load NFTs with IDs 1-10
      // In production, you'd have a way to query all minted NFTs
      const nftPromises = [];
      
      for (let i = 1; i <= 10; i++) {
        nftPromises.push(
          (async () => {
            try {
              const owner = await contract.ownerOf(i);
              const price = await contract.getCurrentPrice(i);
              return { tokenId: i, owner, price };
            } catch {
              return null; // NFT doesn't exist
            }
          })()
        );
      }

      const results = await Promise.all(nftPromises);
      const existingNFTs = results.filter((nft) => nft !== null);

      setNfts(existingNFTs);
      console.log("Loaded NFTs:", existingNFTs);
    } catch (err) {
      console.error("Error loading NFTs:", err);
      setError("Failed to load marketplace");
    } finally {
      setIsLoading(false);
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
            <p className="text-gray-400">
              Please connect your wallet to view the marketplace
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-5xl md:text-6xl font-black mb-4"
            style={{
              fontFamily: "Orbitron, sans-serif",
              background: "linear-gradient(135deg, #00fff9 0%, #ff006e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Marketplace
          </h1>
          <p className="text-gray-400">Browse and purchase NFTs from the collection</p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[#00fff9]/20 border-t-[#00fff9] rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading NFTs...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg mb-8">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && nfts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <h3
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              No NFTs Yet
            </h3>
            <p className="text-gray-400 mb-6">Be the first to mint an NFT!</p>
            <a
              href="/mint"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#00fff9] to-[#ff006e] text-[#0a0a0f] rounded-lg hover:opacity-90 transition-opacity"
            >
              <span className="font-bold" style={{ fontFamily: "Orbitron, sans-serif" }}>
                Mint NFT
              </span>
            </a>
          </div>
        )}

        {/* NFT Grid */}
        {!isLoading && !error && nfts.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400">
                {nfts.length} NFT{nfts.length !== 1 ? "s" : ""} available
              </p>
              <button
                onClick={loadNFTs}
                className="px-4 py-2 text-sm text-[#00fff9] border border-[#00fff9]/30 rounded-lg hover:bg-[#00fff9]/10 transition-colors"
              >
                Refresh
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {nfts.map((nft) => (
                <NFTCard
                  key={nft.tokenId}
                  tokenId={nft.tokenId}
                  price={nft.price}
                  owner={nft.owner}
                  currentUser={account}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
