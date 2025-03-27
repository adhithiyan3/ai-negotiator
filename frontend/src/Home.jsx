import { useState } from "react";
import { InitializeChat } from "./api/main";

const NegotiationForm = ({ onStartChat }) => {
  const [formData, setFormData] = useState({
    productName: "",
    mentionedPrice: "",
    affordablePrice: "",
    sellerContact: "",
  });

  const [chatLink, setChatLink] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const link = await InitializeChat(formData);
    setChatLink(link);
    onStartChat(link);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Start a Negotiation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="number"
          name="mentionedPrice"
          placeholder="Mentioned Price"
          value={formData.mentionedPrice}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="number"
          name="affordablePrice"
          placeholder="Affordable Price"
          value={formData.affordablePrice}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="sellerContact"
          placeholder="Seller Contact"
          value={formData.sellerContact}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Start Negotiation
        </button>
      </form>

      {chatLink && (
        <p className="mt-4 text-green-600">
          Chat started! <a href={chatLink} className="text-blue-500 underline">Go to Chat</a>
        </p>
      )}
    </div>
  );
};

export default NegotiationForm;
