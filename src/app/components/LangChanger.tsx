'use client';

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { createListCollection } from '@ark-ui/react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useQueryClient } from '@tanstack/react-query';

export const LangChanger = () => {
  const t = useTranslations();
  const routing = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const queryClient = useQueryClient();

  return (
    <SelectRoot defaultValue={[locale]} className="flex w-fit flex-row" collection={languages}>
      <SelectTrigger className="w-16">
        <SelectValueText placeholder={t('selectLanguage')} />
      </SelectTrigger>
      <SelectContent>
        {languages.items.map((movie) => (
          <SelectItem
            item={movie}
            key={movie.value}
            onClick={() => {
              routing.replace({ pathname }, { locale: movie.value });
              void queryClient.invalidateQueries();
            }}
          >
            {movie.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

const languages = createListCollection({
  items: [
    { label: 'En', value: 'en' },
    { label: 'Ру', value: 'ru' },
    { label: 'O`z', value: 'uz' },
    { label: 'Ўз', value: 'uz-cyrl' },
  ],
});
