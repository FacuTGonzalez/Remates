'use client'
import { LoginFormConfig } from '@/models/user.model'
import { joiResolver } from '@hookform/resolvers/joi'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { LOGIN_FIELDS, loginSchema } from './constants'
import { InputText } from 'primereact/inputtext'
import { getFormErrorMessage } from '@/utils/errorMessageResolvers'
import { Button } from 'primereact/button'
import styles from './LoginForm.module.scss';
import { saveUserSession } from '@/utils/localStorage'
import { useRouter } from 'next/navigation'
import mocks from '@/utils/mocks/users.json'
import { useToast } from '@/context/toast'
import { toast } from 'react-toastify'


export const LoginForm = () => {
    const router = useRouter();
    const { handleSubmit, formState: { errors, isValid }, control, setValue } = useForm<LoginFormConfig>({
        resolver: joiResolver(loginSchema),
        mode: 'all',
        defaultValues: {
            username: '',
            password: '',
        },
    });

    useEffect(() => {
        setValue('username', '')
        setValue('password', '')
    }, []);

    const onSubmit = (data: LoginFormConfig) => {
        const { username, password } = data;

        const user = mocks.users.find(u => u.username === username);

        if (!user) {
            toast('Correo electrónico o contraseña incorrecta', {
                type: 'error'
            });
            return;
        }
        if (user.password !== password) {
            toast('Correo electrónico o contraseña incorrecta', {
                type: 'error'
            });
            return;
        }

        saveUserSession(user.username);
        router.push("/home");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <p className='pt-4 font-bold text-xl'>Iniciar sesión</p>
            <div className='mb-2 mt-4'>
                <div className="my-3">
                    <Controller name={LOGIN_FIELDS.USERNAME_FIELD.name as keyof LoginFormConfig} control={control} render={({ field }) => <div className="flex flex-column gap-2">
                        <div className='flex flex-column'>
                            <label htmlFor="username">{LOGIN_FIELDS.USERNAME_FIELD.label}</label>
                            <InputText className='my-2 h-2rem' id={LOGIN_FIELDS.USERNAME_FIELD.name} aria-describedby="username-help" {...field} />
                            <small className='error-message' id="username-help">
                                {getFormErrorMessage(LOGIN_FIELDS.USERNAME_FIELD.name, errors)}
                            </small>
                        </div>

                    </div>} />
                </div>

                <div className="my-3">
                    <Controller name={LOGIN_FIELDS.PASSWORD_FIELD.name as keyof LoginFormConfig} control={control} render={({ field }) => <div className="flex flex-column gap-2">
                        <div className='flex flex-column'>
                            <label htmlFor="password">{LOGIN_FIELDS.PASSWORD_FIELD.label}</label>
                            <InputText className='my-2 h-2rem' id={LOGIN_FIELDS.PASSWORD_FIELD.name} aria-describedby="password-help" {...field} />
                            <small id="username-help">
                                {getFormErrorMessage(LOGIN_FIELDS.PASSWORD_FIELD.name, errors)}
                            </small>
                        </div>

                    </div>} />
                </div>
            </div>

            <div className='flex justify-content-center my-3'>
                <Button
                    type="submit"
                    className="rounded p-2 w-8rem"
                    label=' Iniciar sesión'
                    disabled={!isValid}
                />
            </div>
            <div className="flex gap-2 justify-content-center align-items-center">
                <p className="text-sm">¿No tenés usuario?</p>
                <a href="/register" className="text-sm text-primary-color hover:underline">Registrate</a>
            </div>
        </form>
    );
}
