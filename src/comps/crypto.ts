import { createHash, Hash } from "crypto";

const createHasher = (): Hash => createHash("sha256");

export const hash = (raw: string): string => createHasher().update(raw).digest("hex");
