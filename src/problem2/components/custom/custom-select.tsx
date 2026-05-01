import { cn } from '@/problem2/libs/utils';
import type { ISelectOption } from '@/problem2/types/select';
import type { ComponentProps } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { CurrencyIcon } from './currency-icon';

interface Props extends ComponentProps<typeof Select> {
  items?: ISelectOption[];
  placeholder?: string;
  classNames?: {
    trigger?: string;
    content?: string;
    item?: string;
  };
}

export const CustomSelect = ({
  items,
  placeholder = 'Select...',
  classNames,
  ...rest
}: Props) => {
  return (
    <Select {...rest}>
      <SelectTrigger className={cn('min-w-45 bg-white', classNames?.trigger)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        className={cn('max-h-60', classNames?.content)}
      >
        <SelectGroup>
          {items?.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className={cn('py-2', classNames?.item)}
            >
              {item.icon && <CurrencyIcon item={item} />}
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
