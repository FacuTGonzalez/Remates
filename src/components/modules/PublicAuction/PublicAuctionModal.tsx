'use client'

import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from 'primereact/fileupload';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Auction, CreateAuctionConfig } from '@/models/auction.model';
import { Button } from 'primereact/button';
import { RInputText } from '@/components/elements/RInputText/RInputText';
import { getFormErrorMessage } from '@/utils/errorMessageResolvers';
import styles from './PublicAuctionModal.module.scss';

import { CREATE_AUCTION_FIELDS, createAuctionSchema } from './constants';


type PublicAuctionModalProps = {
    onHide(): void;
    visible: boolean;
    onAction(data: CreateAuctionConfig): void;
};

export const PublicAuctionModal = ({ onHide, visible, onAction }: PublicAuctionModalProps) => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isValid },
    } = useForm<CreateAuctionConfig>({
        resolver: joiResolver(createAuctionSchema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
            model: '',
            price: 0,
            endDate: '',
            image: '',
        },
    });

    const onSubmit = (data: CreateAuctionConfig) => {
        onAction(data);
        onHideInterceptor();
    };

    const onHideInterceptor = () => {
        reset();
        onHide();
    };

    const renderField = (name: keyof CreateAuctionConfig, label: string) => {
        if (name === 'price') {
            return (
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <span>
                            <label htmlFor={name}>
                                {label}
                            </label>
                            <InputNumber
                                inputId={name}
                                value={field.value as number}
                                onValueChange={(e) => field.onChange(e.target.value)}
                                mode="currency"
                                currency="ARS"
                                locale="es-AR"
                                className="w-full mt-2 h-2rem"
                            />
                            {getFormErrorMessage(name, errors) && (
                                <small className="p-error">
                                    {getFormErrorMessage(name, errors)}
                                </small>
                            )}
                        </span>
                    )}
                />
            );
        }

        if (name === 'endDate') {
            return (
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <span>
                            <label htmlFor={name}>
                                {label}
                            </label>
                            <Calendar
                                inputId={name}
                                value={field.value ? new Date(field.value) : null}
                                onChange={(e) => field.onChange(e.value)}
                                minDate={new Date()}
                                hourFormat="24"
                                className="w-full mt-2 h-2rem"
                                dateFormat="dd/mm/yy"
                                placeholder="Seleccionar fecha"
                            />
                            {getFormErrorMessage(name, errors) && (
                                <small className="p-error">
                                    {getFormErrorMessage(name, errors)}
                                </small>
                            )}
                        </span>
                    )}
                />
            );
        }

        if (name === 'image') {
            return (
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <div>
                            <span>
                                <span>
                                    {label}
                                </span>
                            </span>

                            <div className={styles.inputFile}>

                                <FileUpload
                                    name={name}
                                    accept="image/*"
                                    maxFileSize={1000000}
                                    customUpload
                                    onSelect={(e) => {
                                        const file = e.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (event) => {
                                                field.onChange(event.target?.result as string);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    onClear={() => field.onChange('')}
                                    chooseLabel="Seleccionar imagen"
                                    className="w-full mt-2"
                                    mode="basic"
                                />
                                {getFormErrorMessage(name, errors) && (
                                    <small className="p-error">
                                        {getFormErrorMessage(name, errors)}
                                    </small>
                                )}
                            </div>
                        </div>
                    )}
                />
            );
        }

        return (
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <RInputText
                        label={label}
                        id={name}
                        {...field}
                        value={field.value as string}
                        errorMessage={getFormErrorMessage(name, errors)}
                        className="my-2 h-2rem"
                    />
                )}
            />
        );
    };

    return (
        <Dialog
            showHeader={false}
            visible={visible}
            onHide={onHideInterceptor}
            className="border-round-lg"
        >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
                <p className="pb-4 font-bold text-xl">Publicar remate</p>
                <div>
                    {Object.values(CREATE_AUCTION_FIELDS).map(({ name, label }) => (
                        <div className="m-2" key={name}>
                            {renderField(name as keyof CreateAuctionConfig, label)}
                        </div>
                    ))}
                </div>
                <div className="flex justify-content-center my-4">
                    <Button className='p-1 w-10rem mr-2' label="Cancelar" icon="pi pi-gavel" onClick={onHideInterceptor} />
                    <Button
                        type="submit"
                        className="rounded p-2 w-10rem"
                        label="Publicar"
                        disabled={!isValid}
                    />
                </div>
            </form>
        </Dialog>
    );
};