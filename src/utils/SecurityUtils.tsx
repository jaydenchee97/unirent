import CryptoJS from "crypto-js";
import { getPlaintextKey } from "../api/EncryptionKeyAPI";
import * as SecureStore from "expo-secure-store";
import { Platform } from 'react-native';
import { isWeb } from ".";

const handleEncryptionKey = async () => {
  const storedCiphertextKey = await getStoredCiphertextKey();
  if (storedCiphertextKey) {
    console.log("Decrypting ciphertextKey ... ");
    const plaintextKey = await getPlaintextKey(storedCiphertextKey);
    console.log("Decryption completed");
    return plaintextKey;
  } else {
    console.error("No ciphertext key found in Secure Store.");
  }
}

const getStoredCiphertextKey = async () => {
  let storedCiphertextKey;
  if (isWeb) {
    console.log("Retrieving key from local storage");
    storedCiphertextKey = localStorage.getItem("ciphertextKey");
  } else {
    console.log("Retrieving key from secure store");
    storedCiphertextKey = await SecureStore.getItemAsync("ciphertextKey");
  }
  return storedCiphertextKey;
};

export const encrypt = async (plainText: string): Promise<string> => {
  console.log("Begin encryption ...");
  const key = await handleEncryptionKey();
  if (!key.plaintextKey) {
    console.error("Encryption error: No plaintext key available.");
    return "";
  }
  try {
    const encrypted = CryptoJS.AES.encrypt(plainText, key.plaintextKey).toString();
    console.log("Encryption successful:", encrypted);
    return encrypted;
  } catch (error) {
    console.error("Encryption error: ", error);
    return "";
  }
};

export const decrypt = async (cipherText: string): Promise<string> => {
  console.log("Begin decryption ...");
  const key = await handleEncryptionKey();
  if (!key.plaintextKey) {
    console.error("Encryption error: No plaintext key available.");
    return "";
  }
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, key.plaintextKey);
    // Testing security functions [Start]
    // const bytes = CryptoJS.AES.decrypt(cipherText, "hkcBkta7WC/xwc/Vaa7kOj+vUxY8Cdc/TyA42PRsrYo=");
    // Testing security functions [End]
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    console.log("Decryption successful:", decrypted);
    return decrypted;
  } catch (error) {
    console.error("Decryption error: ", error);
    return null;
  }
};
