/**
 * Attendance Storage Service - Uses dedicated 'attendanceintern' bucket
 * Handles photo uploads for clock-in/clock-out
 */

const STORAGE_BASE_URL = "https://storage.bijokdev.com";
const API_KEY = "my-secret-key-123";
const BUCKET_NAME = "attendanceintern";

/**
 * Upload attendance photo
 * @param {Blob} blob - The image blob from camera capture
 * @param {string} type - 'clockin' or 'clockout'
 * @param {string} studentId - Student ID for filename
 * @returns {Promise<Object>}
 */
export async function uploadAttendancePhoto(blob, type, studentId) {
  try {
    const timestamp = Date.now();
    const filename = `${type}_${studentId}_${timestamp}.jpg`;

    // Convert blob to file
    const file = new File([blob], filename, { type: "image/jpeg" });

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
              const fullUrl = `${STORAGE_BASE_URL}${response.file.url}`;
              resolve({
                success: true,
                url: fullUrl,
                filename: response.file.filename,
              });
            } else {
              reject(new Error(response.error || "Upload failed"));
            }
          } catch (e) {
            reject(new Error("Failed to parse response"));
          }
        } else {
          reject(new Error(`Upload failed: ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", () => reject(new Error("Network error")));
      xhr.open("PUT", `${STORAGE_BASE_URL}/upload/${BUCKET_NAME}`);
      xhr.setRequestHeader("x-api-key", API_KEY);
      xhr.setRequestHeader("Content-Type", "application/octet-stream");
      xhr.send(file);
    });
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Upload leave attachment (MC/Other)
 * @param {File} file - The file object
 * @param {string} type - 'leave_MC' or 'leave_AL'
 * @param {string} studentId - Student ID
 * @returns {Promise<Object>}
 */
export async function uploadLeaveAttachment(file, type, studentId) {
  try {
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const filename = `${type}_${studentId}_${timestamp}.${extension}`;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
              const fullUrl = `${STORAGE_BASE_URL}${response.file.url}`;
              resolve({
                success: true,
                url: fullUrl,
                filename: response.file.filename,
              });
            } else {
              reject(new Error(response.error || "Upload failed"));
            }
          } catch (e) {
            reject(new Error("Failed to parse response"));
          }
        } else {
          reject(new Error(`Upload failed: ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", () => reject(new Error("Network error")));
      xhr.open("PUT", `${STORAGE_BASE_URL}/upload/${BUCKET_NAME}`);
      xhr.setRequestHeader("x-api-key", API_KEY);
      xhr.setRequestHeader(
        "Content-Type",
        file.type || "application/octet-stream",
      ); // Use actual file type
      xhr.send(file);
    });
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export default { uploadAttendancePhoto, uploadLeaveAttachment };
