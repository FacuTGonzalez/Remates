import { DeepRequired, FieldErrors, FieldErrorsImpl, FieldValues } from 'react-hook-form';

export const mapErrorMessage = (error: ErrorResponse, method: RequestMethod, defaultErrorMessage?: string): string => {
  const message = errorCodes[error.code];

  return message ? message : (defaultErrorMessage ?? errorCodes[method]);
};

export interface ErrorResponse {
  code: string;
  details: string;
  message: string;
}

export enum RequestMethod {
  DELETE = 'DELETE',
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT'
}

const errorCodes: ErrorCodes = {
  USR006: 'El mail ya ha sido registrado',
  'AS001-WU001': 'El email ya ha sido registrado',
  'AV001-WU001': 'El email ya ha sido registrado',
  'RTHEBU001-RTEBH001': 'No hay registros en el día de hoy',
  'CE001-WU001':
    'El mail esta siendo utilizado para un rol especial dentro del sistema. Por favor utiliza otro para uso personal.',
  GET: 'Ocurrió un error al cargar los datos',
  POST: 'Ocurrió un error al guardar los datos',
  PUT: 'Ocurrió un error al guardar los datos',
  DELETE: 'Ocurrió un error al querer eliminar los datos'
};

export interface ErrorCodes {
  [key: string]: string;
}
export const getFormErrorMessage = (
  name: string,
  errors?: FieldErrors<FieldValues> | FieldErrorsImpl<DeepRequired<{ [x: string]: string }>> | undefined
): string | undefined => {
  if (errors === undefined) return;

  if (errors[name]) {
    return errors[name]?.message as string;
  }
  return;
};

export const handleErrorMessage = (errorMsg: string): string => {
  const errorMessagesMap: Record<string, string> = {
    'webUrl: Invalid url': 'La URL ingresada es inválida',
    'Account already exists': 'Ya existe una cuenta creada con ese correo electrónico.',
    'Company already exists': 'Ya existe una empresa creada con ese NIT/TIN.',
    'Owner already has a company': 'Este usuario ya posee una empresa creada a su nombre.',
    defaultMessage: 'Ocurrió un error inesperado. Intente nuevamente más tarde.'
  };

  return errorMessagesMap[errorMsg] || errorMessagesMap.defaultMessage;
};