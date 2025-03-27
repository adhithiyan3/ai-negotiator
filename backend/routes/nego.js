const { Router } = require("express");
const NegoRouter = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserJwtToc = process.env.UserJwt;
// data base
const { NegotiationModel } = require("../database/negodb");

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

module.exports = {
  NegoRouter: NegoRouter,
};
