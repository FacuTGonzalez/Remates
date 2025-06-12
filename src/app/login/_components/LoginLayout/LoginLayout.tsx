'use client'
import { LoginForm } from '@/components/modules/forms/LoginForm/LoginForm'
import React from 'react'
import styles from './LoginLayout.module.scss';
import Image from 'next/image';

export const LoginLayout = () => {
  return (
    <div className={styles.container}>
      <div>
        <div className='flex align-items-center'>
          <p className={styles.leftTitle}>Bienvenido a T</p>
          <p className={styles.rightTitle}>u Clásico Remates</p>
        </div>
        <Image src="/templates/logo.png" alt="Logo" width={600} height={600} />
      </div>
      <LoginForm />
    </div>
  )
}
