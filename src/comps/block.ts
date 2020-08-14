import { hash } from "./crypto";
import { Transaction } from "./transaction";

export type Block = {
  nonce: number;
  timestamp: number;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
};

export const calculateBlockHash = (block: Block): string => {
  return hash(block.nonce + block.timestamp + block.previousHash + JSON.stringify(block.transactions));
};

export const updateBlockHash = (block: Block): void => {
  block.hash = calculateBlockHash(block);
};

export const validateBlock = (block: Block): string => {
  const hash = calculateBlockHash(block);

  if (block.hash !== hash) {
    return `block hash mismatch: [${block.hash}, ${hash}]`;
  }
};
