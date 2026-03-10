import Claim from "../models/Claim.js";
import Donation from "../models/Donation.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

/* ---------------- RECEIVER ---------------- */

// Create claim
export const createClaim = async (req, res) => {
  try {
    const { quantity } = req.body;
    const donationId = req.params.id;

    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    if (donation.remainingQuantity < quantity) {
      return res.status(400).json({ message: "Insufficient remaining quantity" });
    }

    const claim = await Claim.create({
      donation: donationId,
      receiver: req.user.id,
      quantity,
      status: "pending"
    });

    // Notify donor
    await Notification.create({
      user: donation.donor,
      message: "New claim request received",
      type: "claim",
      donation: donationId
    });

    res.status(201).json(claim);
  } catch (error) {
    res.status(500).json({ message: "Failed to create claim", error: error.message });
  }
};

// Get my claims
export const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ receiver: req.user.id })
      .populate("donation", "foodTitle location expiryTime")
      .sort({ createdAt: -1 });

    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch claims", error: error.message });
  }
};

/* ---------------- DONOR ---------------- */

// Get claims for my donations
export const getDonationClaims = async (req, res) => {
  try {
    const donationId = req.params.id;

    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    if (donation.donor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const claims = await Claim.find({ donation: donationId })
      .populate("receiver", "name")
      .sort({ createdAt: -1 });

    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch claims", error: error.message });
  }
};

// Approve claim
export const approveClaim = async (req, res) => {
  try {
    const { id } = req.params;

    const claim = await Claim.findById(id).populate("donation").populate("receiver", "name");
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    if (claim.donation.donor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (claim.status !== "pending") {
      return res.status(400).json({ message: "Claim is not pending" });
    }

    // Update donation remaining quantity
    const donation = claim.donation;
    donation.remainingQuantity -= claim.quantity;

    if (donation.remainingQuantity > 0) {
      donation.status = "partially_claimed";
    } else {
      donation.status = "fully_claimed";
    }

    await donation.save();

    claim.status = "approved";
    await claim.save();

    // Notify donor
    await Notification.create({
      user: donation.donor,
      message: `Your ${donation.foodTitle} has been claimed by ${claim.receiver.name}`,
      type: "claim",
      donation: donation._id
    });

    // Notify admin
    const admins = await User.find({ role: "admin" });
    for (const admin of admins) {
      await Notification.create({
        user: admin._id,
        message: "A claim has been approved and needs volunteer assignment",
        type: "claim",
        donation: donation._id
      });
    }

    res.json({ message: "Claim approved", claim });
  } catch (error) {
    res.status(500).json({ message: "Failed to approve claim", error: error.message });
  }
};

// Reject claim
export const rejectClaim = async (req, res) => {
  try {
    const { id } = req.params;

    const claim = await Claim.findById(id).populate("donation");
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    if (claim.donation.donor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (claim.status !== "pending") {
      return res.status(400).json({ message: "Claim is not pending" });
    }

    claim.status = "rejected";
    await claim.save();

    res.json({ message: "Claim rejected", claim });
  } catch (error) {
    res.status(500).json({ message: "Failed to reject claim", error: error.message });
  }
};

/* ---------------- ADMIN ---------------- */

// Get approved claims
export const getApprovedClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ status: "approved" })
      .populate("donation", "foodTitle location")
      .populate("receiver", "name")
      .sort({ createdAt: -1 });

    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch approved claims", error: error.message });
  }
};

// Assign volunteer
export const assignVolunteer = async (req, res) => {
  try {
    const { id } = req.params;
    const { volunteerId } = req.body;

    const claim = await Claim.findById(id);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    if (claim.status !== "approved") {
      return res.status(400).json({ message: "Claim is not approved" });
    }

    claim.volunteer = volunteerId;
    claim.status = "assigned";
    await claim.save();

    // Notify volunteer
    await Notification.create({
      user: volunteerId,
      message: "You have been assigned a pickup task",
      type: "pickup",
      donation: claim.donation
    });

    res.json({ message: "Volunteer assigned", claim });
  } catch (error) {
    res.status(500).json({ message: "Failed to assign volunteer", error: error.message });
  }
};

/* ---------------- VOLUNTEER ---------------- */

// Get assigned claims
export const getAssignedClaims = async (req, res) => {
  try {
    const claims = await Claim.find({
      volunteer: req.user.id,
      status: { $in: ["assigned", "picked_up", "delivered"] }
    })
      .populate("donation", "foodTitle location expiryTime")
      .populate("receiver", "name contactPhone")
      .sort({ createdAt: -1 });

    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assigned claims", error: error.message });
  }
};

// Mark as picked up
export const markPickedUp = async (req, res) => {
  try {
    const { id } = req.params;

    const claim = await Claim.findById(id);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    if (claim.volunteer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (claim.status !== "assigned") {
      return res.status(400).json({ message: "Claim is not assigned" });
    }

    claim.status = "picked_up";
    await claim.save();

    // Notify receiver
    await Notification.create({
      user: claim.receiver,
      message: "Your food donation has been picked up",
      type: "pickup",
      donation: claim.donation
    });

    res.json({ message: "Marked as picked up", claim });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark as picked up", error: error.message });
  }
};

// Mark as delivered
export const markDelivered = async (req, res) => {
  try {
    const { id } = req.params;

    const claim = await Claim.findById(id);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    if (claim.volunteer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (claim.status !== "picked_up") {
      return res.status(400).json({ message: "Claim is not picked up" });
    }

    claim.status = "delivered";
    await claim.save();

    // Notify receiver
    await Notification.create({
      user: claim.receiver,
      message: "Your food donation has been delivered",
      type: "delivered",
      donation: claim.donation
    });

    res.json({ message: "Marked as delivered", claim });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark as delivered", error: error.message });
  }
};