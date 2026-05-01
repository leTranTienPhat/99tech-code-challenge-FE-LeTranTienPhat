import type { ICurrencyExchange } from '@/problem2/components/currency-exchange/types';
import { useGetPrices } from '@/problem2/hooks/swr/useGetPrices';
import { useMemo, useState } from 'react';
import { CurrencyExchangeContext } from './config';

import { calculateExchangeRate } from '@/problem2/libs/calculate-ex-rate';
import { errorToast, successToast } from '@/problem2/libs/toast';
import { sleep } from '@/problem2/libs/utils';
import type { ISelectOption } from '@/problem2/types/select.ts';

const DEFAULT_CURRENCY = 'USD';
const MOCK_USER_WALLET: Record<string, number> = {
  USD: 388.12,
  LUNA: 2230,
  ETH: 530.44,
};

const CurrencyExchangeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data } = useGetPrices();

  const [userWallet, setUserWallet] =
    useState<Record<string, number>>(MOCK_USER_WALLET);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [exchangeValues, setExchangeValues] = useState<ICurrencyExchange>({
    currencyFrom: DEFAULT_CURRENCY,
    currencyTo: DEFAULT_CURRENCY,
    amountFrom: 0,
    amountTo: 0,
    isFlip: null,
  });

  const convertedData:
    | {
        items: ISelectOption[];
        exchangeRate: Record<string, number>;
      }
    | undefined = useMemo(() => {
    if (!data) return;

    const uniqueCurrencies = new Set();
    const exchangeRate: Record<string, number> = {};

    const convertedItems = data.reduce((acc: ISelectOption[], item) => {
      if (item.price && !uniqueCurrencies.has(item.currency)) {
        uniqueCurrencies.add(item.currency);
        acc.push({
          label: item.currency,
          value: item.currency,
          icon: 'tokens/' + item.currency + '.svg',
        });
        exchangeRate[item.currency] = item.price;
      }

      return acc;
    }, []);

    return {
      items: convertedItems,
      exchangeRate,
    };
  }, [data]);

  const updateCurrency = (currency: string, position: 'from' | 'to') => {
    if (position === 'from') {
      updateValue({
        currencyFrom: currency,
        amountFrom: 0,
        amountTo: 0,
      });
    } else {
      const newData = calculateExchangeRate(
        exchangeValues.amountFrom,
        'from',
        exchangeValues.currencyFrom,
        currency,
        convertedData?.exchangeRate
      );

      updateValue({
        ...newData,
        currencyTo: currency,
      });
    }
  };

  const updateValue = (value: Partial<ICurrencyExchange>) => {
    setExchangeValues((prev) => ({
      ...prev,
      ...value,
    }));
  };

  const handleFlipData = () => {
    const { currencyFrom, currencyTo, amountFrom, amountTo, isFlip } =
      exchangeValues;
    updateValue({
      currencyFrom: currencyTo,
      currencyTo: currencyFrom,
      amountFrom: amountTo,
      amountTo: amountFrom,
      isFlip: !isFlip,
    });
  };

  const handleExchangeRateChange = (
    newValue: number,
    inputPosition: 'from' | 'to'
  ) => {
    if (!convertedData) return;

    const result = calculateExchangeRate(
      newValue,
      inputPosition,
      exchangeValues.currencyFrom,
      exchangeValues.currencyTo,
      convertedData.exchangeRate
    );

    if (!result) return;

    updateValue(result);
  };

  const handleSelectMax = () => {
    handleExchangeRateChange(userWallet[exchangeValues.currencyFrom], 'from');
  };

  const handleSubmit = async () => {
    const { amountFrom, amountTo, currencyFrom, currencyTo } = exchangeValues;

    setIsLoading(true);

    await sleep(600);

    setIsLoading(false);
    if (!amountFrom || !amountTo) {
      errorToast('Please enter a valid amount');

      return;
    }

    if (amountFrom > (userWallet[currencyFrom] ?? 0)) {
      errorToast('Your balance is not enough to do the exchange');

      return;
    }

    if (currencyFrom === currencyTo) {
      errorToast('Please select different currencies');

      return;
    }

    setUserWallet((prev) => {
      return {
        ...prev,
        [currencyFrom]: prev[currencyFrom] - amountFrom,
        [currencyTo]: (prev[currencyTo] ?? 0) + amountTo,
      };
    });

    successToast(
      `Exchange sucessfully: \n ${amountFrom} ${currencyFrom} -> ${amountTo} ${currencyTo}`
    );
  };

  const contextValue = {
    userWallet,
    isLoading,
    items: convertedData?.items || [],
    exchangeValues,
    exchangeRate: convertedData?.exchangeRate || {},
    updateCurrency,
    updateValue,
    handleExchangeRateChange,
    handleFlipData,
    handleSelectMax,
    handleSubmit,
  };

  return (
    <CurrencyExchangeContext.Provider value={contextValue}>
      {children}
    </CurrencyExchangeContext.Provider>
  );
};

export default CurrencyExchangeProvider;
