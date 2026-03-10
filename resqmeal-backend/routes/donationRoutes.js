import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  addDonation,
  getAllDonations,
  getMyDonations,
  getAvailableDonations,
  deleteDonation
} from "../controllers/donationController.js";

const router = express.Router();

/* -------- DONOR -------- */
router.post("/", protect, addDonation);
router.get("/my", protect, getMyDonations);

/* -------- ADMIN -------- */
router.get("/", protect, getAllDonations);
router.delete("/:id", protect, admin, deleteDonation);

/* -------- RECEIVER -------- */
router.get("/available", protect, getAvailableDonations);

export default router;