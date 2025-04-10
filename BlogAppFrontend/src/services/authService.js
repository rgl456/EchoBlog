import axios from "axios";

const API_URL = "http://localhost:8080/api/v1"; 

export const register = (data) => {
    return axios.post(`${API_URL}/register`, data);
}

export const login = (data) => {
    return axios.post(`${API_URL}/login`, data);
};

