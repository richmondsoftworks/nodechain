import { createHash } from "crypto";

import { Block } from "./block";

const createHasher = () => createHash("sha256");

export const calculateBlockHash = (block: Block): string => {
  return createHasher()
    .update(block.nonce + block.timestamp + block.previousHash + JSON.stringify(block.transactions))
    .digest("hex");
};
