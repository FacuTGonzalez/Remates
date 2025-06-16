'use client'
import React, { useEffect, useState } from 'react'
import styles from './HomeLayout.module.scss';
import { menuActionsModules } from '@/utils/helpers/homeHelper';
import { MenuButton } from '@/components/elements/RButton/MenuButton';
import { getUserByUsername } from '@/utils/helpers/getUser';
import mockData from '@/utils/mocks/auctions.json'
import { AuctionCard } from '@/components/modules/AuctionCard/AuctionCard';
import { Auction, AuctionMockData } from '@/models/auction.model';
import { User, UserRole } from '@/models/user.model';
import { AuctionBidModal } from '@/components/modules/AuctionPushModal/AuctionBidModal';
import { PublicAuctionModal } from '@/components/modules/PublicAuction/PublicAuctionModal';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const HomeLayout = () => {
    const [user, setUser] = useState<string | null>(null);
    const [userData, setUserData] = useState<User | null>(null);
    const [openBidModal, setOpenBidModal] = useState<boolean>(false);
    const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
    const [openPublicModal, setOpenPublicModal] = useState<boolean>(false);
    const router = useRouter();

    const _mockData = mockData as AuctionMockData;
    const auctions = _mockData.auctions;

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
        setOpenPublicModal(false);
        setSelectedAuction(null);
    };

    const onNewBid = () => {
        toast('Oferta enviada.', {
            type: 'success'
        });
    };

    const onClickPublicButton = () => {
        setOpenPublicModal(true);
    };

    const onPublic = () => {
        toast('Remate publicado correctamente', {
            type: 'success'
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftSection}>
                <div className={styles.userCard}>
                    <h2 className={styles.name}>{userData?.entityName ? userData?.entityName : `${userData?.name} ${userData?.lastName}`} </h2>
                    <p><strong>Correo electrónico</strong></p>
                    <p>{userData?.username}</p>
                    <p><strong>CUIT/CUIL</strong></p>
                    <p>{userData?.cuit}</p>
                    <p><strong>Ubicación</strong></p>
                    <p>{userData?.location}</p>
                    <p><strong>Usuario Verificado</strong></p>
                    <p>{userData?.isVerified ? 'SI' : 'NO'}</p>
                </div>
                <div className='pb-4'>
                    <div className='m-auto max-w-18rem'>
                        {
                            menuActionsModules.map((action, i) => action.roles.includes(userData?.role as UserRole) && <MenuButton fullWidth key={i} label={action.label} path={action.route} />)
                        }
                    </div>
                    <div className='m-auto max-w-18rem'>
                        <MenuButton fullWidth label={'Publicar remate'} onClick={onClickPublicButton} />
                    </div>
                </div>
            </div>
            <div className={styles.rightSection}>
                {
                    auctions.map((a, i) => <AuctionCard onClick={onSelect} key={i} auction={a} />)
                }
            </div>
            <AuctionBidModal onHide={onHide} visible={openBidModal} onAction={onNewBid} auction={selectedAuction} />
            <PublicAuctionModal onAction={onPublic} onHide={onHide} visible={openPublicModal} />
        </div>
    )
}
