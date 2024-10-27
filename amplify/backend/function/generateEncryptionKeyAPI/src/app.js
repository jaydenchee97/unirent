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

app.get("*", async function (req, res) {
  console.log("In app.get()");
  try {
    const dekParams = { KeyId: process.env.KEY_ID, KeySpec: "AES_256" };
    const dekResponse = await kms.generateDataKey(dekParams).promise();
    const plaintextDek = dekResponse.Plaintext.toString("base64");
    console.log("plaintextDek: " + plaintextDek);
    return res.status(200).json({ dek: plaintextDek });
  } catch (error) {
    console.error("Error generating DEK:", error);
    return res.status(500).json({ error: error.message });
  }
});

app.post("*", async function (req, res) {
  console.log("In app.post()");
  try {
    const dekParams = { KeyId: process.env.KEY_ID, KeySpec: "AES_256" };
    const dekResponse = await kms.generateDataKey(dekParams).promise();
    const plaintextDek = dekResponse.Plaintext.toString("base64");
    console.log("plaintextDek: " + plaintextDek);
    return res.status(200).json({ dek: plaintextDek });
  } catch (error) {
    console.error("Error generating DEK:", error);
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
