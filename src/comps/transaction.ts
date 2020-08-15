import { hash } from "./crypto";

export class Transaction {
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  hash: string;
  signature: string;

  constructor(from: string, to: string, amount: number) {
    this.from = from;
    this.to = to;
    this.amount = amount;
  }

  calculateHash = (): string => {
    return hash(this.from + this.to + this.amount + this.timestamp);
  };

  stampAndHash = (): Transaction => {
    this.timestamp = new Date().valueOf();
    this.hash = this.calculateHash();

    return this;
  };

  validate = (): string => {
    if (!this.from) {
      return "tx: fromAddress is required";
    }

    if (!this.to) {
      return "tx: toAddress is required";
    }

    if (this.amount < 0) {
      return "tx: amount is required";
    }

    const hash = this.calculateHash();

    if (this.hash !== hash) {
      return `tx: hash calculation mismatch: [${this.hash}, ${hash}]`;
    }
  };
}
