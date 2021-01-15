import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:3001/risk";

export function getRisk() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
