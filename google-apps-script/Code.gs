/**
 * GOOGLE APPS SCRIPT PARA DOMUS ALQUILERES TEMPORARIOS (MULTI-DEPARTAMENTO DINÁMICO)
 *
 * Versión 3.0 - Optimizada para el Panel de Control Administrador (Admin CMS)
 *
 * Mejoras aplicadas:
 * 1. Soporte dinámico para N departamentos (no sólo Gorriti o Suite).
 * 2. Normalización de fechas: siempre consistente en formato DD/MM/YYYY.
 * 3. Parser robusto de fechas (evita errores con formatos ISO YYYY-MM-DD o DD/MM/YYYY).
 * 4. Manejo inteligente de Columna M ("Hora solicitud") si existe en la hoja.
 * 5. Sanitización de enlaces directos a WhatsApp para responder al huésped.
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
 *    L1: Responder WhatsApp (Nota: corregir la 's' de más si decía 'WhastApp')
 *    M1: [OPCIONAL] Hora solicitud (si la dejas, el script la llenará automáticamente)
 *
 * 2. En la hoja de cálculo, ve a: Extensiones > Apps Script.
 * 3. Reemplaza todo el código por este archivo completo.
 * 4. Haz clic en "Implementar" > "Gestionar implementaciones" > lápiz (editar) >
 *    Versión: "Nueva versión" > Implementar.
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

/**
 * Normaliza cualquier formato de fecha a DD/MM/YYYY
 */
function normalizeDateStr(val) {
  if (!val) return "";
  if (val instanceof Date) {
    var d = ("0" + val.getDate()).slice(-2);
    var m = ("0" + (val.getMonth() + 1)).slice(-2);
    var y = val.getFullYear();
    return d + "/" + m + "/" + y;
  }
  var str = val.toString().trim();
  // Formato YYYY-MM-DD -> DD/MM/YYYY
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(str)) {
    var parts = str.split("-");
    var day = ("0" + parts[2]).slice(-2);
    var month = ("0" + parts[1]).slice(-2);
    return day + "/" + month + "/" + parts[0];
  }
  return str;
}

/**
 * Parsea una celda de fecha con total tolerancia a DD/MM/YYYY, ISO o Date nativo
 */
function parseDateRobust(val) {
  if (!val) return null;
  if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
  var str = val.toString().trim();
  // DD/MM/YYYY
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str)) {
    var p = str.split("/");
    return new Date(parseInt(p[2], 10), parseInt(p[1], 10) - 1, parseInt(p[0], 10));
  }
  // YYYY-MM-DD
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(str)) {
    var p2 = str.split("-");
    return new Date(parseInt(p2[0], 10), parseInt(p2[1], 10) - 1, parseInt(p2[2], 10));
  }
  var d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

