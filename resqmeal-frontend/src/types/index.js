/* ===========================
   ENUM-LIKE CONSTANTS
=========================== */

export const DONATION_STATUSES = [
  "available",
  "claimed",
  "picked_up",
  "delivered",
  "expired",
  "cancelled",
];

export const USER_ROLES = ["donor", "ngo", "admin"];

export const FOOD_CATEGORIES = [
  { value: "cooked", label: "Cooked Food" },
  { value: "raw", label: "Raw Ingredients" },
  { value: "packaged", label: "Packaged Food" },
  { value: "beverages", label: "Beverages" },
  { value: "bakery", label: "Bakery Items" },
  { value: "dairy", label: "Dairy Products" },
  { value: "fruits_vegetables", label: "Fruits & Vegetables" },
  { value: "other", label: "Other" },
];

export const REQUEST_STATUSES = ["pending", "accepted", "rejected"];

/* ===========================
   BOOTSTRAP STATUS COLORS
=========================== */

export const STATUS_COLORS = {
  available: "badge bg-success",
  claimed: "badge bg-warning text-dark",
  picked_up: "badge bg-info",
  delivered: "badge bg-primary",
  expired: "badge bg-danger",
  cancelled: "badge bg-secondary",
};

/* ===========================
   SAMPLE DATA SHAPES (JSDoc)
   (Optional but Recommended)
=========================== */

/**
 * @typedef {Object} Donation
 * @property {string} id
 * @property {string} donorId
 * @property {string} donorName
 * @property {string} foodTitle
 * @property {string} category
 * @property {string} quantity
 * @property {string} unit
 * @property {string} expiry
 * @property {string} pickupTime
 * @property {string} contactName
 * @property {string} contactPhone
 * @property {string} location
 * @property {number=} latitude
 * @property {number=} longitude
 * @property {string} notes
 * @property {string[]=} images
 * @property {string} status
 * @property {string=} claimedBy
 * @property {string=} claimedByName
 * @property {string=} claimedAt
 * @property {string=} pickedUpAt
 * @property {string=} deliveredAt
 * @property {string=} assignedVolunteer
 * @property {string=} assignedVolunteerName
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} PickupRequest
 * @property {string} id
 * @property {string} donationId
 * @property {string} donationFoodType
 * @property {string} requesterId
 * @property {string} requesterName
 * @property {string=} requesterOrg
 * @property {string} message
 * @property {string} status
 * @property {string} createdAt
 * @property {string=} respondedAt
 */

/**
 * @typedef {Object} Volunteer
 * @property {string} id
 * @property {string} name
 * @property {string} phone
 * @property {boolean} available
 * @property {string=} assignedDonationId
 * @property {number} completedDeliveries
 
 */

/**
 * @typedef {Object} UserProfile
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} role
 * @property {string=} phone
 * @property {string=} organization
 * @property {string=} address
 * @property {string=} bio
 * @property {string=} avatar
 * @property {"active"|"pending"|"suspended"} status
 * @property {string} createdAt
 * @property {number=} totalDonations
 * @property {number=} totalReceived
 */

/**
 * @typedef {Object} DashboardStats
 * @property {number} totalDonations
 * @property {number} activeDonations
 * @property {number} claimedDonations
 * @property {number} pickedUpDonations
 * @property {number} deliveredDonations
 * @property {string} totalFoodSaved
 * @property {number} totalUsers
 */

/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {string} title
 * @property {string} message
 * @property {"info"|"success"|"warning"|"error"} type
 * @property {boolean} read
 * @property {string} createdAt
 */
