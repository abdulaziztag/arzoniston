import { createListCollection } from '@ark-ui/react'; // Replace with actual utility import
import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectValueText,
  SelectItem,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';

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
  translate?: boolean;
  value?: string[];
  size?: 'sm' | 'md' | 'lg';
  multiple?: boolean;
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
  translate = false,
  value,
  multiple,
  size,
}: CustomSelectProps<T>) {
  const t = useTranslations();
  const collection = createListCollection({ items: options });

  return (
    <SelectRoot
      size={size}
      multiple={multiple}
      variant={variant}
      value={value}
      disabled={disabled}
      className={`flex w-1/2 flex-row ${className}`}
      collection={collection}
      onValueChange={(value) => {
        void onChange(filterKey, value.value[0]);
      }}
    >
      <SelectTrigger width={width} className="w-full" clearable={clearable}>
        <SelectValueText
          translatable={translate}
          placeholder={translate ? t(placeholder) : placeholder}
        />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem item={item} key={item.value as string}>
            {translate ? t(item.label) : item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
