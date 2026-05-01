import type { Currency } from '../types/wallet';

// This is a mock custom hooks based on how the data was used in the main component
export const usePrices = () => {
  const mockPrices: Record<Currency, number> = {
    BTC: 1000,
    ETH: 100,
    USDC: 1,
    XRP: 1,
  };

  return mockPrices;
};
