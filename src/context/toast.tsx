'use client'

import 'react-toastify/dist/ReactToastify.css';

import React, { createContext, useContext } from 'react';
import { toast, ToastContainer, TypeOptions } from 'react-toastify';

const ToastContext = createContext({});

type ToastProviderProps = {
  children: React.ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const _toast = (title: string, type: TypeOptions) => {
    toast(title, {
      type: type,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <ToastContext.Provider value={{ _toast }}>
      <ToastContainer
        closeOnClick
        draggable
        pauseOnFocusLoss
        pauseOnHover
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        position='top-right'
        rtl={false}
        theme='light'
      />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): any => useContext(ToastContext);
