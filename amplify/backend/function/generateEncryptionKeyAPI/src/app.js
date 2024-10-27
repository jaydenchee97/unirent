/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const express = require("express");
const AWS = require("aws-sdk");
const kms = new AWS.KMS();
AWS.config.update({ region: "ap-southeast-1" });

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// app.get("*", async function (req, res) {
//   console.log("In app.post()");
// try {
//   const dekParams = { KeyId: process.env.KEY_ID, KeySpec: "AES_256" };
//   const dekResponse = await kms.generateDataKey(dekParams).promise();
//   const plaintextKey = dekResponse.Plaintext.toString("base64");
//   const encryptedKey = dekResponse.CiphertextBlob.toString("base64");
//   console.log("plaintextKey: " + plaintextKey);
//   console.log("encryptedKey: " + encryptedKey);
//   return res.status(200).json({
//     plaintextKey: plaintextKey,
//     encryptedKey: encryptedKey
//   });
// } catch (error) {
//   console.error("Error generating DEK:", error);
//   return res.status(500).json({ error: error.message });
// }
// });

app.post("/generateKey", async function (req, res) {
  console.log("In app.post() - /generateKey");
  try {
    const dekParams = { KeyId: process.env.KEY_ID, KeySpec: "AES_256" };
    const dekResponse = await kms.generateDataKey(dekParams).promise();
    const plaintextKey = dekResponse.Plaintext.toString("base64");
    const ciphertextKey = dekResponse.CiphertextBlob.toString("base64");
    console.log("plaintextKey: " + plaintextKey);
    console.log("ciphertextKey: " + ciphertextKey);
    return res.status(200).json({
      plaintextKey: plaintextKey,
      ciphertextKey: ciphertextKey
    });
  } catch (error) {
    console.error("Error generating the encryption key:", error);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/decryptCiphertextKey", async function (req, res) {
  console.log("In app.post() - /decryptCiphertextKey");
  console.log("req.body: " + JSON.stringify(req.body, null, 2));
  const ciphertext = req.body.encryptedKey;
  console.log("ciphertext: " + ciphertext);
  if (!ciphertext) {
    return res.status(400).json({ error: "Ciphertext is required" });
  }
  try {
    const params = {
      CiphertextBlob: Buffer.from(ciphertext, "base64"),
    };
    const dekResponse = await kms.decrypt(params).promise();
    const plaintextKey = dekResponse.Plaintext.toString("base64"); // Convert plaintext buffer to base64 string
    console.log("Decrypted plaintext key: ", plaintextKey);
    return res.status(200).json({ plaintextKey });
  } catch (error) {
    console.error("Error decrypting ciphertext key:", error);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
