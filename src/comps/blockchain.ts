import { Block, calculateBlockHash, updateBlockHash, validateBlock } from "./block";
import { Transaction, updateTransactionHash, validateTransaction } from "./transaction";

export type Blockchain = {
  blocks: Block[];
  pendingTransactions: Transaction[];
};

const reward = 10;

export const addGenesisBlock = (chain: Blockchain): void => {
  const block: Block = {
    nonce: 0,
    timestamp: new Date().valueOf(),
    transactions: [],
    hash: "",
    previousHash: "",
  };

  updateBlockHash(block);

  chain.blocks.push(block);
};

export const addTransaction = (chain: Blockchain, from: string, to: string, amount: number): void => {
  const tx: Transaction = {
    fromAddress: from,
    toAddress: to,
    amount,
    timestamp: new Date().valueOf(),
    hash: "",
    signature: "",
  };

  updateTransactionHash(tx);

  const validation = validateTransaction(tx);

  if (validation) {
    throw new Error(validation);
  }

  chain.pendingTransactions.push(tx);
};

export const minePendingTransactions = (chain: Blockchain, miner: string): void => {
  const previous = chain.blocks[chain.blocks.length - 1];

  const block: Block = {
    nonce: 0,
    timestamp: null,
    transactions: [],
    hash: "",
    previousHash: previous.hash,
  };

  for (const tx of chain.pendingTransactions) {
    const validation = validateTransaction(tx);

    if (validation) {
      console.error("invalid tx while mining", validation, tx);
      console.error();

      continue;
    }

    block.transactions.push(tx);
  }

  addTransaction(chain, "system-rewards", miner, reward);

  // TODO: difficulty

  block.timestamp = new Date().valueOf();
  updateBlockHash(block);

  chain.blocks.push(block);
  chain.pendingTransactions = chain.pendingTransactions.filter(
    (x) => !block.transactions.some((y) => y.hash === x.hash)
  );
};

export const validateBlockchain = (chain: Blockchain): string => {
  const blocks = chain.blocks;

  const genesisValidation = validateBlock(blocks[0]);

  if (genesisValidation) {
    return genesisValidation;
  }

  for (let i = 1; i < blocks.length; i++) {
    const previous = blocks[i - 1];
    const current = blocks[i];

    if (previous.hash !== current.previousHash) {
      return `previous.hash, current.previousHash mismatch: [${previous.hash}, ${current.previousHash}]`;
    }

    const hash = calculateBlockHash(previous);

    if (previous.hash !== hash) {
      return `previous hash calculation mismatch: [${previous.hash}, ${hash}]`;
    }

    const validation = validateBlock(current);

    if (validation) {
      return validation;
    }
  }
};
