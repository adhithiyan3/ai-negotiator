import axios from "axios";

const API_URL = "http://127.0.0.1:8000/negotiate";

export const negotiateWithAI = async (product_name, mentioned_price, buyer_offer) => {
  try {
    const response = await axios.post(API_URL, { product_name, mentioned_price, buyer_offer });
    return response.data.ai_response;
  } catch (error) {
    console.error("API Error:", error);
    return "Error communicating with AI.";
  }
};
