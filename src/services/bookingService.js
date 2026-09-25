import { APARTMENT_INFO } from '../data/apartmentData';

/**
 * Servicio para registrar solicitudes de reserva en Google Sheets
 */
export async function submitBookingToGoogleSheets(bookingData) {
  const webhookUrl = APARTMENT_INFO.googleSheetsWebhookUrl;

  // Si no hay URL configurada aún en .env, simulamos para pruebas locales
  if (!webhookUrl || webhookUrl.includes('TU_CODIGO_AQUI') || webhookUrl.trim() === '') {
    console.info(
      'ℹ️ [MODO DEMO GOOGLE SHEETS]: Solicitud procesada localmente. Para guardar en tu hoja real, configura VITE_GOOGLE_SHEETS_WEBHOOK_URL en tu archivo .env.',
      bookingData
    );
    // Simular latencia de red de 900ms
    await new Promise((resolve) => setTimeout(resolve, 900));
    return {
      success: true,
      mode: 'demo',
      message: 'Solicitud registrada en modo de prueba. Configura tu Google Sheet para recibirla en tu planilla.',
    };
  }

  try {
    // Google Apps Script requiere text/plain o no-cors para evitar preflight OPTIONS bloqueados
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(bookingData),
    });

    return {
      success: true,
      mode: 'live',
      message: 'Solicitud enviada correctamente a tu Google Sheet.',
    };
  } catch (error) {
    console.error('Error al enviar solicitud a Google Sheets:', error);
    throw error;
  }
}
