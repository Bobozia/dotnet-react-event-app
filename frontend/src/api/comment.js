import axios from "axios";

const API_URL = "http://localhost:5067/api/comments";
axios.defaults.withCredentials = true;

export function makeComment(content, eventId) {
  return axios.post(`${API_URL}`, {
    content,
    eventId,
  });
}
