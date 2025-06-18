'use client'
import React, { useState } from 'react'
import styles from './OffersLayout.module.scss';
import mockData from '@/utils/mocks/auctions.json'
import { AuctionCard } from '@/components/modules/AuctionCard/AuctionCard';
import { Auction, AuctionMockData } from '@/models/auction.model';
import { AuctionBidModal } from '@/components/modules/AuctionPushModal/AuctionBidModal';


export const OffersLayout = () => {
  const [openBidModal, setOpenBidModal] = useState<boolean>(false);
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);

  const _mockData = mockData as AuctionMockData;
  const auctionsToModule = _mockData.auctionsToModule.slice(3,6)
  

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
      <h2 className='text-white'>MIS OFERTAS</h2>
      <div className='flex justify-content-center flex-wrap'>
        {
          auctionsToModule.map((a, i) => <AuctionCard onClick={onSelect} key={i} auction={a} />)
        }
      </div>
      <AuctionBidModal onHide={onHide} visible={openBidModal} onAction={onNewBid} auction={selectedAuction}/>
    </div>
  )
}