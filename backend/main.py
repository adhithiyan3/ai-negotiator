# import os
import google.generativeai as genai
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


# from dotenv import load_dotenv

# Load API key from .env file
# load_dotenv()
API_KEY = "AIzaSyBixjdLuwQc7gjBZiuVKv9o0is19tmekQI"

# Configure Gemini API
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow all origins (Change this to ["http://localhost:3000"] for security)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request model
class NegotiationRequest(BaseModel):
    product_name: str
    mentioned_price: float
    buyer_offer: float

@app.post("/negotiate")
async def negotiate(request: NegotiationRequest):
    prompt = (f"You are an AI negotiator. The buyer wants to purchase a {request.product_name}. "
              f"The seller's asking price is {request.mentioned_price}, and the buyer is offering {request.buyer_offer}. "
              f"Generate a simple counteroffer message.")
    
    ai_response = model.generate_content(prompt)
    return {"ai_response": ai_response.text if ai_response else "Sorry, I couldn't generate a response."}

