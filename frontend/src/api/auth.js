import axios from "axios";

const API_BASE_URL = "http://localhost:5000/users";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signin`, { email, password });
    console.log(response.data);
      return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};
