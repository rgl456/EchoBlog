import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

export const createPost = async (postData, token) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const getPosts = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPublishedPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts/published`);
    return response;
  } catch (error) {
    console.error("Error fetching published posts:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const getPostsByCategoryId = async (categoryId) => {
  try {
    console.log(`Fetching posts for category ID: ${categoryId}`); // Debugging
    const response = await axios.get(`${API_URL}/posts/${categoryId}`);
    console.log("Posts fetched by category:", response.data); // Debugging
    return response;
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const updatePost = async (id, postData, token) => {
  try {
    const response = await axios.put(`${API_URL}/posts/${id}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const getDraftPosts = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await axios.get(`${API_URL}/posts/drafts`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching draft posts:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };