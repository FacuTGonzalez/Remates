'use client'
import { LoginForm } from '@/components/modules/forms/LoginForm/LoginForm'
import React from 'react'
import styles from './LoginLayout.module.scss';
import Image from 'next/image';

export const LoginLayout = () => {
  return (
    <div className={styles.container}>
      <Image src="/templates/logo.png" alt="Logo" width={600} height={600} />
        <LoginForm/>
    </div>
  )
}
