import { inspect } from "util";

import {
  addGenesisBlock,
  addTransaction,
  Blockchain,
  minePendingTransactions,
  validateBlockchain
} from "./comps/blockchain";

inspect.defaultOptions.depth = null;

const printChainStats = (chain: Blockchain) => {
  console.log("chain:", chain);
  console.log();
  console.log("validation:", validateBlockchain(chain));
  console.log();
};

console.log("starting the blockchain");
console.log();

const chain: Blockchain = {
  blocks: [],
  pendingTransactions: [],
};

addGenesisBlock(chain);

addTransaction(chain, "me", "you", 10);

printChainStats(chain);

console.log("mining");
console.log();

minePendingTransactions(chain, "super");

printChainStats(chain);

console.log("manipulating chain");
console.log();

chain.blocks[0].timestamp = new Date().valueOf();

printChainStats(chain);
