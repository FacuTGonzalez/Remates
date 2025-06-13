import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getRegisterSchema, REGISTER_FIELDS } from './constants';
import { Button } from 'primereact/button';
import { getFormErrorMessage } from '@/utils/errorMessageResolvers';
import styles from './RegisterForm.module.scss';
import { RegisterUserConfig, UserRole } from '@/models/user.model';
import { RInputText } from '@/components/elements/RInputText/RInputText';

type RegisterFormProps = {
    type: UserRole;
    onSubmit(data: RegisterUserConfig): void;
};

export const RegisterForm = ({ type, onSubmit }: RegisterFormProps) => {
    const getDefaultValues = () => {
        const defaults: RegisterUserConfig = {
            username: '',
            name: '',
            lastName: '',
            'cuit-cuil': '',
            location: '',
        };

        if (type === UserRole.BANK || type === UserRole.JUDICIAL_ENTITY) {
            defaults.entityName = '';
        }

        return defaults;
    };

    const { handleSubmit, control, formState: { errors, isValid } } = useForm<RegisterUserConfig>({
        resolver: joiResolver(getRegisterSchema(type)),
        mode: 'onChange',
        defaultValues: getDefaultValues()
    });

    const resolveTitle = () => {
        switch (type) {
            case UserRole.NATURAL_PERSON:
                return 'Registra tu cuenta'
            case UserRole.BANK:
                return 'Regístrate tu banco'
            case UserRole.JUDICIAL_ENTITY:
                return 'Regístrate tu ente judicial'
            default:
                return 'Regístrate'
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <p className='pb-4 font-bold text-xl'>{resolveTitle()}</p>
            <div className={styles.fields}>
                {Object.values(REGISTER_FIELDS)
                    .filter(({ name }) => {
                        if (name === 'entityName') {
                            return type === UserRole.BANK || type === UserRole.JUDICIAL_ENTITY;
                        }
                        return true;
                    })
                    .map(({ name, label }) => (
                        <div className="m-2" key={name}>
                            <Controller
                                name={name as keyof RegisterUserConfig}
                                control={control}
                                render={({ field }) => (
                                    <RInputText
                                        label={label}
                                        maxLength={name === 'cuit-cuil' ? 11 : undefined}
                                        errorMessage={getFormErrorMessage(name, errors)}
                                        id={name}
                                        {...field}
                                        className="my-2 h-2rem"
                                    />
                                )}
                            />
                        </div>
                    ))}
            </div>

            <div className="flex justify-content-center my-4">
                <Button
                    type="submit"
                    className="rounded p-2 w-10rem"
                    label="Registrarme"
                    disabled={!isValid}
                />
            </div>

            <div className="flex gap-2 justify-content-center align-items-center">
                <p className="text-sm">¿Ya tenés usuario?</p>
                <a href="/login" className="text-sm text-primary-color hover:underline">Iniciá sesión</a>
            </div>
        </form>
    );
};
