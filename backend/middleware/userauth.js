const jwt = require("jsonwebtoken");
require("dotenv").config();
const SecCode = process.env.UserJwt;

const UserAuthWare = (req, res, next) => {
  const authHeader = req.headers.authorization;

  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Invalid User - not authenticated",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const jwtDecoded = jwt.verify(token, SecCode);
    

    req.userId = jwtDecoded.id;
    req.role = jwtDecoded.role;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err); // Log actual error
    res.status(403).json({
      message: "Error - Not an Authorized User",
    });
  }
};

module.exports = {
  UserAuthWare,
};
