import { UserRole } from "@/models/user.model";

export const menuActionsModules = [
    {
        roles: [UserRole.NATURAL_PERSON],
        label: 'Remates',
        route: '/auctions'
    },
    {
        roles: [UserRole.BANK, UserRole.JUDICIAL_ENTITY, UserRole.NATURAL_PERSON],
        label: 'Ventas', 
        route: '/sales'
    },
    {
        roles: [UserRole.BANK, UserRole.JUDICIAL_ENTITY, UserRole.NATURAL_PERSON],
        label: 'Ofertas',
        route: '/offers'
    },
    {
        roles: [UserRole.NATURAL_PERSON],
        label: 'Pagos',
        route: '/purchases'
    }
]