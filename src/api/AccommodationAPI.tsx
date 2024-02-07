import { API } from "aws-amplify";

const apiName = "accommodationApi";
const path = "/recommendation";

export async function getRecommendation(request) {
  const myInit = { body: request };

  try {
    const response = await API.post(apiName, path, myInit);
    return response;
  } catch (error) {
    console.error("Error in accommodation API: " + error);
  }
}
