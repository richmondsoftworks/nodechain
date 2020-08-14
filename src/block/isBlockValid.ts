import { Block } from "./block";
import { calculateBlockHash } from "./calculateBlockHash";

export const isBlockValid = (block: Block): boolean => {
  return block.hash === calculateBlockHash(block);
};
