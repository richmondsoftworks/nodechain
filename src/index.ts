import { addGenesisBlock } from "./blockchain/addGenesisBlock";
import { Blockchain } from "./blockchain/blockchain";
import { isBlockchainValid } from "./blockchain/isBlockchainValid";

const printChainStats = (chain: Blockchain) => {
  console.log("chain", chain);
  console.log("valid", isBlockchainValid(chain));
};

console.log("starting the blockchain");

const chain: Blockchain = {
  blocks: [],
  pendingTransactions: [],
};

addGenesisBlock(chain);

printChainStats(chain);

console.log("manipulating chain");

chain.blocks[0].timestamp = new Date().valueOf();

printChainStats(chain);
