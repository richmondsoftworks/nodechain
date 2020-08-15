import { Block } from "./block";
import { Transaction } from "./transaction";

export class Blockchain {
  blocks: Block[] = [];
  pendingTransactions: Transaction[] = [];

  private reward = 10;

  addGenesisBlock = (): void => {
    const block = new Block("").stampAndHash();

    this.blocks.push(block);
  };

  addTransaction = (from: string, to: string, amount: number): void => {
    const tx = new Transaction(from, to, amount).stampAndHash();

    const validation = tx.validate();

    if (validation) {
      throw new Error(validation);
    }

    this.pendingTransactions.push(tx);
  };

  minePendingTransactions = (miner: string): void => {
    const previous = this.blocks[this.blocks.length - 1];

    const block = new Block(previous.hash);

    for (const tx of this.pendingTransactions) {
      const validation = tx.validate();

      if (validation) {
        console.error("invalid tx while mining", validation, tx);
        console.error();

        continue;
      }

      block.transactions.push(tx);
    }

    this.addTransaction("system-rewards", miner, this.reward);

    // TODO: difficulty

    block.stampAndHash();

    this.blocks.push(block);

    this.pendingTransactions = this.pendingTransactions.filter(
      (x) => !block.transactions.some((y) => y.hash === x.hash)
    );
  };

  validate = (): string => {
    const blocks = this.blocks;

    const genesisValidation = blocks[0].validate();

    if (genesisValidation) {
      return genesisValidation;
    }

    for (let i = 1; i < blocks.length; i++) {
      const previous = blocks[i - 1];
      const current = blocks[i];

      if (previous.hash !== current.previousHash) {
        return `previous.hash, current.previousHash mismatch: [${previous.hash}, ${current.previousHash}]`;
      }

      const hash = previous.calculateHash();

      if (previous.hash !== hash) {
        return `previous hash calculation mismatch: [${previous.hash}, ${hash}]`;
      }

      const validation = current.validate();

      if (validation) {
        return validation;
      }
    }
  };
}
