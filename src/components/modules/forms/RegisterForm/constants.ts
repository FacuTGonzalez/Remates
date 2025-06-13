import Joi from "joi"
import { emailRegex } from "@/utils/regex"

export enum UserRole {
    NATURAL_PERSON = 'NATURAL_PERSON',
    BANK = 'BANK',
    JUDICIAL_ENTITY = 'JUDICIAL_ENTITY',
}

export const REGISTER_FIELDS = {
    NAME: {
        name: 'name',
        label: 'Nombre',
    },
    LAST_NAME: {
        name: 'lastName',
        label: 'Apellido',
    },
    USERNAME: {
        name: 'username',
        label: 'Correo electrónico',
    },
    LOCATION: {
        name: 'location',
        label: 'Localidad',
    },
    ENTITY_NAME: {
        name: 'entityName',
        label: 'Nombre entidad',
    },
    CUIT: {
        name: 'cuit-cuil',
        label: 'CUIT/CUIL',
    },
}


// En constants.ts
export const getRegisterSchema = (type: UserRole) => {
    const baseSchema = {
        [REGISTER_FIELDS.USERNAME.name]: Joi.string().required().regex(emailRegex).messages({
            'string.empty': 'El campo es requerido',
            'string.pattern.base': 'Ingrese un correo electrónico válido',
            'string.required': 'El campo es requerido.'
        }),
        [REGISTER_FIELDS.NAME.name]: Joi.string().required().messages({
            'string.empty': 'El campo es requerido.',
            'string.required': 'El campo es requerido.'
        }),
        [REGISTER_FIELDS.LAST_NAME.name]: Joi.string().required().messages({
            'string.empty': 'El campo es requerido.',
            'string.required': 'El campo es requerido.'
        }),
        [REGISTER_FIELDS.CUIT.name]: Joi.string()
            .pattern(/^\d{11}$/)
            .required()
            .messages({
                'string.empty': 'El CUIT es requerido',
                'string.pattern.base': 'El CUIT debe tener 11 dígitos numéricos',
                'string.required': 'El campo es requerido.'
            }),
        [REGISTER_FIELDS.LOCATION.name]: Joi.string().required().messages({
            'string.empty': 'El campo es requerido.',
            'string.required': 'El campo es requerido.'
        }),
    };

    // Solo agregar entityName como requerido si es necesario
    if (type === UserRole.BANK || type === UserRole.JUDICIAL_ENTITY) {
        baseSchema[REGISTER_FIELDS.ENTITY_NAME.name] = Joi.string().required().messages({
            'string.empty': 'El campo es requerido.',
            'string.required': 'El campo es requerido.'
        });
    } else {
        baseSchema[REGISTER_FIELDS.ENTITY_NAME.name] = Joi.string().optional();
    }

    return Joi.object(baseSchema).options({ stripUnknown: true });
};