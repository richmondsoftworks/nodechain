import { Block } from "./block";
import { calculateBlockHash } from "./calculateBlockHash";

export const updateBlockHash = (block: Block): Block => {
  block.hash = calculateBlockHash(block);

  return block;
};
