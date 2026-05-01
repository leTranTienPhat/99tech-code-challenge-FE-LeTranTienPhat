import { fetcher } from '@/problem2/libs/fetcher';
import type { Prices } from '@/problem2/types/currency';
import useSWR from 'swr';

export const useGetPrices = () => {
  return useSWR<Prices[]>(
    'https://interview.switcheo.com/prices.json',
    fetcher
  );
};
