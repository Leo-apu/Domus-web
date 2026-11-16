
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "b8cppc5m";
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "domus-up";

export async function uploadToCloudinary(file, folder = "domus-alquiler", onProgress = null) {
  if (!file) throw new Error("No se seleccionó ningún archivo.");
  if (!file.type.startsWith("image/")) {
    throw new Error("El archivo seleccionado debe ser una imagen (JPG, PNG, WebP).");
  }

  if (file.size > 15 * 1024 * 1024) {
    throw new Error("La imagen es demasiado pesada (máximo 15MB). Por favor elegí una imagen más liviana.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  if (folder) {
    formData.append("folder", folder);
  }

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    if (onProgress && xhr.upload) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);

          const optimizedUrl = res.secure_url.replace(
            "/upload/",
            "/upload/f_auto,q_auto/"
          );

          resolve({
            url: optimizedUrl,
            rawUrl: res.secure_url,
            publicId: res.public_id,
            width: res.width,
            height: res.height,
            format: res.format,
          });
        } catch (e) {
          reject(new Error("Error al procesar respuesta del servidor de imágenes."));
        }
      } else {
        try {
          const errData = JSON.parse(xhr.responseText);
          reject(new Error(errData?.error?.message || `Error al subir la imagen (${xhr.status}).`));
        } catch {
          reject(new Error(`Error al subir la imagen (${xhr.status}). Verifica el preset domus-up.`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Error de conexión al subir la imagen. Verifica tu conexión a internet."));
    };

    xhr.send(formData);
  });
}
