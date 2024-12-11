'use client';

import {Heading} from "@chakra-ui/react";
import {redirect} from "next/navigation";
import './styles.scss'
import {LangChanger} from "@/app/components/LangChanger";

export const AppHeader = () => {
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
        <LangChanger />
      </div>
    </header>
  )
}