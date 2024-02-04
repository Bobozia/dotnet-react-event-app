import axios from "axios";

const API_URL = "http://localhost:5067/api/events";
axios.defaults.withCredentials = true;

export function getEventsByFilter(filter, page, pageSize) {
  return axios.get(
    `${API_URL}?filter=${filter}&page=${page}&pageSize=${pageSize}`
  );
}

export function getEventByName(name) {
  return axios.get(`${API_URL}/${name}`);
}

export function createEvent(event) {
  return axios.post(`${API_URL}`, event);
}

export function updateEvent(id, event) {
  return axios.put(`${API_URL}/${id}`, event);
}

export function deleteEvent(id) {
  return axios.delete(`${API_URL}/${id}`);
}

export function getEventsCount() {
  return axios.get(`${API_URL}/count`);
}

export function getEventsByUser(page, pageSize) {
  return axios.get(`${API_URL}/user?page=${page}&pageSize=${pageSize}`);
}

export function getRandomEvent(userId) {
  return axios.get(`${API_URL}/random?userId=${userId}`);
}