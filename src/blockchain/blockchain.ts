import { Block } from "../block/block";
import { Transaction } from "../transaction/transaction";

export type Blockchain = {
  blocks: Block[];
  pendingTransactions: Transaction[];
};
