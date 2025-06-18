'use client'
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { Badge } from 'primereact/badge';

// Importar estilos de PrimeReact
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useRouter } from 'next/navigation';

export interface Payment {
    id: string;
    auctionId: string;
    auctionName: string;
    auctionImage: string;
    amount: number;
    paymentDate: string;
    dueDate: string;
    status: 'pending' | 'paid' | 'overdue' | 'processing';
    seller: {
        name: string;
        email: string;
        cbu: string;
        bank: string;
    };
    buyer: {
        name: string;
        email: string;
    };
    paymentMethod?: string;
    receiptUrl?: string;
}

const PaymentsLayout = () => {
    const router = useRouter()
    const [payments, setPayments] = useState<Payment[]>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedPayments, setSelectedPayments] = useState<Payment[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [detailDialog, setDetailDialog] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

    // Datos de ejemplo
    const mockPayments: Payment[] = [
        {
            id: "PAY001",
            auctionId: "6",
            auctionName: "Ford Mustang Fastback",
            auctionImage: "/mockImages/1967-ford-mustang-fastback-gt-500-tribute.jpeg",
            amount: 49890,
            paymentDate: "2025-06-17T15:30:00Z",
            dueDate: "2025-06-20T23:59:59Z",
            status: "pending",
            seller: {
                name: "Carlos Rodriguez",
                email: "carlos.rodriguez@email.com",
                cbu: "0170001540000001234567",
                bank: "Banco Santander"
            },
            buyer: {
                name: "María González",
                email: "maria.gonzalez@email.com"
            }
        },
        {
            id: "PAY002",
            auctionId: "9",
            auctionName: "Volkswagen Beetle",
            auctionImage: "/mockImages/Volkswagen Beetle 1965.jpg",
            amount: 15680,
            paymentDate: "2025-06-18T10:00:00Z",
            dueDate: "2025-06-21T23:59:59Z",
            status: "paid",
            seller: {
                name: "Ana Martinez",
                email: "ana.martinez@email.com",
                cbu: "0110001500000009876543",
                bank: "Banco Nación"
            },
            buyer: {
                name: "Roberto Silva",
                email: "roberto.silva@email.com"
            },
            paymentMethod: "Transferencia bancaria",
            receiptUrl: "/receipts/PAY002.pdf"
        },
        {
            id: "PAY003",
            auctionId: "8",
            auctionName: "Porsche 911 Carrera",
            auctionImage: "/mockImages/Porsche 911 Carrera 1973.jpeg",
            amount: 91270,
            paymentDate: "2025-06-15T09:45:00Z",
            dueDate: "2025-06-18T23:59:59Z",
            status: "overdue",
            seller: {
                name: "Luis Fernandez",
                email: "luis.fernandez@email.com",
                cbu: "0720001800000005555555",
                bank: "Banco Galicia"
            },
            buyer: {
                name: "Patricia López",
                email: "patricia.lopez@email.com"
            }
        },
        {
            id: "PAY004",
            auctionId: "7",
            auctionName: "Chevrolet Camaro SS",
            auctionImage: "/mockImages/1969-chevrolet-camaro.jpeg",
            amount: 56210,
            paymentDate: "2025-06-16T12:15:00Z",
            dueDate: "2025-06-19T23:59:59Z",
            status: "processing",
            seller: {
                name: "Diego Morales",
                email: "diego.morales@email.com",
                cbu: "0340001700000007777777",
                bank: "Banco Patagonia"
            },
            buyer: {
                name: "Carmen Ruiz",
                email: "carmen.ruiz@email.com"
            },
            paymentMethod: "Transferencia bancaria",
            receiptUrl: "/receipts/PAY004.pdf"
        },
        {
            id: "PAY005",
            auctionId: "10",
            auctionName: "Mercedes-Benz 300SL Gullwing",
            auctionImage: "/mockImages/Mercedes-Benz 300SL Gullwing 1955.png",
            amount: 19460,
            paymentDate: "2025-06-14T17:00:00Z",
            dueDate: "2025-06-17T23:59:59Z",
            status: "pending",
            seller: {
                name: "Isabel Torres",
                email: "isabel.torres@email.com",
                cbu: "0150001600000008888888",
                bank: "Banco ICBC"
            },
            buyer: {
                name: "Andrés Vega",
                email: "andres.vega@email.com"
            }
        }
    ];

    useEffect(() => {
        // Simular carga de datos
        setTimeout(() => {
            setPayments(mockPayments);
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

    // Obtener severidad del estado
    const getStatusSeverity = (status: string) => {
        switch (status) {
            case 'paid': return 'success';
            case 'pending': return 'warning';
            case 'processing': return 'info';
            case 'overdue': return 'danger';
            default: return 'secondary';
        }
    };

    // Obtener etiqueta del estado
    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'paid': return 'Pagado';
            case 'pending': return 'Pendiente';
            case 'processing': return 'Procesando';
            case 'overdue': return 'Vencido';
            default: return status;
        }
    };

    // Templates para las columnas
    const imageBodyTemplate = (rowData: Payment) => {
        return (
            <Image
                src={rowData.auctionImage}
                alt={rowData.auctionName}
                width="80"
                height="60"
                style={{ borderRadius: '4px', objectFit: 'cover' }}
            />
        );
    };

    const auctionBodyTemplate = (rowData: Payment) => {
        return (
            <div>
                <div className="font-semibold text-900">{rowData.auctionName}</div>
                <div className="text-600 text-sm">ID: {rowData.auctionId}</div>
            </div>
        );
    };

    const sellerBodyTemplate = (rowData: Payment) => {
        return (
            <div>
                <div className="font-semibold text-900">{rowData.seller.name}</div>
                <div className="text-600 text-sm">{rowData.seller.email}</div>
                <div className="text-500 text-xs mt-1">
                    <strong>CBU:</strong> {rowData.seller.cbu}
                </div>
                <div className="text-500 text-xs">
                    <strong>Banco:</strong> {rowData.seller.bank}
                </div>
            </div>
        );
    };

    const buyerBodyTemplate = (rowData: Payment) => {
        return (
            <div>
                <div className="font-semibold text-900">{rowData.buyer.name}</div>
                <div className="text-600 text-sm">{rowData.buyer.email}</div>
            </div>
        );
    };

    const statusBodyTemplate = (rowData: Payment) => {
        return (
            <div className="flex flex-column gap-1">
                <Tag 
                    value={getStatusLabel(rowData.status)} 
                    severity={getStatusSeverity(rowData.status) as any}
                />
                {rowData.status === 'paid' && rowData.receiptUrl && (
                    <Badge value="Comprobante" severity="success" />
                )}
            </div>
        );
    };

    const dueDateBodyTemplate = (rowData: Payment) => {
        const dueDate = new Date(rowData.dueDate);
        const now = new Date();
        const isOverdue = dueDate < now && rowData.status !== 'paid';
        
        return (
            <div className={isOverdue ? 'text-red-600 font-semibold' : ''}>
                {formatDate(rowData.dueDate)}
                {isOverdue && <div className="text-xs">¡Vencido!</div>}
            </div>
        );
    };

    const actionBodyTemplate = (rowData: Payment) => {
        const handleUploadReceipt = () => {
            router.push(`/purchases/${rowData.id}`);
        };

        return (
            <div className="flex gap-2">
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
                {rowData.status !== 'paid' && (
                    <Button
                        icon="pi pi-upload"
                        rounded
                        size="small"
                        className="p-2 text-white border-none"
                        style={{ backgroundColor: '#28a745' }}
                        onClick={handleUploadReceipt}
                        tooltip="Cargar comprobante"
                    />
                )}
            </div>
        );
    };

    const viewDetails = (payment: Payment) => {
        setSelectedPayment(payment);
        setDetailDialog(true);
    };

    const downloadReceipt = (payment: Payment) => {
        console.log('Descargando comprobante:', payment.receiptUrl);
        // Implementar lógica de descarga
    };

    // Toolbar
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">

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
                        placeholder="Buscar pagos..."
                    />
                </span>
            </div>
        );
    };

    // Calcular estadísticas
    const totalPayments = payments.length;
    const paidPayments = payments.filter(p => p.status === 'paid').length;
    const overduePayments = payments.filter(p => p.status === 'overdue').length;
    const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
    const paidAmount = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="p-4">
            <div className="mb-4">
                <h1 className="text-3xl font-bold mb-2 text-white">Gestión de Pagos</h1>
                <p className="text-600">Administra los pagos de las subastas finalizadas</p>
            </div>

            {/* Tarjetas de estadísticas */}
            <div className="grid mb-4">
                <div className="col-12 md:col-6 lg:col-3">
                    <Card className="bg-blue-100 px-3 py-2">
                        <div className="flex justify-content-between align-items-center">
                            <div>
                                <div className="text-blue-600 font-medium mb-1">Total Pagos</div>
                                <div className="text-2xl font-bold text-blue-900">{totalPayments}</div>
                            </div>
                            <i className="pi pi-credit-card text-blue-500" style={{ fontSize: '2rem' }}></i>
                        </div>
                    </Card>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <Card className="bg-green-100 px-3 py-2">
                        <div className="flex justify-content-between align-items-center">
                            <div>
                                <div className="text-green-600 font-medium mb-1">Pagados</div>
                                <div className="text-2xl font-bold text-green-900">{paidPayments}</div>
                            </div>
                            <i className="pi pi-check-circle text-green-500" style={{ fontSize: '2rem' }}></i>
                        </div>
                    </Card>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <Card className="bg-red-100 px-3 py-2">
                        <div className="flex justify-content-between align-items-center">
                            <div>
                                <div className="text-red-600 font-medium mb-1">Vencidos</div>
                                <div className="text-2xl font-bold text-red-900">{overduePayments}</div>
                            </div>
                            <i className="pi pi-exclamation-triangle text-red-500" style={{ fontSize: '2rem' }}></i>
                        </div>
                    </Card>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <Card className="bg-purple-100 px-3 py-2">
                        <div className="flex justify-content-between align-items-center">
                            <div>
                                <div className="text-purple-600 font-medium mb-1">Monto Cobrado</div>
                                <div className="text-lg font-bold text-purple-900">{formatCurrency(paidAmount)}</div>
                                <div className="text-xs text-purple-600">de {formatCurrency(totalAmount)}</div>
                            </div>
                            <i className="pi pi-dollar text-purple-500" style={{ fontSize: '2rem' }}></i>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Tabla principal */}
            <Card>
                <Toolbar className="h-3rem mb-2 px-2" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    value={payments}
                    selection={selectedPayments}
                    onSelectionChange={(e) => setSelectedPayments(e.value as Payment[])}
                    dataKey="id"
                    globalFilter={globalFilter}
                    loading={loading}
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} pagos"
                    className="p-datatable-striped p-datatable-gridlines"
                    emptyMessage="No se encontraron pagos"
                >
                    <Column
                        field="id"
                        header="ID Pago"
                        sortable
                        style={{ width: '100px' }}
                    ></Column>
                    <Column
                        field="auctionImage"
                        header="Vehículo"
                        body={imageBodyTemplate}
                        style={{ width: '100px' }}
                    ></Column>
                    <Column
                        field="auctionName"
                        header="Subasta"
                        body={auctionBodyTemplate}
                        sortable
                        style={{ minWidth: '180px' }}
                    ></Column>
                    <Column
                        field="amount"
                        header="Monto"
                        body={(rowData) => formatCurrency(rowData.amount)}
                        sortable
                        style={{ width: '120px' }}
                    ></Column>
                    <Column
                        field="seller"
                        header="Vendedor"
                        body={sellerBodyTemplate}
                        style={{ minWidth: '250px' }}
                    ></Column>
                    <Column
                        field="buyer"
                        header="Comprador"
                        body={buyerBodyTemplate}
                        style={{ minWidth: '180px' }}
                    ></Column>
                    <Column
                        field="dueDate"
                        header="Vencimiento"
                        body={dueDateBodyTemplate}
                        sortable
                        style={{ width: '150px' }}
                    ></Column>
                    <Column
                        field="status"
                        header="Estado"
                        body={statusBodyTemplate}
                        sortable
                        style={{ width: '120px' }}
                    ></Column>
                    <Column
                        header="Acciones"
                        body={actionBodyTemplate}
                        style={{ width: '150px' }}
                    ></Column>
                </DataTable>
            </Card>

            {/* Dialog de detalles */}
            <Dialog
                header="Detalles del Pago"
                visible={detailDialog}
                style={{ width: '800px' }}
                onHide={() => setDetailDialog(false)}
            >
                {selectedPayment && (
                    <div className="grid">
                        <div className="col-12 md:col-4">
                            <Image
                                src={selectedPayment.auctionImage}
                                alt={selectedPayment.auctionName}
                                width="100%"
                                style={{ borderRadius: '8px' }}
                            />
                        </div>
                        <div className="col-12 md:col-8">
                            <h3 className="mt-0">Información del Pago</h3>
                            <div className="grid">
                                <div className="col-6">
                                    <p><strong>ID Pago:</strong> {selectedPayment.id}</p>
                                    <p><strong>Subasta:</strong> {selectedPayment.auctionName}</p>
                                    <p><strong>Monto:</strong> {formatCurrency(selectedPayment.amount)}</p>
                                    <p><strong>Fecha Pago:</strong> {formatDate(selectedPayment.paymentDate)}</p>
                                    <p><strong>Vencimiento:</strong> {formatDate(selectedPayment.dueDate)}</p>
                                </div>
                                <div className="col-6">
                                    <p><strong>Estado:</strong> 
                                        <Tag 
                                            value={getStatusLabel(selectedPayment.status)} 
                                            severity={getStatusSeverity(selectedPayment.status) as any}
                                            className="ml-2"
                                        />
                                    </p>
                                    {selectedPayment.paymentMethod && (
                                        <p><strong>Método:</strong> {selectedPayment.paymentMethod}</p>
                                    )}
                                </div>
                            </div>
                            
                            <h4>Datos del Vendedor</h4>
                            <div className="bg-gray-50 p-3 border-round">
                                <p><strong>Nombre:</strong> {selectedPayment.seller.name}</p>
                                <p><strong>Email:</strong> {selectedPayment.seller.email}</p>
                                <p><strong>CBU:</strong> {selectedPayment.seller.cbu}</p>
                                <p><strong>Banco:</strong> {selectedPayment.seller.bank}</p>
                            </div>

                            <h4>Datos del Comprador</h4>
                            <div className="bg-gray-50 p-3 border-round">
                                <p><strong>Nombre:</strong> {selectedPayment.buyer.name}</p>
                                <p><strong>Email:</strong> {selectedPayment.buyer.email}</p>
                            </div>
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default PaymentsLayout;