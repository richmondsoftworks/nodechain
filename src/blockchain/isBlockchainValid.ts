import { calculateBlockHash } from "../block/calculateBlockHash";
import { isBlockValid } from "../block/isBlockValid";
import { Blockchain } from "./blockchain";

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
