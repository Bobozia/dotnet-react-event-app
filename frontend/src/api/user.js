import axios from "axios";

const API_URL = "http://localhost:5067/api/users";
axios.defaults.withCredentials = true;

export function login(userName, password) {
  return axios.post(`${API_URL}/login`, { userName, password });
}

export function register(email, userName, password, confirmPassword) {
  return axios.post(`${API_URL}/register`, {
    email,
    userName,
    password,
    confirmPassword,
  });
}

export function getUserId() {
  return axios.get(`${API_URL}/user`);
}

// export function logout() {
//    Implement logout API call...
// }
