import type {
  ICurrencyExchange,
  ICurrencyExchangeError,
} from '@/problem2/components/currency-exchange/types';
import type { UserWallet } from '@/problem2/types/currency';
import type { ISelectOption } from '@/problem2/types/select';
import { createContext } from 'react';

interface ICurrencyExchangeContext {
  userWallet: UserWallet;
  items: ISelectOption[];
  exchangeValues: ICurrencyExchange;
  handleExchangeRateChange: (
    newValue: number,
    inputPosition: 'from' | 'to'
  ) => void;
  error?: ICurrencyExchangeError;
  isLoading?: boolean;
  exchangeRate?: Record<string, number>;
  updateValue: (value: Partial<ICurrencyExchange>) => void;
  updateCurrency: (currency: string, position: 'from' | 'to') => void;
  handleFlipData: () => void;
  handleSelectMax: () => void;
  handleSubmit: () => void;
}

export const defaultCurrencyExchangeValue: ICurrencyExchangeContext = {
  userWallet: {},
  items: [],
  exchangeValues: {
    currencyFrom: '',
    currencyTo: '',
    amountFrom: 0,
    amountTo: 0,
    isFlip: null,
  },
  exchangeRate: {},
  updateValue: () => {},
  handleExchangeRateChange: () => {},
  updateCurrency: () => {},
  handleFlipData: () => {},
  handleSelectMax: () => {},
  handleSubmit: () => {},
};

export const CurrencyExchangeContext = createContext<ICurrencyExchangeContext>(
  defaultCurrencyExchangeValue
);
