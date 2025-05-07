import { emailRegex } from "@/utils/regex"
import Joi from "joi"

export const LOGIN_FIELDS = {
    PASSWORD_FIELD : {
        name: 'password',
        label: 'Contraseña'
    },
USERNAME_FIELD: {
    name: 'username',
    label: 'Correo electrónico'
}
}

export const loginSchema = Joi.object({
    [LOGIN_FIELDS.PASSWORD_FIELD.name] : Joi.string().required().messages({
        'string.empty' : 'El campo es requerido',
        'string.required' : 'El campo es requerido'
    }),
    [LOGIN_FIELDS.USERNAME_FIELD.name] : Joi.string().required().regex(emailRegex).messages({
        'string.empty' : 'El campo es requerido',
        'string.required' : 'El campo es requerido',
        'string.pattern.base' : 'Ingrese un correo electrónico válido'
    })
}).options({stripUnknown: true})