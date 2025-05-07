// Regex para validar DNI argentino (7-8 dígitos)
export const dniRegex = /^\d{7,8}$/;

// Regex para validar CUIT/CUIL argentino (formato: XX-XXXXXXXX-X)
export const cuitRegex = /^(20|23|24|27|30|33|34)([0-9]{8})([0-9])$/;

// Regex para validar que solo contenga números
export const onlyNumbersRegex = /^[0-9]+$/;

// Regex para validar correo electrónico
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
