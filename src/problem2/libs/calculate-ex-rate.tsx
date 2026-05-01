export const exRateFormula = ({
  from,
  rateFrom,
  rateTo,
}: {
  from: number;
  rateFrom: number;
  rateTo: number;
}) => {
  return parseFloat(((from * rateFrom) / rateTo).toFixed(6));
};

export const calculateExchangeRate = (
  newValue: number,
  inputPosition: 'from' | 'to',
  currencyFrom: string,
  currencyTo: string,
  exchangeRate?: Record<string, number>
): { amountFrom: number; amountTo: number } | null => {
  const rateFrom = exchangeRate?.[currencyFrom];
  const rateTo = exchangeRate?.[currencyTo];

  if (!rateFrom || !rateTo) return null;

  if (inputPosition === 'from') {
    return {
      amountFrom: newValue,
      amountTo: exRateFormula({
        from: newValue,
        rateFrom: rateFrom,
        rateTo: rateTo,
      }),
    };
  }

  return {
    amountFrom: exRateFormula({
      from: newValue,
      rateFrom: rateTo,
      rateTo: rateFrom,
    }),
    amountTo: newValue,
  };
};
