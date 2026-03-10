import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import models to register them with mongoose
import "./models/User.js";
import "./models/Donation.js";
import "./models/Claim.js";
import "./models/Notification.js";

import authRoutes from "./routes/authRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";
import { expireDonations } from "./utils/expireDonations.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";



dotenv.config();
connectDB();


const app = express();
// expireDonations(); // Run on startup
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"], // frontend URLs
    credentials: true,               // allow cookies
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/volunteer", volunteerRoutes);

app.get("/", (req, res) => {
  res.send("ResQMeal API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});