import { Block, calculateBlockHash, isBlockValid, updateBlockHash } from "./block";
import { Transaction } from "./transaction";

export type Blockchain = {
  blocks: Block[];
  pendingTransactions: Transaction[];
};

export const addGenesisBlock = (chain: Blockchain): Blockchain => {
  const block: Block = {
    nonce: 0,
    timestamp: new Date().valueOf(),
    transactions: [],
    hash: "",
    previousHash: "",
  };

  updateBlockHash(block);

  chain.blocks.push(block);

  return chain;
};

export const isBlockchainValid = (chain: Blockchain): boolean => {
  const blocks = chain.blocks;

  if (!isBlockValid(blocks[0])) {
    return false;
  }

  for (let i = 1; i < blocks.length; i++) {
    const previous = blocks[i - 1];
    const current = blocks[i];

    if (previous.hash !== calculateBlockHash(previous)) {
      return false;
    }

    if (isBlockValid(current)) {
      return false;
    }

    if (previous.hash !== current.previousHash) {
      return false;
    }
  }

  return true;
};
