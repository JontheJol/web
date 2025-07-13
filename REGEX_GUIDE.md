# Sistema de Expresiones Regulares

Este proyecto utiliza un sistema centralizado de expresiones regulares para validación de datos. Todas las validaciones se basan en el archivo `expreciones.txt` y están implementadas en `src/utils/regexPatterns.ts`.

## 📋 Patrones Disponibles

### 👤 Datos Personales
- **NAME**: Nombres y apellidos (inicia con mayúscula, solo letras y espacios, máx. 50 caracteres)
- **EMAIL**: Correo electrónico válido
- **PHONE**: Teléfono celular (exactamente 10 dígitos)
- **GENDER**: Género ("Masculino" o "Femenino")

### 🔐 Seguridad
- **PASSWORD**: Contraseña segura (mín. 8 caracteres, mayúscula, número y carácter especial)
- **TWO_FA**: Clave 2FA (alfanumérica, mín. 16 caracteres)

### 🇲🇽 Documentos Mexicanos
- **CURP**: Clave Única de Registro de Población
- **RFC**: Registro Federal de Contribuyentes

### 📚 Sistema de Libros
- **BOOK_NAME**: Nombres de libros, editoriales y autores
- **BOOK_STATUS**: Estados de libros ("Disponible", "No disponible", "Prestado")
- **LOAN_STATUS**: Estados de préstamos ("Activo", "Entregado", "Atrasado", "Perdido")
- **LOCATION**: Ubicaciones y direcciones

### 📍 Posicionamiento
- **ROW**: Fila (números del 1 al 99)
- **COLUMN**: Columna (letra mayúscula A-Z)
- **DATE**: Fecha (formato YYYY-MM-DD)

## 🚀 Uso en Componentes

### Importación
```typescript
import { REGEX_PATTERNS, VALIDATION_MESSAGES } from '../utils/regexPatterns';
```

### En esquemas de Yup
```typescript
const schema = yup.object({
  name: yup
    .string()
    .required('El nombre es requerido')
    .matches(REGEX_PATTERNS.NAME, VALIDATION_MESSAGES.NAME),
  email: yup
    .string()
    .required('El email es requerido')
    .matches(REGEX_PATTERNS.EMAIL, VALIDATION_MESSAGES.EMAIL),
  phone: yup
    .string()
    .optional()
    .test('phone-validation', VALIDATION_MESSAGES.PHONE, function(value) {
      if (!value || value === '') return true;
      return REGEX_PATTERNS.PHONE.test(value);
    }),
});
```

### Validación directa
```typescript
import { validateWithRegex } from '../utils/regexPatterns';

const isValidEmail = validateWithRegex(email, REGEX_PATTERNS.EMAIL);
```

## 📝 Ejemplos de Uso

### UserForm.tsx
- Validación de nombres con patrón NAME
- Validación de email con patrón EMAIL
- Validación opcional de teléfono, género, CURP y RFC

### LoginForm.tsx
- Validación de email y contraseña segura

### RegisterForm.tsx
- Validación completa de registro con todos los campos personales

### BookForm.tsx
- Validación de datos de libros, ubicación y posicionamiento

## ⚠️ Reglas Importantes

1. **NUNCA** crear regex inline - siempre usar las centralizadas
2. **SIEMPRE** importar patrones desde `src/utils/regexPatterns.ts`
3. **USAR** mensajes de error predefinidos en `VALIDATION_MESSAGES`
4. **MANTENER** consistencia con las especificaciones de `expreciones.txt`

## 🔧 Agregar Nuevos Patrones

1. Actualizar `expreciones.txt` con la nueva especificación
2. Agregar el patrón a `REGEX_PATTERNS` en `regexPatterns.ts`
3. Agregar el mensaje correspondiente a `VALIDATION_MESSAGES`
4. Actualizar esta documentación

## 📚 Referencia Rápida

| Campo | Patrón | Ejemplo Válido |
|-------|--------|----------------|
| Nombre | `NAME` | "José María" |
| Email | `EMAIL` | "usuario@correo.com" |
| Teléfono | `PHONE` | "5551234567" |
| CURP | `CURP` | "CURP123456HDFRNN09" |
| RFC | `RFC` | "ABC123456DEF" |
| Contraseña | `PASSWORD` | "MiPass123!" |
| Ubicación | `LOCATION` | "Estante #5, Piso 2" |
| Fila | `ROW` | "15" |
| Columna | `COLUMN` | "B" |
