import API from "./api";

/* -------- DONOR -------- */

// Add new donation
export const addDonation = (data) =>
  API.post("/donations", data);

// Fetch donor's own donations
export const fetchMyDonations = () =>
  API.get("/donations/my");

/* -------- ADMIN -------- */

// Get all donations
export const fetchAllDonations = () =>
  API.get("/donations");

// Delete donation
export const deleteDonation = (id) =>
  API.delete(`/donations/${id}`);

/* -------- RECEIVER -------- */

// Get available donations
export const getAvailableDonations = () =>
  API.get("/donations/available");

// Claim donation with quantity
export const claimDonation = (id, quantity) =>
  API.post(`/claims/donations/${id}/claim`, { quantity });

// Get receiver claimed donations
export const getMyClaims = () =>
  API.get("/claims/my-claims");