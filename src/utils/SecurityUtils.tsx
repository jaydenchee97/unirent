// import CryptoJS from "crypto-js";

// const encryptionKey = process.env.EXPO_PUBLIC_ENCRYPTION_KEY;

// if (!encryptionKey || encryptionKey.length !== 32) {
//   throw new Error("Invalid encryption key. Must be 32 characters long.");
// }

// export const encrypt = (plainText: string): string => {
//   try {
//     const encrypted = CryptoJS.AES.encrypt(plainText, encryptionKey).toString();
//     return encrypted;
//   } catch (error) {
//     console.error("Encryption error: ", error);
//     return "";
//   }
// };

// export const decrypt = (cipherText: string): string => {
//   try {
//     const bytes = CryptoJS.AES.decrypt(cipherText, encryptionKey);
//     const decrypted = bytes.toString(CryptoJS.enc.Utf8);
//     return decrypted;
//   } catch (error) {
//     console.error("Decryption error: ", error);
//     return "";
//   }
// };
