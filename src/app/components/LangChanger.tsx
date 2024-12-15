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

export const LangChanger = () => {
  const t = useTranslations();
  const routing = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <SelectRoot defaultValue={[locale]} className="flex w-fit flex-row" collection={languages}>
      <SelectTrigger className="w-40">
        <SelectValueText placeholder={t('selectLanguage')} />
      </SelectTrigger>
      <SelectContent>
        {languages.items.map((movie) => (
          <SelectItem
            item={movie}
            key={movie.value}
            onClick={() => routing.replace({ pathname }, { locale: movie.value })}
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
    { label: 'English', value: 'en' },
    { label: 'Русский', value: 'ru' },
    { label: 'O`zbekcha', value: 'uz' },
    { label: 'Ўзбекча', value: 'uz-cyrl' },
  ],
});
