import { createHash } from "crypto";

import { Transaction } from "./transaction";

const createHasher = () => createHash("sha256");

export type Block = {
  nonce: number;
  timestamp: number;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
};

export const calculateBlockHash = (block: Block): string => {
  return createHasher()
    .update(block.nonce + block.timestamp + block.previousHash + JSON.stringify(block.transactions))
    .digest("hex");
};

export const isBlockValid = (block: Block): boolean => {
  return block.hash === calculateBlockHash(block);
};

export const updateBlockHash = (block: Block): Block => {
  block.hash = calculateBlockHash(block);

  return block;
};
