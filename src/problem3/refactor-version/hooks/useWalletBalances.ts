import { useMemo, useState } from 'react';
import { getPriority } from '../libs/helper';
import type { FormattedWalletBalance, WalletBalance } from '../types/wallet';

export const useWalletBalances = () => {
  const [balances] = useState<WalletBalance[]>([
    { currency: 'BTC', amount: 10, blockchain: 'Bitcoin' },
    { currency: 'ETH', amount: 20, blockchain: 'Ethereum' },
    { currency: 'USDC', amount: 0, blockchain: 'Arbitrum' },
    { currency: 'XRP', amount: 0, blockchain: 'Ripple' },
  ]);

  const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
    return balances
      .reduce((acc: FormattedWalletBalance[], balance) => {
        const priority = getPriority(balance.blockchain);
        // 1. Filter: Priority check and non-positive balance
        if (priority > -99 && balance.amount <= 0) {
          // 2. Map: Transform into FormattedWalletBalance
          acc.push({
            ...balance,
            formatted: balance.amount.toFixed(),
          });
        }

        return acc;
      }, [])
      .sort((lhs, rhs) => {
        // 3. Sort: Descending by blockchain priority
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        return rightPriority - leftPriority;
      });
  }, [balances]);

  return {
    balances,
    formattedBalances,
  };
};
