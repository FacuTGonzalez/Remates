'use client'
import React from 'react'
import styles from './Navbar.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { clearUserSession } from '@/utils/localStorage';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
    const router = useRouter();

    const onLogout = () => {
        clearUserSession();
        router.push('/login')
    }
    return (
        <div className={styles.container}>
                <Link href={'/home'}>
                    <Image src="/templates/logo.png" alt="Logo" width={64} height={64} />
                </Link>
                <p className='cursor-pointer hover:underline text-sm' onClick={onLogout}>Cerrar sesión</p>
        </div>
    )
}
