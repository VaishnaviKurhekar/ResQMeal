import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import {
  getAdminStats,
  getAllUsersAdmin,
  approveUser,
  suspendUser,
  getAllDonationsAdmin,
  deleteDonationAdmin,
  getAllVolunteers,
  toggleVolunteerStatus,
} from "../controllers/adminController.js";

const router = express.Router();

/* ===== STATS ===== */
router.get("/stats", protect, admin, getAdminStats);

/* ===== USERS ===== */
router.get("/users", protect, admin, getAllUsersAdmin);
router.put("/users/:id/approve", protect, admin, approveUser);
router.put("/users/:id/suspend", protect, admin, suspendUser);

/* ===== DONATIONS ===== */
router.get("/donations", protect, admin, getAllDonationsAdmin);
router.delete("/donations/:id", protect, admin, deleteDonationAdmin);

/* ===== VOLUNTEERS ===== */
router.get("/volunteers", protect, admin, getAllVolunteers);
router.put("/volunteers/:id/toggle", protect, admin, toggleVolunteerStatus);

export default router;