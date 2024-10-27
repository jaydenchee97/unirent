import { API, Auth } from "aws-amplify";

const apiName = "generateEncryptionKeyAPI ";
const path = "/generateKey";

export async function getEncryptionKey() {
  console.log("Trigger encryptionKeyAPI...");
  // const jwtToken = (await Auth.currentSession()).getAccessToken().getJwtToken();
  // const headers = {
  //   Authorization: "Bearer " + jwtToken
  // };
  // const myInit = { headers: headers, body: {} };
  const myInit = { };
  try {
    console.log("begin")
    const response = await API.post(apiName, path, myInit);
    console.log("response: " + response)
    return response;
  } catch (error) {
    console.error("Error in encryptionKeyAPI: " + error);
  }
}
