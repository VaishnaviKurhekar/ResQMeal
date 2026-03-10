import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  foodTitle: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["cooked", "raw", "packaged", "bakery", "dairy", "fruits_vegetables", "other"],
    default: "cooked"
  },
  totalQuantity: {
    type: Number,
    required: true
  },
  remainingQuantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    enum: ["kg", "plates", "boxes"],
    default: "kg"
  },
  location: {
    type: String,
    required: true
  },
  expiryTime: {
    type: Date,
    required: true
  },
  pickupTime: {
    type: Date
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ["available", "partially_claimed", "fully_claimed", "expired"],
    default: "available"
  }
}, { timestamps: true });

export default mongoose.model("Donation", donationSchema);