import CryptoJS from "crypto-js";
import { getEncryptionKey } from "../api/EncryptionKeyAPI";

const encryptionKey = getEncryptionKey();

export const encrypt = (plainText: string): string => {
  try {
    const encrypted = CryptoJS.AES.encrypt(plainText, encryptionKey).toString();
    return encrypted;
  } catch (error) {
    console.error("Encryption error: ", error);
    return "";
  }
};

export const decrypt = (cipherText: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, encryptionKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    console.error("Decryption error: ", error);
    return "";
  }
};
