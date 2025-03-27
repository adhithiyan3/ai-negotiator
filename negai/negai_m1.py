from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests

app = FastAPI()

class NegotiationRequest(BaseModel):
    product_name: str
    mentioned_price: float
    affordable_price: float
    seller_contact: str

NODE_DB_API = "http://your-node-server.com/api/historical-data"

def fetch_historical_data(product_name: str):
    try:
        response = requests.get(f"{NODE_DB_API}?product={product_name}")
        if response.status_code == 200:
            return response.json()
        else:
            return None
    except Exception as e:
        return None

def generate_price_range(product_name, mentioned_price, affordable_price):
    historical_data = fetch_historical_data(product_name) or {"average_price": mentioned_price * 0.9, "trend": 1.0, "demand": 1.0}
    avg_price = historical_data["average_price"]
    trend_factor = historical_data["trend"]
    demand_factor = historical_data["demand"]
    
    min_price = max(affordable_price, avg_price * 0.9 * trend_factor)
    max_price = min(mentioned_price, avg_price * 1.1 * demand_factor)
    
    return round(min_price, 2), round(max_price, 2)

def generate_negotiation_message(product_name, buyer_offer):
    return (f"Hello, I am interested in purchasing {product_name}. "
            f"Based on market trends and historical data, I would like to offer {buyer_offer}. "
            f"Would you be willing to consider this price?")

@app.post("/negotiate")
def negotiate(request: NegotiationRequest):
    min_price, max_price = generate_price_range(request.product_name, request.mentioned_price, request.affordable_price)
    
    buyer_offer = request.affordable_price  
    
    return {"message": generate_negotiation_message(request.product_name, buyer_offer), "buyer_offer": buyer_offer, "min_price": min_price}
