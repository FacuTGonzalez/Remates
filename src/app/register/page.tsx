import React from 'react'
import { RegisterLayout } from './_components/RegisterLayout/RegisterLayout';
import { UserRole } from '@/models/user.model';

const RegisterPage = ({ searchParams }: { searchParams: { type?: string } }) => {
    const type = searchParams.type as UserRole;

    return (
        <RegisterLayout type={type} />
    );
};

export default RegisterPage;
