export interface LoginFormConfig {
    password : string;
    username : string;
}

export interface User {
    username: string;
    entityName?: string;
    name?: string;
    lastName?: string;
    role: UserRole
}

export enum UserRole {
    NATURAL_PERSON= 'NATURAL_PERSON',
    BANK = 'BANK',
    JUDICIAL_ENTITY = 'JUDICIAL_ENTITY',
}