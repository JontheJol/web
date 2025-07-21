# 📋 Sistema de Validaciones Centralizadas

Este sistema proporciona un conjunto completo de validaciones basadas en expresiones regulares para el proyecto BookSmart, siguiendo las especificaciones del archivo `expreciones.txt`.

## 🎯 Características

- ✅ **Expresiones regulares centralizadas** para todos los campos
- 🎨 **Esquemas Yup** preconfigurados para formularios
- 🪝 **Hooks personalizados** para validación en tiempo real
- 📝 **Mensajes de error descriptivos** en español
- 🔧 **Formateadores automáticos** para campos específicos
- 🎭 **Opciones predefinidas** para campos select/dropdown

## 📁 Estructura

```
src/
├── utils/
│   ├── regex.ts          # Expresiones regulares y utilidades base
│   └── validation.ts     # Esquemas Yup y validadores síncronos
├── hooks/
│   └── useValidation.ts  # Hooks personalizados para validación
└── pages/
    └── ValidationExample.tsx  # Página de ejemplo de uso
```

## 🚀 Uso Rápido

### 1. Validación Básica de Campo

```tsx
import { useFieldValidation } from '../hooks/useValidation';

const MyComponent = () => {
  const emailValidation = useFieldValidation('CORREO');
  
  return (
    <TextField
      value={emailValidation.value}
      onChange={(e) => emailValidation.handleChange(e.target.value)}
      onBlur={emailValidation.handleBlur}
      error={emailValidation.touched && !!emailValidation.error}
      helperText={emailValidation.error}
    />
  );
};
```

### 2. Formulario con React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registroUsuarioSchema } from '../utils/validation';

const MyForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registroUsuarioSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
    </form>
  );
};
```

### 3. Validación de Contraseñas

```tsx
import { usePasswordValidation } from '../hooks/useValidation';

const PasswordForm = () => {
  const passwordValidation = usePasswordValidation();
  
  return (
    <>
      <TextField
        type="password"
        value={passwordValidation.password}
        onChange={(e) => passwordValidation.handlePasswordChange(e.target.value)}
        error={!!passwordValidation.passwordError}
        helperText={passwordValidation.passwordError}
      />
      <TextField
        type="password"
        value={passwordValidation.confirmPassword}
        onChange={(e) => passwordValidation.handleConfirmPasswordChange(e.target.value)}
        error={!!passwordValidation.confirmError}
        helperText={passwordValidation.confirmError}
      />
    </>
  );
};
```

## 📝 Campos Soportados

| Campo | Patrón | Descripción |
|-------|---------|-------------|
| `NOMBRE_APELLIDO` | Solo letras y espacios | Debe iniciar en mayúscula, máximo 50 caracteres |
| `CORREO` | Formato email válido | Formato estándar de correo electrónico |
| `CELULAR` | 10 dígitos exactos | Exactamente 10 dígitos numéricos |
| `GENERO` | Masculino/Femenino | Solo valores específicos permitidos |
| `CONTRASENA` | Compleja | Mínimo 8 caracteres, mayúscula, número, carácter especial |
| `CURP` | Formato oficial | CURP mexicana válida |
| `RFC` | Formato con homoclave | RFC mexicano válido |
| `FILA` | Números 1-99 | Para ubicación de libros |
| `COLUMNA` | Letras A-Z | Para ubicación de libros |
| `FECHA` | YYYY-MM-DD | Formato ISO de fecha |
| `NOMBRE_LIBRO` | Texto general | Títulos, autores, editoriales |
| `UBICACION` | Dirección | Direcciones y ubicaciones |

## 🎨 Hooks Disponibles

### `useFieldValidation(pattern)`
Validación en tiempo real para un campo individual.

### `usePasswordValidation()`
Validación especializada para contraseñas con confirmación.

### `useDocumentValidation()`
Validación para documentos mexicanos (CURP + RFC).

### `useLocationValidation()`
Validación para ubicación de libros (Fila + Columna).

### `useSelectOptions(optionsKey)`
Obtiene opciones predefinidas para campos select.

## 🔧 Formateadores Automáticos

```tsx
import { formatters } from '../utils/regex';

// Formatear nombre con primera letra mayúscula
const nombreFormateado = formatters.nombreApellido('juan pérez');
// Resultado: "Juan Pérez"

// Formatear CURP a mayúsculas
const curpFormateado = formatters.curp('abcd123456hmnedf01');
// Resultado: "ABCD123456HMNEDF01"

// Formatear celular (solo números)
const celularFormateado = formatters.celular('(555) 123-4567');
// Resultado: "5551234567"
```

## 📊 Validadores Síncronos

```tsx
import { syncValidators } from '../utils/validation';

const emailError = syncValidators.validateCorreo('correo@ejemplo.com');
// Retorna null si es válido, string con error si no

const curpError = syncValidators.validateCURP('ABCD123456HMNEDF01');
// Validación inmediata sin hooks
```

## 🎯 Página de Ejemplo

Visita `/validation-example` en la aplicación para ver todos los campos en acción con validaciones en tiempo real.

## 🔄 Actualización de Validaciones

Para agregar nuevas validaciones:

1. **Agregar expresión regular** en `utils/regex.ts`:
```tsx
export const REGEX_PATTERNS = {
  // ...existentes
  NUEVO_CAMPO: /^tu-regex-aqui$/,
};

export const REGEX_ERROR_MESSAGES = {
  // ...existentes
  NUEVO_CAMPO: 'Mensaje de error descriptivo',
};
```

2. **Crear esquema Yup** en `utils/validation.ts`:
```tsx
export const baseSchemas = {
  // ...existentes
  nuevoCampo: yup.string()
    .required('Campo requerido')
    .matches(REGEX_PATTERNS.NUEVO_CAMPO, REGEX_ERROR_MESSAGES.NUEVO_CAMPO),
};
```

3. **Usar en componentes**:
```tsx
const validacion = useFieldValidation('NUEVO_CAMPO');
```

## 🎨 Ejemplo Completo

Ver el archivo `src/pages/ValidationExample.tsx` para un ejemplo completo que demuestra todas las funcionalidades del sistema de validaciones.

---

*Desarrollado para BookSmart - Sistema de validaciones robustas y reutilizables*
