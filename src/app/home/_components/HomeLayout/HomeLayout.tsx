'use client'
import React, { useEffect, useState } from 'react'
import styles from './HomeLayout.module.scss';
import { menuActionsModules } from '@/utils/helpers/homeHelper';
import { MenuButton } from '@/components/elements/RButton/MenuButton';
import { getUserByUsername } from '@/utils/helpers/getUser';
import { auctions } from '@/utils/mocks/auctions.json'
import { AuctionCard } from '@/components/modules/AuctionCard/AuctionCard';
import { Auction } from '@/models/auction.model';
import { User } from '@/models/user.model';
import { AuctionBidModal } from '@/components/modules/AuctionPushModal/AuctionBidModal';

export const HomeLayout = () => {
    const [user, setUser] = useState<string | null>(null);
    const [userData, setUserData] = useState<User | null>(null);
    const [openBidModal, setOpenBidModal] = useState<boolean>(false);
    const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);

    useEffect(() => {
        const session = localStorage.getItem('userSession');
        setUser(session);
        const data = JSON.parse(session as string);
        setUserData(getUserByUsername(data?.user) as User);
    }, []);

    if (!user) return null;

    const onSelect = (auction: Auction) => {
        setSelectedAuction(auction);
        setOpenBidModal(true);
    }

    const onHide = () => {
        setOpenBidModal(false);
        setSelectedAuction(null);
    };

    const onNewBid = () => {
        console.log('NUeva oferta')
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftSection}>
                <div className={styles.userCard}>
                    <h2 className={styles.name}>{userData?.name} {userData?.lastName}</h2>
                    <p><strong>CUIT/CUIL:</strong> <span>{userData?.cuit}</span></p>
                    <p><strong>Ubicación:</strong> <span>{userData?.location}</span></p>
                    <p><strong>Usuario Verificado:</strong> <span>{userData?.isVerified ? 'SI' : 'NO'}</span></p>
                </div>
                <div className='pb-4'>
                    <div className='m-auto'>
                        {
                            menuActionsModules.map((action, i) => <MenuButton key={i} label={action.label} path={action.route} />)
                        }
                    </div>
                    <div className='m-auto max-w-24rem'>
                        <MenuButton fullWidth label={'Publicar remate'} />
                    </div>
                </div>
            </div>
            <div className={styles.rightSection}>
                {
                    auctions.map((a, i) => <AuctionCard onClick={onSelect} key={i} auction={a} />)
                }
            </div>
            <AuctionBidModal onHide={onHide} visible={openBidModal} onAction={onNewBid} auction={selectedAuction}/>
        </div>
    )
}
