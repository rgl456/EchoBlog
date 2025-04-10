import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/categories";

// GET all categories (Public)
export const getCategories = () => {
  return axios.get(API_URL);
};

// POST - Create new category (Protected)
export const createCategory = (data, token) => {
  return axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// DELETE - Delete category by ID (Protected)
export const deleteCategory = (id, token) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
