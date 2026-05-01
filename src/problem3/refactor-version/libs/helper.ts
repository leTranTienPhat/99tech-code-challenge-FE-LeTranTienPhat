import type { BlockChain } from '../types/wallet';

const DEFAULT_PRIORITY = -99;

const PRIORITIES: Partial<Record<BlockChain, number>> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

export const getPriority = (blockchain: BlockChain): number =>
  PRIORITIES[blockchain] ?? DEFAULT_PRIORITY;
