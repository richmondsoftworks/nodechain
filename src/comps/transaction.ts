import { hash } from "./crypto";

export type Transaction = {
  fromAddress: string;
  toAddress: string;
  amount: number;
  timestamp: number;
  hash: string;
  signature: string;
};

export const calculateTransactionHash = (tx: Transaction): string => {
  return hash(tx.fromAddress + tx.toAddress + tx.amount + tx.timestamp);
};

export const validateTransaction = (tx: Transaction): string => {
  if (!tx.fromAddress) {
    return "tx: fromAddress is required";
  }

  if (!tx.toAddress) {
    return "tx: toAddress is required";
  }

  if (tx.amount < 0) {
    return "tx: amount is required";
  }

  const hash = calculateTransactionHash(tx);

  if (tx.hash !== hash) {
    return `tx: hash calculation mismatch: [${tx.hash}, ${hash}]`;
  }
};

export const updateTransactionHash = (tx: Transaction): void => {
  tx.hash = calculateTransactionHash(tx);
};
