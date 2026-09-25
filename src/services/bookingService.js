import { APARTMENT_INFO } from "../data/apartmentData";

export async function checkAvailability(checkIn, checkOut) {
  const webhookUrl = APARTMENT_INFO.googleSheetsWebhookUrl;

  if (
    !webhookUrl ||
    webhookUrl.includes("TU_CODIGO_AQUI") ||
    webhookUrl.trim() === ""
  ) {
    return { available: null };
  }

  if (!checkIn || !checkOut) return { available: null };

  try {
    const url = `${webhookUrl}?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`;
    const res = await fetch(url, { method: "GET" });

    if (!res.ok) return { available: null };

    const json = await res.json();
    return json;
  } catch {
    return { available: null };
  }
}

export async function submitBookingToGoogleSheets(bookingData) {
  const webhookUrl = APARTMENT_INFO.googleSheetsWebhookUrl;

  if (
    !webhookUrl ||
    webhookUrl.includes("TU_CODIGO_AQUI") ||
    webhookUrl.trim() === ""
  ) {
    console.info(
      "ℹ️ [MODO DEMO GOOGLE SHEETS]: Solicitud procesada localmente. Para guardar en tu hoja real, configura VITE_GOOGLE_SHEETS_WEBHOOK_URL en tu archivo .env.",
      bookingData,
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      mode: "demo",
      message:
        "Solicitud registrada en modo de prueba. Configura tu Google Sheet para recibirla en tu planilla.",
    };
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(bookingData),
    });

    return {
      success: true,
      mode: "live",
      message: "Solicitud enviada correctamente a tu Google Sheet.",
    };
  } catch (error) {
    console.error("Error al enviar solicitud a Google Sheets:", error);
    throw error;
  }
}
