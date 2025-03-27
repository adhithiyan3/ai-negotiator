const { Router } = require("express");
const NegoRouter = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const UserJwtToc = process.env.UserJwt;
// data base
const { NegotiationModel, MessageModel } = require("../database/negodb");

const { UserAuthWare } = require("../middleware/userauth");
NegoRouter.post("/request", async (req, res) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify JWT and extract user ID
    const buyerId = req.userId;

    // Extract other details from request body
    const { productName, mentionedPrice, affordablePrice, sellerContact } =
      req.body;

    // Create new negotiation request
    const newNegotiation = await NegotiationModel.create({
      buyerId,
      productName,
      mentionedPrice,
      affordablePrice,
      sellerContact,
      status: "initiated",
    });

    // Respond with a negotiation link
    res.json({
      link: `https://localhost:8800/negotiate/${newNegotiation._id}`, // ✅ Fixed variable name
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to initiate negotiation" });
  }
});

NegoRouter.get("/:negotiationId/messages", async (req, res) => {
  try {
    const negotiationId = req.params.negotiationId;
    if (!mongoose.Types.ObjectId.isValid(negotiationId)) {
      return res.status(400).json({ error: "Invalid negotiationId format" });
    }
    console.log("Received negotiationId:", negotiationId);
    const messages = await MessageModel.find({
      negotiationId: new mongoose.Types.ObjectId(negotiationId),
    }).sort({ createdAt: 1 });
    console.log("🔹 Found messages:", messages);
    res.json(messages);
  } catch (error) {
    console.error(" Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});



module.exports = {
  NegoRouter: NegoRouter,
};
