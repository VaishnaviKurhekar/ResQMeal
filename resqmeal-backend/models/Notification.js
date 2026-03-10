import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["claim", "pickup", "delivered", "expired"],
      required: true,
    },

    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("notification", notificationSchema);