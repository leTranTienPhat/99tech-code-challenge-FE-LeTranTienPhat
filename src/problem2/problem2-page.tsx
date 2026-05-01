import CurrencyExchange from '@/problem2/components/currency-exchange/currency-exchange.tsx';
import { Wrapper } from '@/problem2/components/ui/wrapper';
import { CurrencyExchangeContext } from '@/problem2/context/config';
import { exRateFormula } from '@/problem2/libs/calculate-ex-rate';
import { cn } from '@/problem2/libs/utils';
import { useContext, type SubmitEventHandler } from 'react';

export const Problem2 = () => {
  const {
    userWallet,
    exchangeValues,
    exchangeRate,
    isLoading,
    handleSubmit,
    updateCurrency,
  } = useContext(CurrencyExchangeContext);
  const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const currentRate = exchangeRate
    ? exRateFormula({
        from: 1,
        rateFrom: exchangeRate?.[exchangeValues.currencyFrom],
        rateTo: exchangeRate?.[exchangeValues.currencyTo],
      })
    : null;

  return (
    <Wrapper className="mx-auto my-auto bg-gray-100 text-center">
      <h3 className="text-2xl font-bold">Crypto Exchange</h3>
      <form className="w-full" onSubmit={onSubmit}>
        <CurrencyExchange />
        {exchangeRate && (
          <p className="py-2">
            Current Rate: 1 {exchangeValues.currencyFrom} ={' '}
            {isNaN(currentRate ?? NaN) ? '...' : currentRate}{' '}
            {exchangeValues.currencyTo}
          </p>
        )}
        <div className="pb-4 text-start">
          <p className="pb-4 font-semibold">Your Mock Wallet #01</p>
          <div className="max-h-[200px] space-y-5 overflow-y-scroll pl-2">
            {Object.keys(userWallet).map((key) => {
              if (userWallet[key] === 0) {
                return null;
              }

              return (
                <button
                  type="button"
                  key={key}
                  className="flex gap-2"
                  onClick={() => updateCurrency(key, 'from')}
                >
                  <img
                    src={`src/assets/tokens/${key}.svg`}
                    className="h-6 w-6"
                    alt={key}
                  />
                  <p className="whitespace-nowrap">
                    {key}: {userWallet[key]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
        <button
          disabled={isLoading}
          className={cn('mx-auto rounded-md border bg-yellow-400 px-4 py-2', {
            'opacity-50': isLoading,
          })}
          type="submit"
        >
          {isLoading ? 'Exchanging...' : 'Exchange now'}
        </button>
      </form>
    </Wrapper>
  );
};

export default Problem2;
