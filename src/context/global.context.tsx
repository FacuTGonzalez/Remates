'use client'

import { Context, createContext, useContext } from "react"
import es from '../../public/locales/es/common.json';

type TypeContext = {
    t:any
}

const GlobalContext : Context<TypeContext>= createContext({t:es});

type ToastProviderProps = {
    children: React.ReactNode;
  };

export const GlobalProvider  = ({ children }: ToastProviderProps) => {
    const t =  es;
    return (
        <GlobalContext.Provider value={{t}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = ()=> useContext(GlobalContext)