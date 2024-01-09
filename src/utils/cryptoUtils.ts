import CryptoJS from "crypto-js";

const base64Key = process.env.VITE_KEY;
const base64Iv = process.env.VITE_IV;

/**
 * Encrypts an object using AES encryption with a Base64 encoded key and IV.
 * @param {Object} data - The object to be encrypted.
 * @param {string} base64Key - The Base64 encoded secret key for AES encryption.
 * @param {string} base64Iv - The Base64 encoded initialization vector.
 * @returns {string} The encrypted text.
 */
export const encryptObjectWithAES = (
  data: any,
  disableEncryption?: boolean
) => {
  if (disableEncryption) {
    return data;
  } else {
    if (base64Iv && base64Key) {
      const key = CryptoJS.enc.Base64.parse(base64Key);
      const iv = CryptoJS.enc.Base64.parse(base64Iv);
      const stringData = JSON.stringify(data);
      const encrypted = CryptoJS.AES.encrypt(stringData, key, { iv: iv });
      return encrypted.toString();
    }
    console.error("No secret key and IV");
    return data;
  }
};

/**
 * Decrypts an AES-encrypted text into an object with a Base64 encoded key and IV.
 * @param {string} ciphertext - The encrypted text.
 * @param {string} base64Key - The Base64 encoded secret key for AES decryption.
 * @param {string} base64Iv - The Base64 encoded initialization vector.
 * @returns {Object} The decrypted object.
 */
export const decryptObjectWithAES = (
  cipherData: string | any,
  disableEncryption?: boolean
) => {
  if (disableEncryption) {
    return cipherData;
  } else {
    if (typeof cipherData === "object") {
      return cipherData;
    }
    if (typeof cipherData === "string") {
      if (base64Iv && base64Key) {
        const key = CryptoJS.enc.Base64.parse(base64Key);
        const iv = CryptoJS.enc.Base64.parse(base64Iv);
        const decrypted = CryptoJS.AES.decrypt(cipherData, key, { iv: iv });
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedText);
      }
      console.error("No secret key and IV");
    }
  }
};

// // Generate a random 256-bit key
// const key = CryptoJS.lib.WordArray.random(256 / 8).toString(CryptoJS.enc.Hex);
// // Generate a random 128-bit IV
// const iv = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
