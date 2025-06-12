import React from 'react'
import styles from './Navbar.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <div className={styles.container}>
                <Link href={'/home'}>
                    <Image src="/templates/logo.png" alt="Logo" width={64} height={64} />
                </Link>
                <p className='cursor-pointer hover:underline text-sm'>Cerrar sesión</p>
        </div>
    )
}
