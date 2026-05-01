interface Props {
  className?: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

// Note: This component is only created to demonstrate module architecture,
// its UI arrangement is only mock assumption based on received props
export const WalletRow = ({
  className,
  amount,
  usdValue,
  formattedAmount,
}: Props) => {
  return (
    <div className={className}>
      <p>
        {formattedAmount} - {amount} - ${usdValue}
      </p>
    </div>
  );
};
