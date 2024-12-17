'use client';

import { Heading, Icon, IconButton } from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import './styles.scss';
import { LangChanger } from '@/app/components/LangChanger';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { AiOutlinePlus } from 'react-icons/ai';

export const AppHeader = () => {
  const t = useTranslations();
  return (
    <header className="app-header--container">
      <div className="app-header">
        <LangChanger />
        <Heading as="h1" className="cursor-pointer" fontSize="2xl" onClick={() => redirect('/')}>
          Arzoniston
        </Heading>
        <IconButton rounded="full" onClick={() => (window.location.href = 'https://t.me/manopov')}>
          <Icon>
            <AiOutlinePlus />
          </Icon>
        </IconButton>
      </div>
    </header>
  );
};
