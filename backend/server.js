// node dependences
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
mongoose.connect(process.env.MongoUrl);
const { UserAuthWare } = require("./middleware/userauth");
const cors = require("cors");
// router files
const { UserRouter } = require("./routes/user");
const { NegoRouter } = require("./routes/nego")
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json()); //json middleware
app.use("/users", UserRouter);
app.use(UserAuthWare);
app.use("/negotiate", NegoRouter);

app.listen(5000, () => {
  console.log("Server is Running !");
});