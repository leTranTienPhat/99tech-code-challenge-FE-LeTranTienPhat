import { WalletRow } from './components/wallet-row';
import { usePrices } from './hooks/usePrices';
import { useWalletBalances } from './hooks/useWalletBalances';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const WalletPage = ({ children, ...rest }: Props) => {
  const { formattedBalances } = useWalletBalances();
  const prices = usePrices();

  return (
    <div {...rest}>
      {formattedBalances.map(({ currency, amount, formatted }) => {
        const usdValue = prices[currency] * amount;
        return (
          <WalletRow
            key={currency}
            amount={amount}
            usdValue={usdValue}
            formattedAmount={formatted}
          />
        );
      })}
      {children}
    </div>
  );
};
