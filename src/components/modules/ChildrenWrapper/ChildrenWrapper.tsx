'use client'
import { User } from '@/models/user.model';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const ChildrenWrapper = ({ children }: { children: React.ReactNode }) => {
    //TODO: Descomentar una vez finalizado todo
    // const [user, setUser] = useState<string | null>(null);
    // const router = useRouter();
    // useEffect(() => {
    //     const session = localStorage.getItem('userSession');
    //     setUser(session);
    // }, []);

    // useEffect(() => {
    //     if (!user) {
    //         router.push('/login');
    //     }
    // }, [user, router]);
    
    return (
        <div>{children}</div>
    )
}
