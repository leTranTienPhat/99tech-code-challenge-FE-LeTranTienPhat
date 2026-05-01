import type { ISelectOption } from '@/problem2/types/select';
import { useState } from 'react';

export const CurrencyIcon = ({ item }: { item: ISelectOption }) => {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (itemValue: string) => {
    setImageErrors((prev) => new Set(prev).add(itemValue));
  };

  if (!item.icon || imageErrors.has(item.value)) {
    return (
      <div className="flex size-6 items-center justify-center rounded-full bg-gray-200">
        <span className="text-xs font-medium text-gray-600">
          {item.label?.slice(0, 2).toUpperCase() || '??'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={item.icon}
      alt={item.label}
      className="size-6 rounded-full"
      onError={() => handleImageError(item.value)}
    />
  );
};
