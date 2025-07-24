import { useAppStore } from '../store/appStore';

/**
 * Hook personalizado para manejar notificaciones automáticas en requests
 * Proporciona funciones helper para mostrar notificaciones basadas en códigos de respuesta
 */
export const useAutoNotification = () => {
  const { showSuccessNotification, showErrorNotification } = useAppStore();

  /**
   * Maneja la respuesta de una petición HTTP y muestra la notificación apropiada
   * @param response - Response object o código de estado
   * @param successTitle - Título para notificación de éxito
   * @param successMessage - Mensaje para notificación de éxito
   * @param errorTitle - Título para notificación de error (opcional)
   * @param errorMessage - Mensaje para notificación de error (opcional)
   */
  const handleResponse = (
    statusCode: number,
    successTitle: string,
    successMessage: string,
    errorTitle: string = 'Error en la operación',
    errorMessage?: string,
    errorDetails?: Record<string, string>
  ) => {
    if (statusCode >= 200 && statusCode < 300) {
      // Códigos 2xx = Éxito
      showSuccessNotification(successTitle, successMessage);
    } else {
      // Cualquier otro código = Error
      showErrorNotification(
        errorTitle,
        errorMessage || `Error ${statusCode}: No se pudo completar la operación`,
        errorDetails
      );
    }
  };

  /**
   * Wrapper para async functions que maneja automáticamente las notificaciones
   * @param asyncFn - Función asíncrona a ejecutar
   * @param successTitle - Título para notificación de éxito
   * @param successMessage - Mensaje para notificación de éxito
   * @param errorTitle - Título para notificación de error
   */
  const withAutoNotification = async (
    asyncFn: () => Promise<any>,
    successTitle: string,
    successMessage: string,
    errorTitle: string = 'Error en la operación'
  ) => {
    try {
      const result = await asyncFn();
      showSuccessNotification(successTitle, successMessage);
      return result;
    } catch (error: any) {
      showErrorNotification(
        errorTitle,
        error.message || 'Ha ocurrido un error inesperado',
        error.details || undefined
      );
      throw error;
    }
  };

  /**
   * Muestra una notificación de éxito (código 200)
   */
  const notifySuccess = (title: string, message: string, buttonText?: string) => {
    showSuccessNotification(title, message, buttonText);
  };

  /**
   * Muestra una notificación de error (cualquier código != 200)
   */
  const notifyError = (
    title: string,
    message: string,
    details?: Record<string, string>,
    buttonText?: string
  ) => {
    showErrorNotification(title, message, details, buttonText);
  };

  return {
    handleResponse,
    withAutoNotification,
    notifySuccess,
    notifyError,
  };
};
