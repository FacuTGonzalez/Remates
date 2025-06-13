import { InputText } from 'primereact/inputtext';
import React from 'react'

type RInputTextProps = {
    label: string;
    value: string | undefined;
    onChange(e: any): void;
    className: string;
    errorMessage?: string;
    id: string;
    name: string;
    maxLength?: number
};

export const RInputText = ({ id, label, value, onChange, className, errorMessage, name, maxLength }: RInputTextProps) => {
    return (
        <div className='flex flex-column'>
            <label htmlFor="username">{label}</label>
            <InputText maxLength={maxLength} name={name} className={className} id={id} aria-describedby="username-help" value={value} onChange={onChange} />
            {errorMessage && <small className='error-message' id="username-help">
                {errorMessage}
            </small>}
        </div>
    )
}
