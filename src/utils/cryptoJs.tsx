var CryptoJS = require("crypto-js");


export function encryptMessage(plainText, key) {
    var ciphertext = CryptoJS.AES.encrypt(plainText, key).toString();
    console.log("ciphertext: " + ciphertext)
    return ciphertext
} 

export function decryptMessage(cipherText, key){
    if (cipherText == null || cipherText == "") {
        return "";
    }
    var bytes  = CryptoJS.AES.decrypt(cipherText, key);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    
    console.log("originaltext: " + originalText); // 'my message'
    return originalText
}
