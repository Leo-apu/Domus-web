/**
 * GOOGLE APPS SCRIPT PARA DOMUS ALQUILERES TEMPORARIOS
 * 
 * Este script recibe las solicitudes de reserva desde la web y las registra
 * automáticamente en tu Google Sheet en tiempo real.
 * 
 * INSTRUCCIONES DE INSTALACIÓN:
 * 1. Crea una hoja de cálculo en Google Drive llamada "Domus - Reservas".
 * 2. En la Fila 1, coloca estos encabezados:
 *    A1: Fecha Solicitud | B1: Nombre | C1: WhatsApp | D1: Email | E1: Check-in | F1: Check-out | G1: Noches | H1: Huéspedes | I1: Estado | J1: Notas | K1: Responder WhatsApp
 * 3. En la hoja de cálculo, ve a: Extensiones > Apps Script.
 * 4. Borra todo el código que aparezca y pega este archivo completo.
 * 5. Haz clic en "Implementar" (botón azul arriba a la derecha) > "Nueva implementación".
 * 6. Tipo: "Aplicación web".
 * 7. Ejecutar como: "Yo (tu cuenta de Google)".
 * 8. Quién tiene acceso: "Cualquier persona" (Anyone).
 * 9. Haz clic en "Implementar" y copia la URL que te genera (termina en /exec).
 * 10. Pega esa URL en tu archivo .env:
 *     VITE_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/TU_CODIGO_AQUI/exec
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Evita escrituras concurrentes conflictivas

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parsear los datos recibidos desde la web en JSON
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    var timestamp = new Date();
    var name = data.name || "Sin nombre";
    var phone = data.phone || "Sin teléfono";
    var email = data.email || "Sin email";
    var checkIn = data.checkIn || "";
    var checkOut = data.checkOut || "";
    var nights = data.nights || 1;
    var guests = data.guests || 2;
    var notes = data.notes || "";
    var status = "PENDIENTE";

    // Limpiar número de teléfono para enlace de WhatsApp (remover espacios, guiones, etc.)
    var cleanPhone = phone.toString().replace(/[^0-9]/g, "");

    // Mensaje prearmado para responderle al cliente con un clic desde el Sheet
    var waMessage = encodeURIComponent(
      "¡Hola " + name + "! Te escribo desde Domus Alquileres Jujuy. Vimos tu solicitud de estadía del " +
      checkIn + " al " + checkOut + " (" + nights + " noches para " + guests + " personas). " +
      "¡Las fechas están disponibles! ¿Te gustaría que te pasemos los datos para señar y asegurar tu reserva?"
    );
    
    var waLinkFormula = cleanPhone 
      ? '=HYPERLINK("https://wa.me/' + cleanPhone + '?text=' + waMessage + '", "📲 Responder por WhatsApp")'
      : "Sin número válido";

    // Insertar nueva fila
    var newRow = [
      timestamp,
      name,
      phone,
      email,
      checkIn,
      checkOut,
      nights,
      guests,
      status,
      notes,
      waLinkFormula
    ];

    sheet.appendRow(newRow);

    // Formatear la última fila con color suave para estado PENDIENTE
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 9).setBackground("#fef3c7").setFontColor("#b45309").setFontWeight("bold");

    // (Opcional) Notificación por correo al anfitrión
    try {
      var notifyEmail = Session.getActiveUser().getEmail();
      if (notifyEmail) {
        MailApp.sendEmail({
          to: notifyEmail,
          subject: "🛎️ Nueva Solicitud de Reserva: " + name + " (" + nights + " noches)",
          body: "Has recibido una nueva solicitud de reserva en Domus Alquileres Jujuy:\n\n" +
                "👤 Huésped: " + name + "\n" +
                "📱 WhatsApp: " + phone + "\n" +
                "📧 Email: " + email + "\n" +
                "📅 Fechas: " + checkIn + " al " + checkOut + " (" + nights + " noches)\n" +
                "👥 Huéspedes: " + guests + "\n" +
                "📝 Notas: " + notes + "\n\n" +
                "Revisa la hoja de cálculo para verificar disponibilidad y responderle al huésped."
        });
      }
    } catch (mailError) {
      Logger.log("No se pudo enviar notificación por email: " + mailError);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Solicitud registrada exitosamente en Google Sheets."
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "Domus Alquileres - Webhook Google Sheets Activo"
  })).setMimeType(ContentService.MimeType.JSON);
}
