import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import { ethers } from "ethers";

export default function MyNFTs() {
  const { contract, account } = useContext(Web3Context);
  const [myNFTs, setMyNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contract || !account) return;

    const loadMyNFTs = async () => {
      setLoading(true);
      const total = await contract.tokenCounter();
      const items = [];

      for (let i = 0; i < total; i++) {
        try {
          const owner = await contract.ownerOf(i);

          if (owner.toLowerCase() === account.toLowerCase()) {
            const price = await contract.currentPrice(i);

            items.push({
              tokenId: i,
              price: ethers.formatEther(price),
            });
          }
        } catch (err) {
          // token may not exist yet – ignore
        }
      }

      setMyNFTs(items);
      setLoading(false);
    };

    loadMyNFTs();
  }, [contract, account]);

  return (
    <div style={{ padding: "40px" }}>
      <h2>My NFTs</h2>

      {loading && <p>Loading your NFTs...</p>}

      {!loading && myNFTs.length === 0 && (
        <p>You don’t own any NFTs yet.</p>
      )}

      {myNFTs.map((nft) => (
        <div
          key={nft.tokenId}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p><b>Token ID:</b> {nft.tokenId}</p>
          <p><b>Current Price:</b> {nft.price} ETH</p>
          <p style={{ color: "green" }}>✔ You own this NFT</p>
        </div>
      ))}
    </div>
  );
}
