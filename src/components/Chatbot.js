import React, { useState } from "react";
import { negotiateWithAI } from "../api";
import "../styles.css";  // Import normal CSS file

const Chatbot = () => {
  const [productName, setProductName] = useState("");
  const [mentionedPrice, setMentionedPrice] = useState("");
  const [buyerOffer, setBuyerOffer] = useState("");
  const [messages, setMessages] = useState([]);

  const handleNegotiate = async () => {
    const aiResponse = await negotiateWithAI(productName, mentionedPrice, buyerOffer);
    setMessages([...messages, { role: "user", text: `Buyer: ${buyerOffer}` }, { role: "ai", text: `🤖 AI: ${aiResponse}` }]);
  };

  return (
    <div className="chat-container">
      <h2>AI Negotiation Chatbot</h2>
      <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
      <input type="number" placeholder="Seller's Price" value={mentionedPrice} onChange={(e) => setMentionedPrice(e.target.value)} />
      <input type="number" placeholder="Your Offer" value={buyerOffer} onChange={(e) => setBuyerOffer(e.target.value)} />
      <button onClick={handleNegotiate}>Negotiate</button>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index} className={msg.role}>{msg.text}</p>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
