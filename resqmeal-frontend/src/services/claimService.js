import API from "./api";

/* -------- DONOR -------- */

// Get claims for a donation
export const getDonationClaims = (donationId) =>
  API.get(`/claims/donations/${donationId}/claims`);

// Approve claim
export const approveClaim = (claimId) =>
  API.put(`/claims/${claimId}/approve`);

// Reject claim
export const rejectClaim = (claimId) =>
  API.put(`/claims/${claimId}/reject`);

/* -------- ADMIN -------- */

// Get approved claims
export const getApprovedClaims = () =>
  API.get("/claims/approved");

// Assign volunteer to claim
export const assignVolunteer = (claimId, volunteerId) =>
  API.put(`/claims/${claimId}/assign-volunteer`, { volunteerId });

/* -------- VOLUNTEER -------- */

// Get assigned claims
export const getAssignedClaims = () =>
  API.get("/claims/assigned");

// Mark claim as picked up
export const markPickedUp = (claimId) =>
  API.put(`/claims/${claimId}/pickup`);

// Mark claim as delivered
export const markDelivered = (claimId) =>
  API.put(`/claims/${claimId}/deliver`);