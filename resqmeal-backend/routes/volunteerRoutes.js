import express from "express";
import protect from "../middleware/authMiddleware.js";
import Donation from "../models/Donation.js";

const router = express.Router();

/* ================= GET VOLUNTEER ASSIGNMENTS ================= */

router.get("/donations", protect, async (req, res) => {

  try {

    const donations = await Donation.find({
      assignedVolunteer: req.user.id
    })
    .populate("donor", "name phone")
    .populate("claimedBy", "name");

    res.json(donations);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch volunteer donations",
      error: error.message
    });

  }

});

export default router;