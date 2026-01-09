import { useState, useEffect, useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { formatEth, shortenAddress, formatDate } from "../utils/formatEth";
import { Sparkles, ShoppingCart, Coins, Crown, FileText, Lock, Scroll, Info, Copy, CheckCircle } from "lucide-react";

export default function TransactionHistory() {
  const { account, contract, provider } = useContext(Web3Context);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, mint, buy, royalty

  useEffect(() => {
    if (account && contract) {
      loadTransactions();
    }
  }, [account, contract, filter]);

  async function loadTransactions() {
    if (!contract || !account) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const txList = [];

      // Get all events related to this account
      // Filter for NFTMinted events where user is the minter
      const mintFilter = contract.filters.NFTMinted(null, account);
      const mintEvents = await contract.queryFilter(mintFilter);

      for (const event of mintEvents) {
        const block = await provider.getBlock(event.blockNumber);
        txList.push({
          type: "mint",
          tokenId: event.args.tokenId.toString(),
          from: null,
          to: account,
          price: event.args.price,
          timestamp: block.timestamp,
          txHash: event.transactionHash,
          blockNumber: event.blockNumber,
        });
      }

      // Filter for NFTBought events where user is buyer or seller
      const buyFilterAsBuyer = contract.filters.NFTBought(null, null, account);
      const buyEventsAsBuyer = await contract.queryFilter(buyFilterAsBuyer);

      const buyFilterAsSeller = contract.filters.NFTBought(null, account);
      const buyEventsAsSeller = await contract.queryFilter(buyFilterAsSeller);

      const allBuyEvents = [...buyEventsAsBuyer, ...buyEventsAsSeller];
      const uniqueBuyEvents = Array.from(
        new Map(allBuyEvents.map((e) => [e.transactionHash, e])).values()
      );

      for (const event of uniqueBuyEvents) {
        const block = await provider.getBlock(event.blockNumber);
        const isBuyer = event.args.buyer.toLowerCase() === account.toLowerCase();

        txList.push({
          type: isBuyer ? "buy" : "sell",
          tokenId: event.args.tokenId.toString(),
          from: event.args.seller,
          to: event.args.buyer,
          price: event.args.price,
          timestamp: block.timestamp,
          txHash: event.transactionHash,
          blockNumber: event.blockNumber,
        });
      }

      // Filter for RoyaltyPaid events where user received royalty
      const royaltyFilter = contract.filters.RoyaltyPaid(null, account);
      const royaltyEvents = await contract.queryFilter(royaltyFilter);

      for (const event of royaltyEvents) {
        const block = await provider.getBlock(event.blockNumber);
        txList.push({
          type: "royalty",
          tokenId: event.args.tokenId.toString(),
          from: null,
          to: account,
          price: event.args.amount,
          timestamp: block.timestamp,
          txHash: event.transactionHash,
          blockNumber: event.blockNumber,
        });
      }

      // Sort by timestamp (newest first)
      txList.sort((a, b) => b.timestamp - a.timestamp);

      // Apply filter
      let filtered = txList;
      if (filter !== "all") {
        filtered = txList.filter((tx) => {
          if (filter === "buy") return tx.type === "buy" || tx.type === "sell";
          return tx.type === filter;
        });
      }

      setTransactions(filtered);
    } catch (err) {
      console.error("Error loading transactions:", err);
    } finally {
      setIsLoading(false);
    }
  }

  function getTransactionIcon(type) {
    const iconProps = { size: 32, strokeWidth: 2 };
    switch (type) {
      case "mint":
        return <Sparkles {...iconProps} className="text-[#8338ec]" />;
      case "buy":
        return <ShoppingCart {...iconProps} className="text-[#ff006e]" />;
      case "sell":
        return <Coins {...iconProps} className="text-[#00fff9]" />;
      case "royalty":
        return <Crown {...iconProps} className="text-yellow-400" />;
      default:
        return <FileText {...iconProps} className="text-gray-400" />;
    }
  }

  function getTransactionColor(type) {
    switch (type) {
      case "mint":
        return "text-[#8338ec]";
      case "buy":
        return "text-[#ff006e]";
      case "sell":
        return "text-[#00fff9]";
      case "royalty":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  }

  function getTransactionTitle(tx) {
    switch (tx.type) {
      case "mint":
        return `Minted NFT #${tx.tokenId}`;
      case "buy":
        return `Bought NFT #${tx.tokenId}`;
      case "sell":
        return `Sold NFT #${tx.tokenId}`;
      case "royalty":
        return `Royalty from NFT #${tx.tokenId}`;
      default:
        return "Transaction";
    }
  }

  if (!account) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-12">
            <Lock size={64} className="mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
            <p className="text-gray-400">
              Please connect your wallet to view transaction history.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-5xl md:text-6xl font-black mb-4"
            style={{
              fontFamily: "Orbitron, sans-serif",
              background: "linear-gradient(135deg, #00fff9 0%, #ff006e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Transaction History
          </h1>
          <p className="text-gray-400 text-lg">
            Immutable on-chain record of your NFT activity
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          {["all", "mint", "buy", "royalty"].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === filterType
                  ? "bg-gradient-to-r from-[#00fff9] to-[#ff006e] text-black"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-[#00fff9] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Loading transactions...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && transactions.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-12">
              <Scroll size={64} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-bold mb-2">No Transactions Yet</h3>
              <p className="text-gray-400">
                {filter === "all"
                  ? "Start by minting or buying an NFT to see your transaction history."
                  : `No ${filter} transactions found.`}
              </p>
            </div>
          </div>
        )}

        {/* Transaction List */}
        {!isLoading && transactions.length > 0 && (
          <div className="space-y-4">
            {transactions.map((tx, index) => (
              <div
                key={`${tx.txHash}-${index}`}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-[#00fff9]/30 transition-all group"
              >
                <div className="flex items-start justify-between gap-6">
                  {/* Icon & Type */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0 mt-1">{getTransactionIcon(tx.type)}</div>
                    <div className="flex-1">
                      <h3
                        className={`text-xl font-bold mb-2 ${getTransactionColor(
                          tx.type
                        )}`}
                      >
                        {getTransactionTitle(tx)}
                      </h3>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {/* Price */}
                        <div>
                          <span className="text-gray-500">Amount:</span>
                          <span className="ml-2 text-white font-semibold">
                            {formatEth(tx.price)} ETH
                          </span>
                        </div>

                        {/* From/To */}
                        {tx.from && (
                          <div>
                            <span className="text-gray-500">From:</span>
                            <span className="ml-2 text-white font-mono">
                              {shortenAddress(tx.from)}
                            </span>
                          </div>
                        )}
                        {tx.to && tx.type !== "royalty" && (
                          <div>
                            <span className="text-gray-500">To:</span>
                            <span className="ml-2 text-white font-mono">
                              {shortenAddress(tx.to)}
                            </span>
                          </div>
                        )}

                        {/* Timestamp */}
                        <div>
                          <span className="text-gray-500">Date:</span>
                          <span className="ml-2 text-white">
                            {formatDate(tx.timestamp)}
                          </span>
                        </div>

                        {/* Block Number */}
                        <div>
                          <span className="text-gray-500">Block:</span>
                          <span className="ml-2 text-white font-mono">
                            #{tx.blockNumber}
                          </span>
                        </div>
                      </div>

                      {/* Transaction Hash */}
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <span className="text-gray-500 text-sm">Tx Hash:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-xs text-[#00fff9] font-mono bg-black/30 px-3 py-1 rounded">
                            {tx.txHash}
                          </code>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(tx.txHash);
                              alert("Transaction hash copied!");
                            }}
                            className="text-gray-400 hover:text-[#00fff9] transition-colors"
                            title="Copy transaction hash"
                          >
                            <Copy size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex-shrink-0">
                    <div className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-semibold border border-green-500/30 flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>Confirmed</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Footer */}
        {!isLoading && transactions.length > 0 && (
          <div className="mt-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <div className="flex items-start gap-3">
              <Info size={24} className="text-[#00fff9] flex-shrink-0" />
              <div>
                <h4 className="font-bold mb-1">Blockchain Transparency</h4>
                <p className="text-sm text-gray-400">
                  All transactions are recorded on the Ethereum blockchain and are
                  immutable. Transaction hashes can be verified on any block
                  explorer.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
