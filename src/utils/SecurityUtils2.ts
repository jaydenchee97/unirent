// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

const {
  KmsKeyringNode,
  buildClient,
  CommitmentPolicy,
} = require('@aws-crypto/client-node');

const { encrypt, decrypt } = buildClient(
  CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT
)

async function kmsSimpleTest() {
   
  const generatorKeyId = "arn:aws:kms:ap-southeast-1:378006208565:key/4e538754-da1c-45d1-8a89-a8630689fb7e"
  const keyIds = ["arn:aws:kms:ap-southeast-1:378006208565:key/c855a0e3-d5e0-4ffc-8c2a-fb05df6a637b"]

  const keyring = new KmsKeyringNode({ generatorKeyId, keyIds })

  const context = {
    stage: 'staging',
    purpose: 'security',
    origin: 'ap-southeast-1',
  }

  const cleartext = 'asdf'

  const { result } = await encrypt(keyring, cleartext, {
    encryptionContext: context,
  })

  // const { plaintext, messageHeader } = await decrypt(keyring, result)

  // return { plaintext, result, cleartext, messageHeader }
  return { result }
}

kmsSimpleTest().then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});