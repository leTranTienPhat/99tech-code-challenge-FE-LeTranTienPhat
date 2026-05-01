export type Currency = 'BTC' | 'ETH' | 'USDC' | 'XRP';

export type BlockChain =
  | 'Osmosis'
  | 'Ethereum'
  | 'Arbitrum'
  | 'Zilliqa'
  | 'Neo'
  | 'Bitcoin'
  | 'Ripple';

// Assumption: WalletBalance has "blockchain" property, based on how the value was used in the main component
export interface WalletBalance {
  currency: Currency;
  blockchain: BlockChain;
  amount: number;
}

export interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
