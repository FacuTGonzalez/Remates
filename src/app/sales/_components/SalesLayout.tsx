'use client'
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';

// Importar estilos de PrimeReact
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { toast } from 'react-toastify';
import { PublicAuctionModal } from '@/components/modules/PublicAuction/PublicAuctionModal';

export interface Auction {
    id?: string;
    name: string;
    price: number;
    createdAt: string;
    endDate: string;
    image: string;
    model: string;
    currentPrice: number;
}

const SalesLayout = () => {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedAuctions, setSelectedAuctions] = useState<Auction[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [detailDialog, setDetailDialog] = useState(false);
    const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
    const [openPublicModal, setOpenPublicModal] = useState<boolean>(false);
    const [filters, setFilters] = useState({
        status: null,
        dateRange: null
    });

    // Datos de ejemplo
    const mockAuctions: Auction[] = [
        {
            "id": "6",
            "name": "Ford Mustang Fastback",
            "model": "1967",
            "price": 45000,
            "currentPrice": 49890,
            "createdAt": "2025-06-10T15:30:00Z",
            "endDate": "2025-06-17T15:30:00Z",
            "image": "/mockImages/1967-ford-mustang-fastback-gt-500-tribute.jpeg"
        },
        {
            "id": "9",
            "name": "Volkswagen Beetle",
            "model": "1965",
            "price": 12000,
            "currentPrice": 15680,
            "createdAt": "2025-06-11T10:00:00Z",
            "endDate": "2025-06-18T10:00:00Z",
            "image": "/mockImages/Volkswagen Beetle 1965.jpg"
        },
        {
            "id": "8",
            "name": "Porsche 911 Carrera",
            "model": "1973",
            "price": 88000,
            "currentPrice": 91270,
            "createdAt": "2025-06-08T09:45:00Z",
            "endDate": "2025-06-15T09:45:00Z",
            "image": "/mockImages/Porsche 911 Carrera 1973.jpeg"
        },
        {
            "id": "7",
            "name": "Chevrolet Camaro SS",
            "model": "1969",
            "price": 52000,
            "currentPrice": 56210,
            "createdAt": "2025-06-09T12:15:00Z",
            "endDate": "2025-06-16T12:15:00Z",
            "image": "/mockImages/1969-chevrolet-camaro.jpeg"
        },
        {
            "id": "10",
            "name": "Mercedes-Benz 300SL Gullwing",
            "model": "1955",
            "price": 15000,
            "currentPrice": 19460,
            "createdAt": "2025-06-07T17:00:00Z",
            "endDate": "2025-06-14T17:00:00Z",
            "image": "/mockImages/Mercedes-Benz 300SL Gullwing 1955.png"
        }
    ];

    useEffect(() => {
        // Simular carga de datos
        setTimeout(() => {
            setAuctions(mockAuctions);
            setLoading(false);
        }, 1000);
    }, []);

    // Formatear fecha
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Formatear precio
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    };

    // Calcular estado de la subasta
    const getAuctionStatus = (endDate: string) => {
        const now = new Date();
        const end = new Date(endDate);
        const timeDiff = end.getTime() - now.getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysLeft < 0) return { label: 'Finalizada', severity: 'danger' };
        if (daysLeft === 0) return { label: 'Último día', severity: 'warning' };
        if (daysLeft <= 2) return { label: `${daysLeft} días`, severity: 'warning' };
        return { label: `${daysLeft} días`, severity: 'success' };
    };

    // Templates para las columnas
    const imageBodyTemplate = (rowData: Auction) => {
        return (
            <Image
                src={rowData.image}
                alt={rowData.name}
                width="90"
                height="70"
                style={{ borderRadius: '4px', objectFit: 'cover' }}
            />
        );
    };

    const nameBodyTemplate = (rowData: Auction) => {
        return (
            <div>
                <div className="font-semibold text-900">{rowData.name}</div>
                <div className="text-600 text-sm">{rowData.model}</div>
            </div>
        );
    };

    const priceBodyTemplate = (rowData: Auction) => {
        const difference = rowData.currentPrice - rowData.price;
        const percentageChange = ((difference / rowData.price) * 100).toFixed(1);
        const isPositive = difference >= 0;

        return (
            <div>
                <div className="font-semibold text-900">{formatCurrency(rowData.currentPrice)}</div>
                <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{formatCurrency(difference)} ({percentageChange}%)
                </div>
            </div>
        );
    };

    const statusBodyTemplate = (rowData: Auction) => {
        const status = getAuctionStatus(rowData.endDate);
        return <Tag value={status.label} severity={status.severity as any} />;
    };

    const actionBodyTemplate = (rowData: Auction) => {
        return (
            <div>
                <Button
                    icon="pi pi-eye"
                    rounded
                    outlined
                    size="small"
                    className="p-2 text-white border-none"
                    style={{ backgroundColor: '#A0522D' }} 
                    onClick={() => viewDetails(rowData)}
                    tooltip="Ver detalles"
                />
            </div>
        );
    };

    const viewDetails = (auction: Auction) => {
        setSelectedAuction(auction);
        setDetailDialog(true);
    };


    // Toolbar
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button
                    label="Nuevo Remate"
                    icon="pi pi-plus"
                    severity="success"
                    className="p-2 text-white border-none"
                    style={{ backgroundColor: '#A0522D' }}
                    onClick={onClickPublicButton}
                />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <div className="flex align-items-center gap-2 mr-2">
                <span className="p-input-icon-left">
                    <InputText
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Buscar..."
                    />
                </span>
            </div>
        );
    };

    const onClickPublicButton = () => {
        setOpenPublicModal(true);
    };

    const onPublic = () => {
        toast('Remate publicado correctamente', {
            type: 'success'
        });
    }

    const onHide = () => {
        setOpenPublicModal(false);
        setSelectedAuction(null);
    };

    // Calcular estadísticas
    const totalAuctions = auctions.length;
    const activeAuctions = auctions.filter(a => new Date(a.endDate) > new Date()).length;
    const totalValue = auctions.reduce((sum, a) => sum + a.currentPrice, 0);
    const avgGrowth = auctions.reduce((sum, a) => {
        const growth = ((a.currentPrice - a.price) / a.price) * 100;
        return sum + growth;
    }, 0) / auctions.length;

    return (
        <div className="p-4">
            <div className="mb-4">
                <h1 className="text-3xl font-bold mb-2 text-white">Tablero de Ventas</h1>
                <p className="text-600">Monitorea todas las subastas activas</p>
            </div>

            {/* Tarjetas de estadísticas */}
            <div className="grid mb-4">
                <div className="col-12 md:col-3">
                    <Card className="bg-blue-100 px-3 py-2">
                        <div className="flex justify-content-between align-items-center">
                            <div>
                                <div className="text-blue-600 font-medium mb-1">Total Subastas</div>
                                <div className="text-2xl font-bold text-blue-900">{totalAuctions}</div>
                            </div>
                            <i className="pi pi-shopping-cart text-blue-500" style={{ fontSize: '2rem' }}></i>
                        </div>
                    </Card>
                </div>
                <div className="col-12 md:col-3">
                    <Card className="bg-green-100 px-3 py-2">
                        <div className="flex justify-content-between align-items-center">
                            <div>
                                <div className="text-green-600 font-medium mb-1">Activas</div>
                                <div className="text-2xl font-bold text-green-900">{activeAuctions}</div>
                            </div>
                            <i className="pi pi-check-circle text-green-500" style={{ fontSize: '2rem' }}></i>
                        </div>
                    </Card>
                </div>
                <div className="col-12 md:col-3">
                    <Card className="bg-orange-100 px-3 py-2">
                        <div className="flex justify-content-between align-items-center">
                            <div>
                                <div className="text-orange-600 font-medium mb-1">Valor Total</div>
                                <div className="text-xl font-bold text-orange-900">{formatCurrency(totalValue)}</div>
                            </div>
                            <i className="pi pi-dollar text-orange-500" style={{ fontSize: '2rem' }}></i>
                        </div>
                    </Card>
                </div>
                <div className="col-12 md:col-3">
                    <Card className="bg-purple-100 px-3 py-2">
                        <div className="flex justify-content-between align-items-center">
                            <div>
                                <div className="text-purple-600 font-medium mb-1">Crecimiento Prom.</div>
                                <div className="text-2xl font-bold text-purple-900">+{avgGrowth.toFixed(1)}%</div>
                            </div>
                            <i className="pi pi-chart-line text-purple-500" style={{ fontSize: '2rem' }}></i>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Tabla principal */}
            <Card>
                <Toolbar className="h-3rem mb-2 px-2" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    value={auctions}
                    selection={selectedAuctions}
                    onSelectionChange={(e) => setSelectedAuctions(e.value as Auction[])}
                    dataKey="id"
                    globalFilter={globalFilter}
                    loading={loading}
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} subastas"
                    className="p-datatable-striped p-datatable-gridlines"
                    emptyMessage="No se encontraron subastas"
                >
                    <Column headerStyle={{ width: '3rem' }}></Column>
                    <Column
                        field="image"
                        header="Imagen"
                        body={imageBodyTemplate}
                        style={{ width: '100px' }}
                    ></Column>
                    <Column
                        field="name"
                        header="Vehículo"
                        body={nameBodyTemplate}
                        sortable
                        style={{ minWidth: '200px' }}
                    ></Column>
                    <Column
                        field="price"
                        header="Precio Base"
                        body={(rowData) => formatCurrency(rowData.price)}
                        sortable
                        style={{ width: '150px' }}
                    ></Column>
                    <Column
                        field="currentPrice"
                        header="Precio Actual"
                        body={priceBodyTemplate}
                        sortable
                        style={{ width: '180px' }}
                    ></Column>
                    <Column
                        field="createdAt"
                        header="Fecha Inicio"
                        body={(rowData) => formatDate(rowData.createdAt)}
                        sortable
                        style={{ width: '150px' }}
                    ></Column>
                    <Column
                        field="endDate"
                        header="Estado"
                        body={statusBodyTemplate}
                        sortable
                        style={{ width: '120px' }}
                    ></Column>
                    <Column
                        header="Acciones"
                        body={actionBodyTemplate}
                        style={{ width: '70px' }}
                    ></Column>
                </DataTable>
            </Card>

            <Dialog
                header="Detalles de la Subasta"
                visible={detailDialog}
                style={{ width: '700px' }}
                onHide={() => setDetailDialog(false)}
            >
                {selectedAuction && (
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <Image
                                src={selectedAuction.image}
                                alt={selectedAuction.name}
                                width="100%"
                                style={{ borderRadius: '8px' }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                                }}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <h3 className="mt-0">{selectedAuction.name}</h3>
                            <p><strong>Modelo:</strong> {selectedAuction.model}</p>
                            <p><strong>Precio Base:</strong> {formatCurrency(selectedAuction.price)}</p>
                            <p><strong>Precio Actual:</strong> {formatCurrency(selectedAuction.currentPrice)}</p>
                            <p><strong>Fecha Inicio:</strong> {formatDate(selectedAuction.createdAt)}</p>
                            <p><strong>Fecha Fin:</strong> {formatDate(selectedAuction.endDate)}</p>

                            {(() => {
                                const status = getAuctionStatus(selectedAuction.endDate);
                                return (
                                    <div className="mt-3">
                                        <strong>Estado: </strong>
                                        <Tag value={status.label} severity={status.severity as any} />
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                )}
            </Dialog>
            <PublicAuctionModal onAction={onPublic} onHide={onHide} visible={openPublicModal} />
        </div>
    );
};

export default SalesLayout;