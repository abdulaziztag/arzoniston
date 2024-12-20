'use client';

import { Heading, Icon, IconButton } from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import './styles.scss';
import { LangChanger } from '@/app/components/LangChanger';
import { AiOutlinePlus } from 'react-icons/ai';

export const AppHeader = () => {
  return (
    <header className="app-header--container">
      <div className="app-header relative">
        <LangChanger />
        <Heading
          as="h1"
          className="absolute left-1/2 -translate-x-1/2 transform cursor-pointer"
          fontSize="2xl"
          onClick={() => redirect('/')}
        >
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
