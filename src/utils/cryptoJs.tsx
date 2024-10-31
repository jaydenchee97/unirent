// var CryptoJS = require("crypto-js");
import CryptoES from "crypto-es";


export function encryptMessage(plainText, key) {
    console.log('try encrypt')
    // var ciphertext = CryptoJS.AES.encrypt(plainText, key).toString();
    var ciphertext = CryptoES.AES.encrypt(plainText ,key).toString();

    console.log("ciphertext: " + ciphertext)
    return ciphertext
} 

export function decryptMessage(cipherText, key){
    if (cipherText == null || cipherText == "") {
        return "";
    }
    // Decrypt the ciphertext with the AES algorithm and the provided key
    const bytes = CryptoES.AES.decrypt(cipherText, key);
    // Convert the decrypted bytes to a UTF-8 string
    const originalText = bytes.toString(CryptoES.enc.Utf8);
    
    console.log("originaltext: " + originalText); // 'my message'
    return originalText
}

