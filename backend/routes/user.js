const { Router } = require("express");
const UserRouter = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserJwtToc = process.env.UserJwt;
const bcrypt = require("bcrypt");
// data base
const { BuyerModel, SellerModel } = require("../database/userdb");

UserRouter.post("/signup", async (req, res) => {
  const { name, email, role, phone, password } = req.body;
  try {
    const MatchSeller = await BuyerModel.findOne({
      email: email,
      phone: phone,
    });
    const MatchBuyer = await SellerModel.findOne({
      email: email,
      phone: phone,
    });

    if (MatchSeller && MatchBuyer) {
      return res
        .status(402)
        .json({ message: "USER ALREADY EXIS SO PLEASE LOGIN" });
    }

    if (role === "buyer") {
      const seller = await BuyerModel.create({
        name: name,
        email: email,
        phone: phone,
        password: password,
        createdAt: Date.now(),
      });
      // seller retuen res
      return res.status(201).json({
        message: "seller sign up successfull",
        token: token,
      });
    }
    //create
    const NewUser = await SellerModel.create({
      name: name,
      email: email,
      phone: phone,
      password: password,
      createdAt: Date.now(),
    });

    const token = jwt.sign({ id: NewUser._id, role }, UserJwtToc, {
      expiresIn: "1d",
    });

    //   user response
    res.status(201).json({
      message: `buyer sign up successfull`,
      token: token,
    });
  } catch (err) {
    // invalid credientails
    console.log(err);
    res.status(404).json({
      message: `Error in SignIn please wait `,
    });
  }
});

UserRouter.post("/signin", async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    // Check if user exists in BuyerModel or SellerModel
    const buyer = await BuyerModel.findOne({ email, phone, password });
    const seller = await SellerModel.findOne({ email, phone, password });

    if (!buyer && !seller) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Determine role and get user
    const user = buyer || seller;
    const role = buyer ? "buyer" : "seller";

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role }, UserJwtToc, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token: token,
      role: role,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in SignIn. Please try again." });
  }
});

module.exports = {
  UserRouter: UserRouter,
};
