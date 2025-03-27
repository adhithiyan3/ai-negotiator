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


const NegotiationModel = mongoose.model("Negotiation", NegotiationSchema);


module.exports = {
  NegotiationModel: NegotiationModel,
};

