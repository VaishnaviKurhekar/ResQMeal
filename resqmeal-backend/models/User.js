import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactName: { type: String },
    contactPhone: { type: String },
    location: { type: String },

    role: {
      type: String,
      enum: ["donor", "ngo","volunteer", "admin"],
      default: "donor",
    },
    status: {
      type: String,
      enum: ["pending", "active", "suspended"],
      default: "pending",
    },
  },
  
  { timestamps: true }
);

export default mongoose.model("User", userSchema);