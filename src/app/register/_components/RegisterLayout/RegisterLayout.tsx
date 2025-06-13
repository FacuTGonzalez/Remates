'use client'
import { RegisterForm } from '@/components/modules/forms/RegisterForm/RegisterForm';
import { RegisterUserConfig, UserRole } from '@/models/user.model';
import React from 'react';
import styles from './RegisterLayout.module.scss';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation'

type RegisterLayoutProps = {
    type: UserRole
}

export const RegisterLayout = ({ type }: RegisterLayoutProps) => {
    const onSubmit = (data: RegisterUserConfig) => {
        toast('Usuario registrado correctamente, revisa tu correo para completar el registro.', {
            type: 'success'
        });
        redirect('/login')
    };
    return (
        <div className={styles.container}>
            <div>
                <Image src="/templates/logo.png" alt="Logo" width={600} height={600} />
            </div>
            <RegisterForm type={type} onSubmit={onSubmit} />
        </div>
    )
}
