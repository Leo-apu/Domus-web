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

// ──────────────────────────────────────────────────────────────────────────────
// 📧 CORREO DE NOTIFICACIÓN
// Cambiá este valor por el email donde querés recibir los avisos de reserva.
// ──────────────────────────────────────────────────────────────────────────────
var NOTIFY_EMAIL = "apuleoc@gmail.com"; // ← Reemplazá con tu correo real

// ──────────────────────────────────────────────────────────────────────────────
// Opciones válidas del dropdown de Estado (columna I)
// ──────────────────────────────────────────────────────────────────────────────
var ESTADOS_VALIDOS = [
  "⏳ PENDIENTE",
  "✅ CONFIRMADO",
  "💰 SEÑADO",
  "🏠 CHECK-IN REALIZADO",
  "🏁 FINALIZADO",
  "❌ CANCELADO",
  "🔁 CONSULTA ADICIONAL",
];

// Colores de fondo y texto para cada estado
function getEstadoStyle(estado) {
  var styles = {
    "⏳ PENDIENTE": { bg: "#fef3c7", fg: "#b45309" }, // Amarillo
    "✅ CONFIRMADO": { bg: "#d1fae5", fg: "#065f46" }, // Verde
    "💰 SEÑADO": { bg: "#dbeafe", fg: "#1e40af" }, // Azul
    "🏠 CHECK-IN REALIZADO": { bg: "#ede9fe", fg: "#5b21b6" }, // Violeta
    "🏁 FINALIZADO": { bg: "#f3f4f6", fg: "#374151" }, // Gris
    "❌ CANCELADO": { bg: "#fee2e2", fg: "#991b1b" }, // Rojo
    "🔁 CONSULTA ADICIONAL": { bg: "#ffedd5", fg: "#9a3412" }, // Naranja
  };
  return styles[estado] || { bg: "#fef3c7", fg: "#b45309" };
}

