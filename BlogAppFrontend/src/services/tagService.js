import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/tags";

export const getTags = () => {
  return axios.get(API_URL);
}

export const createTags = (data, token) => {
    return axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
}

export const deleteTags = (id, token) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}