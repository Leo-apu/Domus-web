/**
 * GOOGLE APPS SCRIPT PARA DOMUS ALQUILERES TEMPORARIOS (MULTI-DEPARTAMENTO)
 *
 * Este script recibe las solicitudes de reserva desde la web, las registra
 * en Google Sheets identificando exactamente el departamento reservado,
 * y verifica la disponibilidad de forma independiente para cada unidad.
 *
 * ──────────────────────────────────────────────────────────────────────────────
 * INSTRUCCIONES DE INSTALACIÓN / ACTUALIZACIÓN:
 * 1. En tu hoja de cálculo "Domus - Reservas", coloca estos 12 encabezados en la Fila 1:
 *    A1: Fecha Solicitud
 *    B1: Departamento
 *    C1: Nombre
 *    D1: WhatsApp
 *    E1: Email
 *    F1: Check-in
 *    G1: Check-out
 *    H1: Noches
 *    I1: Huéspedes
 *    J1: Estado
 *    K1: Notas
 *    L1: Responder WhatsApp
 *
 * 2. En la hoja de cálculo, ve a: Extensiones > Apps Script.
 * 3. Reemplaza todo el código por este archivo completo.
 * 4. Haz clic en "Implementar" > "Gestionar implementaciones" > lápiz (editar) >
 *    Versión: "Nueva versión" > Implementar.
 * 5. Si es la primera vez que implementas:
 *    "Nueva implementación" > Tipo: "Aplicación web" > Ejecutar como: "Yo" >
 *    Quién tiene acceso: "Cualquier persona" (Anyone) > Copiar URL /exec y pegar en .env:
 *    VITE_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/TU_CODIGO/exec
 * ──────────────────────────────────────────────────────────────────────────────
 */

// ──────────────────────────────────────────────────────────────────────────────
// 📧 CORREO DE NOTIFICACIÓN AL ANFITRIÓN
// ──────────────────────────────────────────────────────────────────────────────
var NOTIFY_EMAIL = "apuleoc@gmail.com"; // ← Tu correo donde recibirás los avisos

// ──────────────────────────────────────────────────────────────────────────────
// Opciones válidas del dropdown de Estado (Columna J)
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

