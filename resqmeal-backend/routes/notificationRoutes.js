import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getMyNotifications,
  markNotificationRead,
  markAllRead,
} from "../controllers/notificationController.js";

const router = express.Router();

// get logged-in user's notifications
router.get("/", protect, getMyNotifications);

// mark notification as read
router.put("/:id/read", protect, markNotificationRead);

// mark all notifications as read
router.put("/read-all", protect, markAllRead);

export default router;