import { useContext, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import { ethers } from "ethers";

export default function BuyNFT() {
  const { contract } = useContext(Web3Context);
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  const buyNFT = async () => {
    if (!contract) {
      setStatus("Contract not loaded");
      return;
    }

    try {
      setStatus("Waiting for MetaMask...");

      const tx = await contract.buyNFT(tokenId, {
        value: ethers.parseEther(price),
      });

      setStatus("Transaction sent...");
      await tx.wait();

      setStatus("NFT purchased successfully!");
    } catch (err) {
      console.error(err);
      setStatus("Transaction failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Buy NFT</h2>

      <input
        placeholder="Token ID (e.g. 0)"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />

      <input
        placeholder="Price in ETH"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={buyNFT}>Buy NFT</button>

      <p>{status}</p>
    </div>
  );
}
