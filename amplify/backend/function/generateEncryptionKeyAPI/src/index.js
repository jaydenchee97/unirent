const AWS = require("aws-sdk");
const kms = new AWS.KMS();

AWS.config.update({ region: "ap-southeast-1" });

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        const dekParams = { KeyId: keyId, KeySpec: "AES_256" };
        const dekResponse = await kms.generateDataKey(dekParams).promise();
        const plaintextDek = dekResponse.Plaintext.toString("base64");
        console.log("plaintextDek: " + plaintextDek);
        return {
            statusCode: 200,
            body: JSON.stringify({ dek: plaintextDek })
        };
    } catch (error) {
        console.error("Error generating DEK:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
