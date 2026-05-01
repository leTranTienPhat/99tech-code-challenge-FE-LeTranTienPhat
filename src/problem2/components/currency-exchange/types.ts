export interface ICurrencyExchange {
  currencyFrom: string;
  currencyTo: string;
  amountFrom: number;
  amountTo: number;
  isFlip?: boolean | null;
}

export interface ICurrencyExchangeError {
  type: 'empty' | 'max';
  message: string;
}
