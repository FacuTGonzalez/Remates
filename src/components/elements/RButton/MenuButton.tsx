import React from 'react'
import { Button } from 'primereact/button'
import { useRouter } from 'next/navigation';
import styles from './MenuButton.module.scss';

interface MenuButtonProps {
    label: string;
    path?: string;
    onClick?(): void;
    fullWidth?: boolean;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ label, path, onClick, fullWidth }) => {
    const router = useRouter();

    const _onClick = () => {
        if(onClick) onClick();
        if(path) router.push(path);
        return
    };

    return (
        <Button
            className={`${fullWidth ? 'w-full' : ''} ${styles.container}`}
            label={label}
            onClick={_onClick}
        />
    )
}
