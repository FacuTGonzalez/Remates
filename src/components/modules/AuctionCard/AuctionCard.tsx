'use client';
import React from 'react';
import styles from './AuctionCard.module.scss';
import Image from 'next/image';
import { Auction } from '@/models/auction.model';
import Link from 'next/link';
import { format } from 'date-fns';
import { formatCurrency } from '@/utils/helpers/currency';


type AuctionCardProps = {
  auction: Auction;
  onClick?(auction: Auction):void;
}

export const AuctionCard = ({ auction, onClick }: AuctionCardProps) => {

  const _onClick = () => {
  if(!onClick)return
    onClick(auction)
  }

  return (
      <div className={styles.container} onClick={_onClick}>
        <div className={styles.imageContainer}>
          <Image src={auction.image} layout='fill' alt='auction image' objectFit='cover' quality={100} />
        </div>
        <div className={styles.info}>
          <p className={styles.name}>{auction.name}</p>
          <p className={styles.data}><strong>Modelo:</strong> {auction.model}</p>
          <p className={styles.data}><strong>Publicado:</strong> {format(new Date(auction.createdAt), 'dd/MM/yyyy')}</p>
          <p className={styles.data}><strong>Finalización:</strong> {format(new Date(auction.endDate), 'dd/MM/yyyy')}</p>
          <p className={styles.data}><strong>Precio inicial:</strong> {formatCurrency(auction.price)}</p>
          <p className={styles.data}><strong>Precio actual:</strong> {formatCurrency(auction.currentPrice)}</p>
        </div>
      </div>
  );
};
