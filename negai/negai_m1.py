import random

class NegotiationBot:
    def __init__(self):
        self.dummy_historical_data = {
            "Laptop": {"average_price": 900, "trend": 1.05, "demand": 1.1},
            "Smartphone": {"average_price": 700, "trend": 1.02, "demand": 1.2},
            "Headphones": {"average_price": 150, "trend": 0.98, "demand": 1.0}
        }
    
    def generate_price_range(self, product_name, mentioned_price, affordable_price):
        historical_data = self.dummy_historical_data.get(product_name, {"average_price": mentioned_price * 0.9, "trend": 1.0, "demand": 1.0})
        avg_price = historical_data["average_price"]
        trend_factor = historical_data["trend"]
        demand_factor = historical_data["demand"]
        
        min_price = max(affordable_price, avg_price * 0.9 * trend_factor)
        max_price = min(mentioned_price, avg_price * 1.1 * demand_factor)
        
        return round(min_price, 2), round(max_price, 2)
    
    def generate_negotiation_message(self, product_name, buyer_offer):
        return (f"Hello, I am interested in purchasing {product_name}. "
                f"Based on market trends and historical data, I would like to offer {buyer_offer}. "
                f"Would you be willing to consider this price?")
    
    def start_negotiation(self):
        print("Welcome to AI Negotiation Bot!\n")
        product_name = input("Enter Product Name: ")
        mentioned_price = float(input("Enter Mentioned Price: "))
        affordable_price = float(input("Enter Your Affordable Price: "))
        seller_contact = input("Enter Seller Contact (Dummy for now): ")
        
        min_price, max_price = self.generate_price_range(product_name, mentioned_price, affordable_price)
        
        print("\nStarting negotiation...")
        buyer_offer = affordable_price  # Start negotiation from buyer's preferred price
        
        while True:
            print(self.generate_negotiation_message(product_name, buyer_offer))
            seller_response = input("Seller: Enter your counteroffer or type 'accept' to finalize: ")
            
            if seller_response.lower() == "accept":
                print(f"Seller: I accept your offer of {buyer_offer}.")
                print("Negotiation successful!")
                break
            else:
                try:
                    seller_counter = float(seller_response)
                    if seller_counter > buyer_offer:
                        buyer_offer = round((buyer_offer + seller_counter) / 2, 2)
                    else:
                        print("Seller's counteroffer is too low. Please offer a higher price.")
                except ValueError:
                    print("Invalid input. Please enter a valid counteroffer or type 'accept'.")
                
if __name__ == "__main__":
    bot = NegotiationBot()
    bot.start_negotiation()
