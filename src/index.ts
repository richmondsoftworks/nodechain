import * as readline from "readline";

import { Blockchain } from "./comps/blockchain";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const question = (query: string) => {
  return new Promise<string>((res) => {
    rl.question(query, (answer) => {
      res(answer);
    });
  });
};

const printChainStats = (chain: Blockchain) => {
  console.log("chain", JSON.stringify(chain, null, 2));
  console.log();
  console.log("validation:", chain.validate());
  console.log();
};

console.log("starting the blockchain");
console.log();

const chain = new Blockchain();

chain.addGenesisBlock();

const run = async () => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    printChainStats(chain);

    const answer = await question("press (m) for mine, (n) for new transaction, and (q) for quit...\n");

    if (answer === "q") {
      process.exit();
    }

    switch (answer) {
      case "m": {
        const miner = await question("miner? ");

        chain.minePendingTransactions(miner);

        break;
      }

      case "n": {
        const from = await question("from? ");
        const to = await question("to? ");
        const amount = +(await question("amount? "));

        chain.addTransaction(from, to, amount);

        break;
      }
    }
  }
};

run();
