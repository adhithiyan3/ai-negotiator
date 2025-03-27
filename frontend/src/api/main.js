import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const InitializeChat = async (data) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/negotiate/request`, data,
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
          }
     )
      console.log(response.data);
      return response.data.link;
  } catch (error) {
    throw error.response?.data?.message || "Request failed";
  }
};