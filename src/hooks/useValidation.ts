import { useState, useCallback, useMemo } from 'react';
import { 
  validatePattern, 
  validateWithError, 
  formatters,
  SELECT_OPTIONS 
} from '../utils/regex';
import type { RegexPatternKey } from '../utils/regex';
import { syncValidators } from '../utils/validation';

/**
 * Hook personalizado para validación en tiempo real
 */
export const useFieldValidation = (pattern: RegexPatternKey) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const validate = useCallback((inputValue: string) => {
    const errorMessage = validateWithError(inputValue, pattern);
    setError(errorMessage);
    return errorMessage === null;
  }, [pattern]);

  const handleChange = useCallback((inputValue: string) => {
    setValue(inputValue);
    if (touched) {
      validate(inputValue);
    }
  }, [validate, touched]);

  const handleBlur = useCallback(() => {
    setTouched(true);
    validate(value);
  }, [validate, value]);

  const isValid = useMemo(() => {
    return validatePattern(value, pattern);
  }, [value, pattern]);

  const reset = useCallback(() => {
    setValue('');
    setError(null);
    setTouched(false);
  }, []);

  return {
    value,
    error,
    touched,
    isValid,
    handleChange,
    handleBlur,
    reset,
    setValue,
  };
};

/**
 * Hook para validación de formularios múltiples campos
 */
export const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  validationSchema: Record<keyof T, RegexPatternKey>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback((field: keyof T, value: string) => {
    const pattern = validationSchema[field];
    const error = validateWithError(value, pattern);
    
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));

    return error === null;
  }, [validationSchema]);

  const handleChange = useCallback((field: keyof T) => (value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    if (touched[field]) {
      validateField(field, value);
    }
  }, [validateField, touched]);

  const handleBlur = useCallback((field: keyof T) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, values[field]);
  }, [validateField, values]);

  const validateAll = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationSchema).forEach(key => {
      const field = key as keyof T;
      const error = validateWithError(values[field], validationSchema[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(validationSchema).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );

    return isValid;
  }, [values, validationSchema]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isFormValid = useMemo(() => {
    return Object.keys(validationSchema).every(key => {
      const field = key as keyof T;
      return validatePattern(values[field], validationSchema[field]);
    });
  }, [values, validationSchema]);

  return {
    values,
    errors,
    touched,
    isFormValid,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    setValues,
  };
};

/**
 * Hook para formateo automático de campos
 */
export const useFormattedField = (
  formatter: keyof typeof formatters,
  pattern?: RegexPatternKey
) => {
  const [value, setValue] = useState('');
  const [displayValue, setDisplayValue] = useState('');

  const handleChange = useCallback((inputValue: string) => {
    let formatted: string;
    
    // Manejar diferentes tipos de formateadores
    if (formatter === 'fecha') {
      // Para fecha, necesitamos una fecha válida
      const date = new Date(inputValue);
      formatted = isNaN(date.getTime()) ? inputValue : formatters[formatter](date);
    } else {
      // Para otros formateadores que aceptan string
      formatted = (formatters[formatter] as (input: string) => string)(inputValue);
    }
    
    setValue(formatted);
    setDisplayValue(formatted);
  }, [formatter]);

  const validation = pattern ? useFieldValidation(pattern) : null;

  return {
    value,
    displayValue,
    handleChange,
    ...validation,
  };
};

/**
 * Hook para opciones de select/dropdown
 */
export const useSelectOptions = (optionsKey: keyof typeof SELECT_OPTIONS) => {
  const options = useMemo(() => {
    return SELECT_OPTIONS[optionsKey].map(option => ({
      value: option,
      label: option,
    }));
  }, [optionsKey]);

  return options;
};

/**
 * Hook para validación de contraseñas con confirmación
 */
export const usePasswordValidation = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  const validatePassword = useCallback((pwd: string) => {
    const error = syncValidators.validateContrasena(pwd);
    setPasswordError(error);
    return error === null;
  }, []);

  const validateConfirmPassword = useCallback((confirm: string, original: string) => {
    if (confirm !== original) {
      setConfirmError('Las contraseñas no coinciden');
      return false;
    }
    setConfirmError(null);
    return true;
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    validatePassword(value);
    
    // Re-validar confirmación si ya se ingresó
    if (confirmPassword) {
      validateConfirmPassword(confirmPassword, value);
    }
  }, [validatePassword, validateConfirmPassword, confirmPassword]);

  const handleConfirmPasswordChange = useCallback((value: string) => {
    setConfirmPassword(value);
    validateConfirmPassword(value, password);
  }, [validateConfirmPassword, password]);

  const isValid = useMemo(() => {
    return passwordError === null && 
           confirmError === null && 
           password.length > 0 && 
           confirmPassword.length > 0;
  }, [passwordError, confirmError, password, confirmPassword]);

  const reset = useCallback(() => {
    setPassword('');
    setConfirmPassword('');
    setPasswordError(null);
    setConfirmError(null);
  }, []);

  return {
    password,
    confirmPassword,
    passwordError,
    confirmError,
    isValid,
    handlePasswordChange,
    handleConfirmPasswordChange,
    reset,
  };
};

/**
 * Hook para validación de documentos mexicanos (CURP + RFC)
 */
export const useDocumentValidation = () => {
  const curpValidation = useFieldValidation('CURP');
  const rfcValidation = useFieldValidation('RFC');

  const isValid = useMemo(() => {
    return curpValidation.isValid && rfcValidation.isValid;
  }, [curpValidation.isValid, rfcValidation.isValid]);

  const reset = useCallback(() => {
    curpValidation.reset();
    rfcValidation.reset();
  }, [curpValidation, rfcValidation]);

  return {
    curp: curpValidation,
    rfc: rfcValidation,
    isValid,
    reset,
  };
};

/**
 * Hook para validación de ubicación de libros (Fila + Columna)
 */
export const useLocationValidation = () => {
  const filaValidation = useFieldValidation('FILA');
  const columnaValidation = useFieldValidation('COLUMNA');

  const isValid = useMemo(() => {
    return filaValidation.isValid && columnaValidation.isValid;
  }, [filaValidation.isValid, columnaValidation.isValid]);

  const reset = useCallback(() => {
    filaValidation.reset();
    columnaValidation.reset();
  }, [filaValidation, columnaValidation]);

  const getLocationString = useCallback(() => {
    if (isValid) {
      return `${columnaValidation.value}${filaValidation.value}`;
    }
    return '';
  }, [isValid, columnaValidation.value, filaValidation.value]);

  return {
    fila: filaValidation,
    columna: columnaValidation,
    isValid,
    reset,
    getLocationString,
  };
};