// ──────────────────────────────────────────────────────────────────────────────
// doPost: Registra la reserva en Google Sheets
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
    // Soporte 100% dinámico para cualquier departamento registrado en el Admin CMS
    var departamento =
      data.departamento ||
      data.apartmentName ||
      data.apartmentTitle ||
      (data.apartmentId === "domus-suite"
        ? "Domus Suite - Av. Párroco Marshke"
        : data.apartmentId === "domus-centro"
        ? "Domus Gorriti - 3 Ambientes"
        : data.apartmentId || "Departamento Domus");

    var name = data.name || "Sin nombre";
    var phone = data.phone || "Sin teléfono";
    var email = data.email || "Sin email";
    var checkInRaw = data.checkIn || "";
    var checkOutRaw = data.checkOut || "";
    var checkIn = normalizeDateStr(checkInRaw);
    var checkOut = normalizeDateStr(checkOutRaw);
    var nights = data.nights || 1;
    var guests = data.guests || 2;
    var notes = data.notes || "";
    var status = "⏳ PENDIENTE";

    var cleanPhone = phone.toString().replace(/[^0-9]/g, "");

    // ── Enlace personalizado de WhatsApp ────────────────────────────────────
    var waUrl = "";
    if (cleanPhone && cleanPhone.length >= 8) {
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

    // ── Fila de datos estándar (12 columnas) ──
    var newRow = [
      timestamp,       // Columna A (Fecha y Hora)
      departamento,    // Columna B
      name,            // Columna C
      phone,           // Columna D
      email,           // Columna E
      checkIn,         // Columna F (DD/MM/YYYY)
      checkOut,        // Columna G (DD/MM/YYYY)
      nights,          // Columna H
      guests,          // Columna I
      status,          // Columna J
      notes,           // Columna K
      waUrl,           // Columna L
    ];

    // Si la hoja tiene Columna M ("Hora solicitud"), la completamos para evitar que quede vacía
    var lastCol = sheet.getLastColumn();
    if (lastCol >= 13) {
      var headerM = sheet.getRange(1, 13).getValue();
      if (headerM && headerM.toString().toLowerCase().indexOf("hora") !== -1) {
        var horaStr = Utilities.formatDate(timestamp, "America/Argentina/Jujuy", "HH:mm:ss");
        newRow.push(horaStr);
      }
    }

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
      sheet.getRange(lastRow, 12).setValue(phone.indexOf("WhatsApp") !== -1 ? "Lead por Web" : "Sin número válido");
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
            (waUrl ? "📲 Responder directo por WhatsApp: " + waUrl + "\n\n" : "") +
            "Podés gestionar los estados y confirmaciones directamente en tu Google Sheet.",
        });
      }
    } catch (mailError) {
      Logger.log("Error al enviar email: " + mailError.toString());
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        row: lastRow,
        departamento: departamento,
        message: "Reserva registrada exitosamente en Google Sheets",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("Error en doPost: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// doGet: Disponibilidad INDEPENDIENTE y DINÁMICA por cada departamento
// ──────────────────────────────────────────────────────────────────────────────
function doGet(e) {
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
        service: "Domus Alquileres - Webhook Activo Multi-Depto v3.0 ✅",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    var reqIn = parseDateRobust(checkIn);
    var reqOut = parseDateRobust(checkOut);

    if (!reqIn || !reqOut) {
      return ContentService.createTextOutput(
        JSON.stringify({ available: true, note: "Fechas no parseables" }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    for (var i = 1; i < data.length; i++) {
      var row = data[i];

      var rowDept = "";
      var rowIn = null;
      var rowOut = null;
      var estado = "";

      if (row.length >= 10) {
        rowDept = (row[1] || "").toString().toLowerCase().trim();
        rowIn = parseDateRobust(row[5]);
        rowOut = parseDateRobust(row[6]);
        estado = (row[9] || "").toString().trim();
      }

      if (ESTADOS_OCUPADO.indexOf(estado) === -1) continue;
      if (!rowIn || !rowOut) continue;

      // FILTRADO DINÁMICO POR DEPARTAMENTO:
      if (reqApartment && rowDept) {
        var cleanReq = reqApartment.replace(/domus/g, "").replace(/[^a-z0-9]/g, "");
        var cleanRow = rowDept.replace(/domus/g, "").replace(/[^a-z0-9]/g, "");

        var matches = false;
        var words = reqApartment.split(/[\s\-_]+/);
        for (var w = 0; w < words.length; w++) {
          var word = words[w].replace(/[^a-z0-9]/g, "");
          if (word.length >= 3 && word !== "domus" && cleanRow.indexOf(word) !== -1) {
            matches = true;
            break;
          }
        }
        if (!matches && cleanReq && cleanRow && cleanReq !== cleanRow) {
          continue; // Pertenecen a departamentos distintos, no hay colisión
        }
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
            departamento: row[1],
            conflictIn: fmt(rowIn),
            conflictOut: fmt(rowOut),
            status: estado,
          }),
        ).setMimeType(ContentService.MimeType.JSON);
      }
    }

    return ContentService.createTextOutput(
      JSON.stringify({ available: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("Error en doGet: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ available: true, error: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// onEdit: Actualiza los colores de estado automáticamente al editar en la hoja
// ──────────────────────────────────────────────────────────────────────────────
function onEdit(e) {
  var range = e.range;
  var col = range.getColumn();
  var row = range.getRow();

  if (row <= 1) return; // Ignora los encabezados

  // Columna J = 10 (Estado)
  if (col === 10) {
    var val = range.getValue().toString().trim();
    var style = getEstadoStyle(val);
    range.setBackground(style.bg).setFontColor(style.fg).setFontWeight("bold");
  }
}
