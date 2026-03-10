import User from "../models/User.js";
import Donation from "../models/Donation.js";

/* ===== STATS ===== */
export const getAdminStats = async (req, res) => {
  const users = await User.countDocuments();
  const donations = await Donation.countDocuments();
  const volunteers = await User.countDocuments({ role: "volunteer" });
  const activeDeliveries = await Donation.countDocuments({
    status: "picked_up",
  });

  res.json({ users, donations, volunteers, activeDeliveries });
};

/* ===== USERS ===== */
export const getAllUsersAdmin = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const approveUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.status = "active";
  await user.save();
  res.json({ message: "User approved" });
};

export const suspendUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.status = "suspended";
  await user.save();
  res.json({ message: "User suspended" });
};

/* ===== DONATIONS ===== */
export const getAllDonationsAdmin = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("donor", "name email");
    res.json(donations);
  } catch (error) {
    console.error("Error in getAllDonationsAdmin:", error);
    res.status(500).json({
      message: "Failed to fetch donations",
      error: error.message
    });
  }
};

export const deleteDonationAdmin = async (req, res) => {
  await Donation.findByIdAndDelete(req.params.id);
  res.json({ message: "Donation deleted" });
};

/* ===== VOLUNTEERS ===== */
export const getAllVolunteers = async (req, res) => {
  const volunteers = await User.find({ role: "volunteer" }).select("-password");
  res.json(volunteers);
};

export const toggleVolunteerStatus = async (req, res) => {
  const volunteer = await User.findById(req.params.id);
  if (!volunteer)
    return res.status(404).json({ message: "Volunteer not found" });

  volunteer.available = !volunteer.available;
  await volunteer.save();

  res.json({ message: "Volunteer status updated" });
};