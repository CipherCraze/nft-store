import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import { ethers } from "ethers";

export default function Marketplace() {
  const { contract } = useContext(Web3Context);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    if (!contract) return;

    const loadNFTs = async () => {
      const total = await contract.tokenCounter();
      const items = [];

      for (let i = 0; i < total; i++) {
        const price = await contract.currentPrice(i);
        const owner = await contract.ownerOf(i);

        items.push({
          tokenId: i,
          price: ethers.formatEther(price),
          owner,
        });
      }

      setNfts(items);
    };

    loadNFTs();
  }, [contract]);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Marketplace</h2>

      {nfts.map((nft) => (
        <div key={nft.tokenId} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p><b>Token ID:</b> {nft.tokenId}</p>
          <p><b>Price:</b> {nft.price} ETH</p>
          <p><b>Owner:</b> {nft.owner}</p>

          <button
            onClick={() =>
              contract.buyNFT(nft.tokenId, {
                value: ethers.parseEther(nft.price),
              })
            }
          >
            Buy NFT
          </button>
        </div>
      ))}
    </div>
  );
}
