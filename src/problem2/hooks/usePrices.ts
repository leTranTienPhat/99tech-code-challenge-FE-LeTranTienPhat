import { useGetPrices } from '@/problem2/hooks/swr/useGetPrices.ts';
import type { ISelectOption } from '@/problem2/types/select.ts';
import { useMemo } from 'react';

export const usePrices = () => {
  const { data } = useGetPrices();

  const items: ISelectOption[] | undefined = useMemo(() => {
    if (!data) return;

    const uniqueCurrencies = new Set();
    return data.reduce((acc: ISelectOption[], item) => {
      if (item.price && !uniqueCurrencies.has(item.currency)) {
        uniqueCurrencies.add(item.currency);
        acc.push({
          label: item.currency,
          value: item.currency,
          icon: 'src/assets/tokens/' + item.currency + '.svg',
        });
      }
      return acc;
    }, []);
  }, [data]);

  return {
    items,
    data,
  };
};