// ──────────────────────────────────────────────────────────────────────────────
// doPost: Recibe las reservas enviadas desde la web
// ──────────────────────────────────────────────────────────────────────────────
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
    var status = "⏳ PENDIENTE";

    // Limpiar número de teléfono (solo dígitos)
    var cleanPhone = phone.toString().replace(/[^0-9]/g, "");

    // ── Construir URL de WhatsApp ───────────────────────────────────────────
    // CAUSA DEL #ERROR!: encodeURIComponent() en JS NO codifica: ( ) ! ' * ~
    // Google Sheets interpreta esos paréntesis como parte de la sintaxis de
    // =HYPERLINK(...) y rompe el parseo de la fórmula.
    // SOLUCIÓN: codificarlos manualmente con .replace() después del encode.
    var waUrl = "";
    if (cleanPhone) {
      var waMsg =
        "Hola " +
        name +
        "! Te escribo desde Domus Alquileres Jujuy " +
        "por tu consulta del " +
        checkIn +
        " al " +
        checkOut +
        " - " +
        nights +
        " noches, " +
        guests +
        " huesped/es.";

      // encodeURIComponent NO codifica: ( ) ! ' * ~
      // Los codificamos manualmente para que Sheets no rompa la fórmula HYPERLINK
      var encodedMsg = encodeURIComponent(waMsg)
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")
        .replace(/!/g, "%21")
        .replace(/'/g, "%27")
        .replace(/\*/g, "%2A")
        .replace(/~/g, "%7E");

      waUrl = "https://wa.me/" + cleanPhone + "?text=" + encodedMsg;
    }

    // ── Insertar nueva fila (columna K vacía, la fórmula se aplica abajo) ───
    // IMPORTANTE: NO meter la fórmula =HYPERLINK() dentro de appendRow().
    // Hacerlo así causa #ERROR! por cómo Sheets interpreta los strings con
    // caracteres especiales (%20, emojis, etc.) al escribirlos via API.
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
      waUrl, // URL plana por ahora; la convertimos a hyperlink clicable abajo
    ];

    sheet.appendRow(newRow);

    var lastRow = sheet.getLastRow();

    // ── Convertir columna K en hipervínculo clicable ────────────────────────
    // Usamos setFormula() directo en la celda (no en appendRow) para evitar #ERROR!
    if (waUrl) {
      // Sanitizar el nombre para que no rompa las comillas de la fórmula
      var safeName = name.replace(/"/g, "'");
      sheet
        .getRange(lastRow, 11)
        .setFormula(
          '=HYPERLINK("' + waUrl + '";"📲 WhatsApp ' + safeName + '")',
        );
    } else {
      sheet.getRange(lastRow, 11).setValue("Sin número válido");
    }

    // ── Dropdown de Estado en columna I ────────────────────────────────────
    var estadoCell = sheet.getRange(lastRow, 9);
    var dropdownRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(ESTADOS_VALIDOS, true) // true = mostrar flecha de lista
      .setAllowInvalid(false)
      .setHelpText("Seleccioná el estado actual de esta reserva")
      .build();
    estadoCell.setDataValidation(dropdownRule);

    // ── Color según el estado actual ───────────────────────────────────────
    var style = getEstadoStyle(status);
    estadoCell
      .setBackground(style.bg)
      .setFontColor(style.fg)
      .setFontWeight("bold");

    // ── Notificación por correo al anfitrión ───────────────────────────────
    // Usa NOTIFY_EMAIL (definido arriba). Session.getActiveUser() devuelve vacío
    // cuando el script está publicado como "Cualquier persona", por eso usamos
    // el email fijo configurado manualmente.
    try {
      if (NOTIFY_EMAIL && NOTIFY_EMAIL !== "TU_EMAIL@gmail.com") {
        MailApp.sendEmail({
          to: NOTIFY_EMAIL,
          subject:
            "🛎️ Nueva Solicitud de Reserva: " +
            name +
            " (" +
            nights +
            " noches)",
          body:
            "Has recibido una nueva solicitud en Domus Alquileres Jujuy:\n\n" +
            "👤 Huésped: " +
            name +
            "\n" +
            "📱 WhatsApp: " +
            phone +
            "\n" +
            "📧 Email: " +
            email +
            "\n" +
            "📅 Fechas: " +
            checkIn +
            " al " +
            checkOut +
            " (" +
            nights +
            " noches)\n" +
            "👥 Huéspedes: " +
            guests +
            "\n" +
            "📝 Notas: " +
            notes +
            "\n\n" +
            "WhatsApp directo: " +
            (waUrl || "sin número") +
            "\n\n" +
            "Revisá la hoja de cálculo para confirmar o rechazar la solicitud.",
        });
      } else {
        Logger.log(
          "⚠️ Email no enviado: configurá NOTIFY_EMAIL con tu correo real.",
        );
      }
    } catch (mailError) {
      Logger.log("No se pudo enviar notificación por email: " + mailError);
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Solicitud registrada exitosamente.",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// doGet: Endpoint de disponibilidad + verificación de webhook activo
//
// Sin parámetros  → responde { status: "online" }
// Con ?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD
//   → consulta la planilla y responde:
//     { available: true }  si las fechas están libres
//     { available: false, reason: "..." } si hay solapamiento con reserva activa
// ──────────────────────────────────────────────────────────────────────────────
function doGet(e) {
  // Estados que bloquean disponibilidad (PENDIENTE y CANCELADO no bloquean)
  var ESTADOS_OCUPADO = ["✅ CONFIRMADO", "💰 SEÑADO", "🏠 CHECK-IN REALIZADO"];

  var checkIn = e.parameter && e.parameter.checkIn ? e.parameter.checkIn : null;
  var checkOut =
    e.parameter && e.parameter.checkOut ? e.parameter.checkOut : null;

  // Sin fechas → solo verificar que el webhook está activo
  if (!checkIn || !checkOut) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "online",
        service: "Domus Alquileres - Webhook Activo ✅",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    var reqIn = new Date(checkIn);
    var reqOut = new Date(checkOut);

    // Columnas (índice 0): A=0 B=1 C=2 D=3 E=checkIn=4 F=checkOut=5 I=estado=8
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var estado = (row[8] || "").toString().trim();
      var rowIn = row[4] ? new Date(row[4]) : null;
      var rowOut = row[5] ? new Date(row[5]) : null;

      // Solo analizar filas con estado que bloquea disponibilidad
      if (ESTADOS_OCUPADO.indexOf(estado) === -1) continue;
      if (!rowIn || !rowOut) continue;

      // Hay solapamiento si: reqIn < rowOut  Y  reqOut > rowIn
      if (reqIn < rowOut && reqOut > rowIn) {
        // Formatear las fechas del conflicto en dd/MM/yyyy para mostrarlas al usuario
        var fmt = function(d) {
          var dd   = ("0" + d.getDate()).slice(-2);
          var mm   = ("0" + (d.getMonth() + 1)).slice(-2);
          var yyyy = d.getFullYear();
          return dd + "/" + mm + "/" + yyyy;
        };

        return ContentService.createTextOutput(
          JSON.stringify({
            available: false,
            conflictIn:  fmt(rowIn),
            conflictOut: fmt(rowOut),
          }),
        ).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Ninguna reserva activa se superpone → disponible
    return ContentService.createTextOutput(
      JSON.stringify({ available: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ available: null, error: err.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// aplicarDropdownsExistentes:
// Ejecutar MANUALMENTE desde Apps Script (Ejecutar > aplicarDropdownsExistentes)
// para poner el dropdown de Estado en las filas que ya existen en la planilla.
// Solo necesitás ejecutarlo UNA SOLA VEZ para corregir filas viejas.
// ──────────────────────────────────────────────────────────────────────────────
function aplicarDropdownsExistentes() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    Logger.log("No hay filas de datos aún (solo encabezados).");
    return;
  }

  var dropdownRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(ESTADOS_VALIDOS, true)
    .setAllowInvalid(false)
    .setHelpText("Seleccioná el estado actual de esta reserva")
    .build();

  // Aplica el dropdown a todas las celdas I2:I<lastRow>
  sheet.getRange(2, 9, lastRow - 1, 1).setDataValidation(dropdownRule);

  Logger.log(
    "✅ Dropdowns aplicados en " + (lastRow - 1) + " fila(s) existentes.",
  );
}
