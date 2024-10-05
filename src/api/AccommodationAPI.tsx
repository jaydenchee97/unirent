import { API, Auth } from "aws-amplify";

const apiName = "accommodationApi";
const path = "/recommendation";

export async function getRecommendation(request) {
  console.log("Trigger recommendation accommodation...");
  const jwtToken = (await Auth.currentSession()).getAccessToken().getJwtToken();
  const headers = {
    Authorization: "Bearer " + jwtToken
  };
  const myInit = { headers: headers, body: request };

  try {
    const response = await API.post(apiName, path, myInit);
    return response;
  } catch (error) {
    console.error("Error in recommendation API: " + error);
  }
}

export async function postAccommodation(request) {
  console.log("Trigger post accommodation...");
  const jwtToken = (await Auth.currentSession()).getAccessToken().getJwtToken();
  const headers = {
    Authorization: "Bearer " + jwtToken
  };
  const myInit = { headers: headers, body: request };
  try {
    const response = await API.post(apiName, "/accommodations", myInit);
    return response;
  } catch (error) {
    console.error("Error in post accommodation API: " + error);
  }
}

export async function postUniAccommodation(request) {
  console.log("Trigger post university accommodation...");
  const jwtToken = (await Auth.currentSession()).getAccessToken().getJwtToken();
  const headers = {
    Authorization: "Bearer " + jwtToken
  };

  const myInit = { headers: headers, body: request };

  try {
    const response = await API.post(apiName, "/accommodations/university", myInit);
    return response;
  } catch (error) {
    console.error("Error in post uni accommodation API: " + error);
  }
}
