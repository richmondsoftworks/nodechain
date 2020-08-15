import { hash } from "./crypto";
import { Transaction } from "./transaction";

export class Block {
  nonce: number;
  timestamp: number;
  transactions: Transaction[] = [];
  previousHash: string;
  hash: string;

  constructor(previousHash: string) {
    this.previousHash = previousHash;
  }

  calculateHash = (): string => {
    return hash(this.nonce + this.timestamp + this.previousHash + JSON.stringify(this.transactions));
  };

  stampAndHash = (): Block => {
    this.timestamp = new Date().valueOf();
    this.hash = this.calculateHash();

    return this;
  };

  validate = (): string => {
    const hash = this.calculateHash();

    if (this.hash !== hash) {
      return `block hash mismatch: [${this.hash}, ${hash}]`;
    }
  };
}
