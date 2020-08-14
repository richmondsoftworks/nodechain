import { Block } from "../block/block";
import { updateBlockHash } from "../block/updateBlockHash";
import { Blockchain } from "./blockchain";

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