// Colores según el estado
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
// doPost: Registra la reserva en Google Sheets con la columna "Departamento"
// ──────────────────────────────────────────────────────────────────────────────
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    var timestamp = new Date();
    // Departamento seleccionado por el huésped en la web
    var departamento =
      data.departamento ||
      data.apartmentName ||
      (data.apartmentId === "domus-suite"
        ? "Domus Suite - Av. Párroco Marshke"
        : "Domus Gorriti - 3 Ambientes");

    var name = data.name || "Sin nombre";
    var phone = data.phone || "Sin teléfono";
    var email = data.email || "Sin email";
    var checkIn = data.checkIn || "";
    var checkOut = data.checkOut || "";
    var nights = data.nights || 1;
    var guests = data.guests || 2;
    var notes = data.notes || "";
    var status = "⏳ PENDIENTE";

    var cleanPhone = phone.toString().replace(/[^0-9]/g, "");

    // ── Enlace personalizado de WhatsApp ────────────────────────────────────
    var waUrl = "";
    if (cleanPhone) {
      var waMsg =
        "Hola " +
        name +
        "! Te escribo desde Domus Alquileres Jujuy " +
        "por tu consulta para el departamento: " +
        departamento +
        ", con fecha del " +
        checkIn +
        " al " +
        checkOut +
        " (" +
        nights +
        " noches, " +
        guests +
        " personas).";

      var encodedMsg = encodeURIComponent(waMsg)
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")
        .replace(/!/g, "%21")
        .replace(/'/g, "%27")
        .replace(/\*/g, "%2A")
        .replace(/~/g, "%7E");

      waUrl = "https://wa.me/" + cleanPhone + "?text=" + encodedMsg;
    }

    // ── Fila de datos (12 columnas: B = Departamento, J = Estado, L = WhatsApp) ──
    var newRow = [
      timestamp,
      departamento, // Columna B
      name,         // Columna C
      phone,        // Columna D
      email,        // Columna E
      checkIn,      // Columna F
      checkOut,     // Columna G
      nights,       // Columna H
      guests,       // Columna I
      status,       // Columna J
      notes,        // Columna K
      waUrl,        // Columna L
    ];

    sheet.appendRow(newRow);
    var lastRow = sheet.getLastRow();

    // ── Celda de WhatsApp clicable (Columna L = 12) ──
    if (waUrl) {
      var safeName = name.replace(/"/g, "'");
      sheet
        .getRange(lastRow, 12)
        .setFormula(
          '=HYPERLINK("' + waUrl + '";"📲 WhatsApp ' + safeName + '")',
        );
    } else {
      sheet.getRange(lastRow, 12).setValue("Sin número válido");
    }

    // ── Dropdown de Estado (Columna J = 10) ──
    var estadoCell = sheet.getRange(lastRow, 10);
    var dropdownRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(ESTADOS_VALIDOS, true)
      .setAllowInvalid(false)
      .setHelpText("Seleccioná el estado actual de esta reserva")
      .build();
    estadoCell.setDataValidation(dropdownRule);

    var style = getEstadoStyle(status);
    estadoCell
      .setBackground(style.bg)
      .setFontColor(style.fg)
      .setFontWeight("bold");

    // ── Notificación por correo con detalle del departamento ──
    try {
      if (NOTIFY_EMAIL && NOTIFY_EMAIL !== "TU_EMAIL@gmail.com") {
        MailApp.sendEmail({
          to: NOTIFY_EMAIL,
          subject:
            "🛎️ Reserva: " +
            departamento +
            " - " +
            name +
            " (" +
            nights +
            " noches)",
          body:
            "Has recibido una nueva solicitud en Domus Alquileres Jujuy:\n\n" +
            "🏢 DEPARTAMENTO: " +
            departamento +
            "\n" +
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
      }
    } catch (mailError) {
      Logger.log("No se pudo enviar notificación por email: " + mailError);
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        departamento: departamento,
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
// doGet: Disponibilidad INDEPENDIENTE por cada departamento
//
// Parámetros:
//   ?checkIn=YYYY-MM-DD & checkOut=YYYY-MM-DD & apartmentId=domus-gorriti
//
// Revisa si las fechas solicitadas están ocupadas SOLO para ESE departamento.
// Si "Domus Gorriti" está reservado, "Domus Suite" sigue disponible.
// ──────────────────────────────────────────────────────────────────────────────
function doGet(e) {
  // Estados que bloquean el calendario
  var ESTADOS_OCUPADO = ["✅ CONFIRMADO", "💰 SEÑADO", "🏠 CHECK-IN REALIZADO"];

  var checkIn = e.parameter && e.parameter.checkIn ? e.parameter.checkIn : null;
  var checkOut =
    e.parameter && e.parameter.checkOut ? e.parameter.checkOut : null;
  var reqApartment =
    e.parameter && (e.parameter.apartmentId || e.parameter.departamento)
      ? (e.parameter.apartmentId || e.parameter.departamento).toLowerCase().trim()
      : "";

  if (!checkIn || !checkOut) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "online",
        service: "Domus Alquileres - Webhook Activo Multi-Depto ✅",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    var reqIn = new Date(checkIn);
    var reqOut = new Date(checkOut);

    // Formato con 12 columnas:
    // A(0)=Timestamp, B(1)=Departamento, C(2)=Nombre, F(5)=CheckIn, G(6)=CheckOut, J(9)=Estado
    for (var i = 1; i < data.length; i++) {
      var row = data[i];

      // Detección inteligente de columnas (por si la hoja tiene 11 o 12 columnas)
      var rowDept = "";
      var rowIn = null;
      var rowOut = null;
      var estado = "";

      if (row.length >= 12) {
        rowDept = (row[1] || "").toString().toLowerCase().trim();
        rowIn = row[5] ? new Date(row[5]) : null;
        rowOut = row[6] ? new Date(row[6]) : null;
        estado = (row[9] || "").toString().trim();
      } else {
        // Compatibilidad con plantilla anterior de 11 columnas
        rowIn = row[4] ? new Date(row[4]) : null;
        rowOut = row[5] ? new Date(row[5]) : null;
        estado = (row[8] || "").toString().trim();
      }

      if (ESTADOS_OCUPADO.indexOf(estado) === -1) continue;
      if (!rowIn || !rowOut) continue;

      // FILTRADO POR DEPARTAMENTO:
      // Si consultamos por Domus Gorriti, solo chocamos con reservas de Domus Gorriti.
      if (reqApartment && rowDept) {
        var isGorritiReq =
          reqApartment.indexOf("gorriti") !== -1 ||
          reqApartment.indexOf("centro") !== -1;
        var isGorritiRow =
          rowDept.indexOf("gorriti") !== -1 ||
          rowDept.indexOf("centro") !== -1;

        var isSuiteReq =
          reqApartment.indexOf("suite") !== -1 ||
          reqApartment.indexOf("marshke") !== -1;
        var isSuiteRow =
          rowDept.indexOf("suite") !== -1 ||
          rowDept.indexOf("marshke") !== -1;

        if (isGorritiReq && !isGorritiRow) continue; // No es el mismo depto
        if (isSuiteReq && !isSuiteRow) continue;     // No es el mismo depto
      }

      // Solapamiento de fechas: reqIn < rowOut Y reqOut > rowIn
      if (reqIn < rowOut && reqOut > rowIn) {
        var fmt = function (d) {
          var dd = ("0" + d.getDate()).slice(-2);
          var mm = ("0" + (d.getMonth() + 1)).slice(-2);
          var yyyy = d.getFullYear();
          return dd + "/" + mm + "/" + yyyy;
        };

        return ContentService.createTextOutput(
          JSON.stringify({
            available: false,
            apartment: rowDept || reqApartment,
            conflictIn: fmt(rowIn),
            conflictOut: fmt(rowOut),
          }),
        ).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Fechas disponibles para este departamento
    return ContentService.createTextOutput(
      JSON.stringify({ available: true, apartment: reqApartment }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ available: null, error: err.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// aplicarDropdownsExistentes:
// Ejecutar manualmente desde Apps Script si deseas actualizar filas viejas
// ──────────────────────────────────────────────────────────────────────────────
function aplicarDropdownsExistentes() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    Logger.log("No hay filas de datos aún.");
    return;
  }

  var dropdownRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(ESTADOS_VALIDOS, true)
    .setAllowInvalid(false)
    .setHelpText("Seleccioná el estado actual de esta reserva")
    .build();

  // Aplica el dropdown a la columna J (columna 10)
  sheet.getRange(2, 10, lastRow - 1, 1).setDataValidation(dropdownRule);
  Logger.log("✅ Dropdowns aplicados a la columna de Estado.");
}
