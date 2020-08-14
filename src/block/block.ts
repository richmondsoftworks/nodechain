import { Transaction } from "../transaction/transaction";

export type Block = {
  nonce: number;
  timestamp: number;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
};
