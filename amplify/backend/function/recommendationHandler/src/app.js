/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const axios = require("axios");
const bodyParser = require("body-parser");
const express = require("express");
const geolib = require("geolib");
// Decryption Changes
const { KmsKeyringNode, buildClient, CommitmentPolicy } = require("@aws-crypto/client-node");

// Decryption Changes
const { encrypt, decrypt } = buildClient(CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT);
const generatorKeyId = process.env.DEK;
const keyIds = [process.env.KEK];
const keyring = new KmsKeyringNode({ generatorKeyId, keyIds });
const context = { stage: "staging", purpose: "security", origin: "ap-southeast-1" };


// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const endpoint = process.env.GRAPHQL_ENDPOINT;
const apiKey = process.env.GRAPHQL_API_KEY;

const query = /* GraphQL */ `
  query MyQuery {
    listAccommodations {
      items {
        availableDate
        createdAt
        id
        images
        price
        propertyType
        rented
        title
        userId
        User {
          name
        }
        address
      }
    }
  }
`;
// const headers = {
//   "x-api-key": apiKey,
//   "Content-Type": "application/json",
// };

/**********************
 * Example get method *
 **********************/

app.get("/recommendation", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

app.get("/recommendation/*", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

// code start
app.post("/recommendation", async function (req, res) {
  console.log("recommendation start...");

  console.log("req.body: " + req.body);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: req.headers.authorization || '', // Authorization token (if needed)
  };

  let data;
  try {
    const response = await axios.post(endpoint, { query }, { headers });
    data = response.data?.data?.listAccommodations?.items;
    console.log("data: " + data);
  } catch (error) {
    console.error(error);
  }

  const map = new Map();
  for (let i = 0; i < data.length; i++) {
    // Decryption Changes
    const address = JSON.parse(data[i].address);
    const dist = geolib.getDistance(req.body.coords, address.geo);

    // TODO: Check the structure of address and find out how to decrpyt data
    console.log("address: " + JSON.stringify(address, null, 2));
    map.set(data[i], dist);
  }

  // sort by dist asc
  const mapSort = new Map([...map.entries()].sort((a, b) => a[1] - b[1]));
  console.log("sorted: ");
  console.log(mapSort);

  // take first 5
  const temp = Array.from(mapSort).slice(0, 5);
  const mapSlice = new Map(temp);
  console.log("sliced: ");
  console.log(mapSlice);

  console.log("converting... ");
  const finalArray = [];
  let element = {};
  mapSlice.forEach((value, key) => {
    element = key;
    element.distance = value;
    finalArray.push(element);
  });
  console.log(finalArray);

  res.json(finalArray);
});

app.post("/recommendation/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/recommendation", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/recommendation/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/recommendation", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/recommendation/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});


// Encryption Changes
// NOTE: The variable name for encrypt/decrypt function must be called result
// isBase64() check is required for existing data that hasn't been encrypted
async function decryptData(result) { 
  console.log("result: " + result);
  const { plaintext, messageHeader } = isBase64(result) ? await decrypt(keyring, result) : result;
  console.log("plaintext: " + plaintext);
  return plaintext ;
}

function isBase64(str) {
  const base64Pattern = /^(?:[A-Za-z0-9+/=]+)$/; // Basic base64 pattern
  return typeof str === "string" && base64Pattern.test(str);
}

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
