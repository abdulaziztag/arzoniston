'use client';

import {Heading} from "@chakra-ui/react";
import {redirect} from "next/navigation";
import './styles.scss'
import {LangChanger} from "@/app/components/LangChanger";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";

export const AppHeader = () => {
  const t = useTranslations();
  return (
    <header className="app-header--container">
      <div className="app-header">
        <Heading
          as="h1"
          className="cursor-pointer"
          fontSize="2xl"
          onClick={() => redirect("/")}
        >
          Arzoniston
        </Heading>
        <div className="grow" />
        <Button onClick={() => window.location.href = 'https://t.me/manopov'}>
          {t('postAd')}
        </Button>
        <LangChanger />
      </div>
    </header>
  )
}