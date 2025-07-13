/**
 * Expresiones regulares centralizadas basadas en expreciones.txt
 * Estos patrones deben usarse para validación de datos en toda la aplicación
 */

export const REGEX_PATTERNS = {
  // Nombre/apellido - Solo letras y espacios, debe iniciar en mayúscula. Máximo 50 caracteres.
  NAME: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñA-ZÁÉÍÓÚÑ ]{1,49}$/,
  
  // Correo - Formato válido de correo electrónico
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  
  // Celular - Exactamente 10 dígitos numéricos
  PHONE: /^\d{10}$/,
  
  // Género - Solo Masculino o Femenino
  GENDER: /^(Masculino|Femenino)$/,
  
  // Contraseña - Mínimo 8 caracteres, al menos una mayúscula, un número y un carácter especial
  PASSWORD: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%#?&]{8,}$/,
  
  // 2FA - Clave secreta alfanumérica, mínimo 16 caracteres
  TWO_FA: /^[A-Za-z0-9]{16,}$/,
  
  // CURP - Formato CURP oficial mexicana
  CURP: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]\d$/,
  
  // RFC - Formato RFC con homoclave
  RFC: /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/,
  
  // Estado de libros - Solo valores específicos
  BOOK_STATUS: /^(Disponible|No disponible|Prestado)$/,
  
  // Estado de préstamos - Solo valores específicos
  LOAN_STATUS: /^(Activo|Entregado|Atrasado|Perdido)$/,
  
  // Fila - Números enteros del 1 al 99
  ROW: /^([1-9]|[1-9][0-9])$/,
  
  // Columna - Solo una letra mayúscula
  COLUMN: /^[A-Z]$/,
  
  // Fecha - Formato YYYY-MM-DD
  DATE: /^\d{4}-\d{2}-\d{2}$/,
  
  // Nombre de libro/editorial/autor - Letras, números, espacios y signos básicos. Hasta 100 caracteres
  BOOK_NAME: /^[\wÁÉÍÓÚáéíóúÑñ\s.,\-']{1,100}$/,
  
  // Ubicación - Direcciones comunes: letras, números y signos
  LOCATION: /^[\wÁÉÍÓÚáéíóúÑñ\s.,#\-\d]{1,100}$/,
} as const;

/**
 * Mensajes de error personalizados para cada patrón de validación
 */
export const VALIDATION_MESSAGES = {
  NAME: 'El nombre debe iniciar con mayúscula, solo contener letras y espacios, máximo 50 caracteres',
  EMAIL: 'Debe ser un correo electrónico válido',
  PHONE: 'El celular debe tener exactamente 10 dígitos',
  GENDER: 'El género debe ser "Masculino" o "Femenino"',
  PASSWORD: 'La contraseña debe tener mínimo 8 caracteres, al menos una mayúscula, un número y un carácter especial (@$!%#?&)',
  TWO_FA: 'La clave 2FA debe ser alfanumérica con mínimo 16 caracteres',
  CURP: 'CURP debe seguir el formato oficial mexicano',
  RFC: 'RFC debe seguir el formato oficial con homoclave',
  BOOK_STATUS: 'El estado debe ser: Disponible, No disponible o Prestado',
  LOAN_STATUS: 'El estado debe ser: Activo, Entregado, Atrasado o Perdido',
  ROW: 'La fila debe ser un número del 1 al 99',
  COLUMN: 'La columna debe ser una letra mayúscula (A-Z)',
  DATE: 'La fecha debe tener formato YYYY-MM-DD',
  BOOK_NAME: 'Nombre debe contener solo letras, números, espacios y signos básicos, máximo 100 caracteres',
  LOCATION: 'La ubicación debe contener caracteres válidos para direcciones, máximo 100 caracteres',
} as const;

/**
 * Función helper para validar un valor contra un patrón específico
 */
export const validateWithRegex = (value: string, pattern: RegExp): boolean => {
  return pattern.test(value);
};

/**
 * Función helper para crear validadores de Yup con regex personalizada
 */
export const createRegexValidator = (pattern: RegExp, message: string) => {
  return (value: string) => {
    if (!value) return true; // Permitir valores vacíos (usar .required() por separado)
    return pattern.test(value) || message;
  };
};
