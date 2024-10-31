import { API, Auth } from "aws-amplify";

const apiName = "generateEncryptionKeyAPI";

export async function getEncryptionKey() {
  console.log("In getEncryptionKey() ...");
  try {
    const response = await API.post(apiName, "/generateKey", { });
    return response;
  } catch (error) {
    console.error("Error in encryptionKeyAPI: " + error);
  }
}

export async function getPlaintextKey(encryptedKey) { 
  console.log("In getPlaintextKey() ...");
  const myInit = { body: { encryptedKey } };  
  try {
    const response = await API.post(apiName, "/decryptCiphertextKey", myInit);
    return response;
  } catch (error) {
    console.error("Error in encryptionKeyAPI: " + error);
  } 
}
