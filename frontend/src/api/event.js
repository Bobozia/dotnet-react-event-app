import axios from "axios";

const API_URL = "http://localhost:5067/api/events";
axios.defaults.withCredentials = true;

export function getAllEvents() {
  return axios.get(`${API_URL}`);
}

export function getEventByName(name) {
  return axios.get(`${API_URL}/${name}`);
}

export function createEvent(event) {
  console.log(event);
  return axios.post(`${API_URL}`, event);
}
