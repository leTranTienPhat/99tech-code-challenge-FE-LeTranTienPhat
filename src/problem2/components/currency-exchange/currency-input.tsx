import { Input } from '@/problem2/components/ui/input.tsx';
import { Wrapper } from '@/problem2/components/ui/wrapper.tsx';
import { AlertCircle, Wallet } from 'lucide-react';
import { useContext } from 'react';
import { CustomSelect } from '../custom/custom-select.tsx';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/problem2/components/ui/tooltip';
import { CurrencyExchangeContext } from '@/problem2/context/config.ts';

interface Props {
  direction?: 'from' | 'to';
  name?: string;
}

export const CurrencyInput = ({ direction = 'from', name }: Props) => {
  const {
    userWallet,
    items,
    exchangeValues,
    updateCurrency,
    handleSelectMax,
    handleExchangeRateChange,
  } = useContext(CurrencyExchangeContext);

  const isConvertFrom = direction === 'from';

  const walletAmount = (() => {
    if (isConvertFrom) {
      return userWallet[exchangeValues.currencyFrom];
    }
    return userWallet[exchangeValues.currencyTo];
  })();

  return (
    <Wrapper className="w-72 space-y-1 bg-white p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CustomSelect
            defaultValue="USD"
            items={items}
            placeholder=""
            classNames={{
              trigger: 'min-w-32',
            }}
            value={
              isConvertFrom
                ? exchangeValues.currencyFrom
                : exchangeValues.currencyTo
            }
            onValueChange={(value) =>
              updateCurrency(value, isConvertFrom ? 'from' : 'to')
            }
          />
          {walletAmount > 0 && (
            <p className="flex items-center gap-1 text-xs text-gray-500">
              <Wallet size={12} />
              {walletAmount.toFixed(6)}

              <Tooltip>
                <TooltipTrigger type="button">
                  <AlertCircle size={10} />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-center text-xs">
                    <p>Your balance: {walletAmount.toFixed(12)}</p>
                    <p className="text-[10px] text-gray-400">
                      (Mock value for all currency)
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </p>
          )}
        </div>

        {isConvertFrom && (
          <button
            type="button"
            className="text-xs text-yellow-400"
            onClick={handleSelectMax}
          >
            Max
          </button>
        )}
      </div>
      <Input
        name={name}
        hideFocus
        className="border-none text-xl!"
        type="number"
        placeholder="0"
        value={
          isConvertFrom
            ? exchangeValues.amountFrom?.toString() || ''
            : exchangeValues.amountTo?.toString() || ''
        }
        onChange={(e) => {
          handleExchangeRateChange(
            Number(e.target.value),
            isConvertFrom ? 'from' : 'to'
          );
        }}
      />
    </Wrapper>
  );
};
