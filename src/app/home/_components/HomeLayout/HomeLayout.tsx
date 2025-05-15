'use client'
import React from 'react'
import styles from './HomeLayout.module.scss';
import { getUserSession } from '@/utils/localStorage';
import { menuActionsModules } from '@/utils/helpers/homeHelper';
import { MenuButton } from '@/components/elements/RButton/RButton';

export const HomeLayout = () => {
    const user = getUserSession();

    return (
        <div className={styles.container}>
            <div className={styles.leftSection}>
                <div className='m-auto'>
                    {
                        menuActionsModules.map((action, i) => <MenuButton key={i} label={action.label} path={action.route} />)
                    }
                </div>
                <div className='mx-4'>
                    <MenuButton fullWidth label={'Publicar remate'} />
                </div>
            </div>
        </div>
    )
}
