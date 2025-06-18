'use client'
import { UserRole } from '@/models/user.model';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { FaBuilding, FaBalanceScale, FaUser } from 'react-icons/fa';

const RegisterAccountLayout = () => {
    const router = useRouter();

    const handleCardClick = (type: UserRole) => {
        router.push(`/register?type=${type}`);
    };

    const registrationTypes = [
        {
            type: UserRole.BANK,
            title: 'Banco',
            icon: <FaBuilding className="w-12 h-12 text-blue-600" />,
            description: 'Registro para instituciones bancarias',
            permissions: [
                'Gestionar ventas de vehículos',
                'Acceso a plataforma de subastas',
                'Administrar remates'
            ],
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            hoverColor: 'hover:border-blue-400'
        },
        {
            type: UserRole.JUDICIAL_ENTITY,
            title: 'Entidad Judicial',
            icon: <FaBalanceScale className="w-12 h-12 text-purple-600" />,
            description: 'Registro para entidades del sistema judicial',
            permissions: [
                'Gestionar ventas de vehículos',
                'Acceso a plataforma de subastas',
                'Administrar remates'
            ],
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
            hoverColor: 'hover:border-purple-400'
        },
        {
            type: UserRole.NATURAL_PERSON,
            title: 'Persona Natural',
            icon: <FaUser className="w-12 h-12 text-green-600" />,
            description: 'Registro para personas naturales',
            permissions: [
                'Participar en remates',
                'Realizar ofertas',
                'Gestionar compras y pagos',
                'Acceso a ventas disponibles'
            ],
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            hoverColor: 'hover:border-green-400'
        }
    ];

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 my-3">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Elige tu tipo de registro
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Selecciona el tipo de cuenta que mejor se adapte a tus necesidades para acceder a nuestra plataforma
                    </p>
                </div>

                <div className="flex justify-content-center gap-8 my-3">
                    {registrationTypes.map((item) => (
                        <div
                            key={item.type}
                            onClick={() => handleCardClick(item.type as UserRole)}
                            className={`${item.bgColor} ${item.borderColor} ${item.hoverColor} 
                         border-2 rounded-xl p-8 cursor-pointer transition-all duration-300 
                         hover:shadow-lg hover:scale-105 transform`}
                        >
                            <div className="text-center mb-6">
                                <div className="flex justify-center mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">
                                    {item.description}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                                    Permisos incluidos:
                                </h4>
                                <ul className="space-y-2">
                                    {item.permissions.map((permission, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="w-2 h-2 bg-current rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span className="text-sm text-gray-700">{permission}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8 text-center">
                                <Button className="w-full bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg 
                                 border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
                                    Registrarse como {item.title}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-500 text-sm">
                        ¿Ya tienes una cuenta? {' '}
                        <button
                            onClick={() => router.push('/login')}
                            className="text-blue-600 hover:text-blue-800 font-medium bg-transparent border-transparent"
                        >
                            Inicia sesión aquí
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterAccountLayout;