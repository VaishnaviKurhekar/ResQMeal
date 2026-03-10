import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  createClaim,
  getMyClaims,
  getDonationClaims,
  approveClaim,
  rejectClaim,
  getApprovedClaims,
  assignVolunteer,
  getAssignedClaims,
  markPickedUp,
  markDelivered
} from "../controllers/claimController.js";

const router = express.Router();

/* ---------------- RECEIVER ---------------- */
router.post("/donations/:id/claim", protect, createClaim);
router.get("/my-claims", protect, getMyClaims);

/* ---------------- DONOR ---------------- */
router.get("/donations/:id/claims", protect, getDonationClaims);
router.put("/:id/approve", protect, approveClaim);
router.put("/:id/reject", protect, rejectClaim);

/* ---------------- ADMIN ---------------- */
router.get("/approved", protect, admin, getApprovedClaims);
router.put("/:id/assign-volunteer", protect, admin, assignVolunteer);

/* ---------------- VOLUNTEER ---------------- */
router.get("/assigned", protect, getAssignedClaims);
router.put("/:id/pickup", protect, markPickedUp);
router.put("/:id/deliver", protect, markDelivered);

export default router;