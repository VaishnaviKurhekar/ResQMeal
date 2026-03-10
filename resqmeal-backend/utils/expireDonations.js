import Donation from "../models/Donation.js";

export const expireDonations = async () => {
  try {
    const now = new Date();

    await Donation.updateMany(
      {
        expiryTime: { $lt: now },
        status: { $nin: ["delivered", "expired"] },
      },
      {
        status: "expired",
        expiredAt: now,
      }
    );

    if (process.env.NODE_ENV !== "production") {
      console.log(" Expired donations checked");
    }
  } catch (error) {
    console.error(" Expiry job failed:", error.message);
  }
};