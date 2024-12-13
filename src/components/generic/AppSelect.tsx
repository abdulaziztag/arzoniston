import React, { ChangeEvent } from 'react';
import { createListCollection } from '@ark-ui/react'; // Replace with actual utility import
import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectValueText,
  SelectItem,
} from '@/components/ui/select';

interface CustomSelectProps<T> {
  options: { label: string; value: T }[];
  placeholder: string;
  onChange: (key: string, value: string) => void;
  valueKey?: keyof T;
  labelKey?: keyof T;
  filterKey: string;
  disabled?: boolean;
  variant?: 'outline' | 'subtle';
  className?: string;
  clearable?: boolean;
  width?: number;
}

export function AppSelect<T>({
  options,
  placeholder,
  onChange,
  filterKey,
  disabled,
  className,
  variant = 'outline',
  width,
  clearable,
}: CustomSelectProps<T>) {
  const collection = createListCollection({ items: options });

  return (
    <SelectRoot
      variant={variant}
      disabled={disabled}
      className={`flex w-1/2 flex-row ${className}`}
      collection={collection}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        void onChange(filterKey, event.target.value);
      }}
    >
      <SelectTrigger width={width} className="mr-1 w-full" clearable={clearable}>
        <SelectValueText placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem item={item} key={item.value as string}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
