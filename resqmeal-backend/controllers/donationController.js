// 
import Donation from "../models/Donation.js";
import Notification from "../models/Notification.js";

/* ---------------- DONOR ---------------- */

// Add donation
export const addDonation = async (req, res) => {
  try {
    const { foodTitle, category, totalQuantity, unit, location, expiryTime, pickupTime, notes } = req.body;

    const donation = await Donation.create({
      donor: req.user.id,
      foodTitle,
      category,
      totalQuantity,
      remainingQuantity: totalQuantity,
      unit,
      location,
      expiryTime,
      pickupTime,
      notes,
      status: "available"
    });

    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add donation",
      error: error.message
    });
  }
};

// Donor dashboard donations
export const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.id })
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch donations",
      error: error.message
    });
  }
};

/* ---------------- ADMIN ---------------- */

// All donations
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("donor", "name contactName contactPhone")
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch donations",
      error: error.message
    });
  }
};

// Delete donation
export const deleteDonation = async (req, res) => {
  try {
    await Donation.findByIdAndDelete(req.params.id);
    res.json({ message: "Donation deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete donation",
      error: error.message
    });
  }
};

/* ---------------- RECEIVER ---------------- */

// Available donations
export const getAvailableDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      status: { $in: ["available", "partially_claimed"] },
      expiryTime: { $gt: new Date() },
      remainingQuantity: { $gt: 0 }
    }).populate("donor", "name")
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch donations",
      error: error.message
    });
  }
};

