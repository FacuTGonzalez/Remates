import Joi from "joi";

export const CREATE_AUCTION_FIELDS = {
    NAME_FIELD: { name: 'name', label: 'Nombre' },
    MODEL_FIELD: { name: 'model', label: 'Modelo' },
    PRICE_FIELD: { name: 'price', label: 'Precio base' },
    END_DATE_FIELD: { name: 'endDate', label: 'Fecha de finalización' },
    IMAGE_FIELD: { name: 'image', label: 'Por favor, seleccione una imagen' },
};

export const createAuctionSchema = Joi.object({
    [CREATE_AUCTION_FIELDS.NAME_FIELD.name]: Joi.string().required().messages({
        'string.empty': 'El nombre es obligatorio',
    }),
    [CREATE_AUCTION_FIELDS.MODEL_FIELD.name]: Joi.string().required().messages({
        'string.empty': 'El modelo es obligatorio',
    }),
    [CREATE_AUCTION_FIELDS.PRICE_FIELD.name]: Joi.number().positive().required().messages({
        'number.base': 'Debe ser un número',
        'number.positive': 'Debe ser mayor que cero',
        'any.required': 'El precio base es obligatorio',
    }),
    [CREATE_AUCTION_FIELDS.END_DATE_FIELD.name]: Joi.date().greater('now').required().messages({
        'date.greater': 'La fecha de finalización debe ser posterior a la fecha actual',
        'any.required': 'La fecha de finalización es obligatoria',
    }),
    [CREATE_AUCTION_FIELDS.IMAGE_FIELD.name]: Joi.string().uri().required().messages({
        'string.uri': 'Debe ser una URL válida',
        'any.required': 'La URL de la imagen es obligatoria',
    }),
});