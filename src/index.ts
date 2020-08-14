import { addGenesisBlock, Blockchain, isBlockchainValid } from "./comps/blockchain";

const printChainStats = (chain: Blockchain) => {
  console.log("chain", chain);
  console.log();
  console.log("valid", isBlockchainValid(chain));
  console.log();
};

console.log("starting the blockchain");
console.log();

const chain: Blockchain = {
  blocks: [],
  pendingTransactions: [],
};

addGenesisBlock(chain);

printChainStats(chain);

console.log("manipulating chain");
console.log();

chain.blocks[0].timestamp = new Date().valueOf();

printChainStats(chain);
