import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import React, { useState } from 'react';
import styles from './AuctionBidModal.module.scss';
import { Auction } from '@/models/auction.model';

type AuctionPushModalProps = {
  onHide(): void;
  visible: boolean;
  auction: Auction | null;
  onAction: (newBid: number) => void;
};

export const AuctionBidModal = ({ onHide, visible, auction, onAction }: AuctionPushModalProps) => {
  const [bid, setBid] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  if (!auction) return;

  const handleBid = () => {
    if (!bid || bid <= parseFloat(auction.currentPrice || auction.price)) {
      setError('La oferta debe ser mayor al precio actual.');
      return;
    }
    setError('');
    onAction(bid);
    onHide();
  };

  const onHideInterceptor = () =>{
    setBid(null);
    onHide();
  }

  return (
    <Dialog showHeader={false} header="¡Haz tu oferta!" visible={visible} onHide={onHideInterceptor} className="w-11 sm:w-6 md:w-4 border-round-lg">
      <div className={styles.container}>
        <h3 className="m-0">{auction.name} ({auction.model})</h3>
        <p className="text-sm text-color-secondary">Precio actual: ${auction.currentPrice || auction.price}</p>

        <span>
        <label htmlFor="bid" className="text-sm text-color-secondary">Tu oferta</label>
          <InputNumber
            inputId="bid"
            value={bid}
            onValueChange={(e) => setBid(e.target.value as number)}
            mode="currency"
            currency="ARS"
            locale="es-AR"
            className="w-full mt-2"
          />
        </span>

        {error && <small className="text-red-500">{error}</small>}

        <div className="flex justify-content-end pt-3">
          <Button className='p-1 w-5rem h-2rem' label="Cancelar" icon="pi pi-gavel" onClick={onHide}/>
          <Button className='p-1 ml-2 w-5rem h-2rem' label="Ofertar" icon="pi pi-gavel" onClick={handleBid} disabled={!bid} />
        </div>
      </div>
    </Dialog>
  );
};
