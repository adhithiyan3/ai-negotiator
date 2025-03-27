const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const NegotiationSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer",
    required: true,
    },
  productName: { type: String, required: true },
  mentionedPrice: { type: Number, required: true },
  affordablePrice: { type: Number, required: true },
  sellerContact: { type: String, required: true }, // Email or Phone
  status: {
    type: String,
    enum: ["initiated", "in_progress", "completed"],
    default: "initiated",
  },
  finalPrice: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const MessageSchema = new mongoose.Schema({
  negotiationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Negotiation",
    required: true,
  },
  sender: { type: String, enum: ["AI", "Seller"], required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});





const NegotiationModel = mongoose.model("Negotiation", NegotiationSchema);
const MessageModel = mongoose.model("Messages", MessageSchema);


module.exports = {
  NegotiationModel: NegotiationModel,
  MessageModel: MessageModel,
};

