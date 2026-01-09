import { ethers } from "ethers";

/**
 * Format Wei to ETH with decimal places
 * @param {string|BigInt} wei - Amount in Wei
 * @param {number} decimals - Number of decimal places (default: 4)
 * @returns {string} Formatted ETH value
 */
export function formatEth(wei, decimals = 4) {
  if (!wei) return "0";
  const eth = ethers.formatEther(wei);
  return parseFloat(eth).toFixed(decimals);
}

/**
 * Parse ETH to Wei
 * @param {string} eth - Amount in ETH
 * @returns {BigInt} Amount in Wei
 */
export function parseEth(eth) {
  return ethers.parseEther(eth.toString());
}

/**
 * Shorten wallet address for display
 * @param {string} address - Wallet address
 * @param {number} startChars - Characters to show at start (default: 6)
 * @param {number} endChars - Characters to show at end (default: 4)
 * @returns {string} Shortened address
 */
export function shortenAddress(address, startChars = 6, endChars = 4) {
  if (!address) return "";
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Format timestamp to readable date
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted date string
 */
export function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
