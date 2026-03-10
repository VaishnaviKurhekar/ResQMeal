import React from "react";
import {
  MapPin,
  Clock,
  Package,
  User,
  X,
  Phone,
  Truck,
} from "lucide-react";
import { STATUS_COLORS } from "../types";
import "./donationdetailmodal.css";

const DonationDetailModal = ({
  donation,
  onClose,
  onClaim,
  onCancel,
  onPickedUp,
  onDelivered,
  userRole,
}) => {
  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <div>
              <h5 className="modal-title fw-bold">{donation.foodTitle}</h5>
              <span className="badge bg-secondary text-capitalize">
                {donation.category.replace("_", " & ")}
              </span>
            </div>
            <span
              className={`badge text-capitalize ms-auto me-3 ${
                STATUS_COLORS?.[donation.status] || "bg-info"
              }`}
            >
              {donation.status.replace("_", " ")}
            </span>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Basic Info */}
            <div className="mb-4 small text-muted">
              <div className="d-flex align-items-center mb-2">
                <Package size={16} className="me-2" />
                {donation.remainingQuantity} / {donation.totalQuantity}
              </div>
              <div className="d-flex align-items-center mb-2">
                <Clock size={16} className="me-2" />
                Best before: {donation.expiryTime ? new Date(donation.expiryTime).toLocaleString() : 'N/A'}
              </div>
              {donation.pickupTime && (
                <div className="d-flex align-items-center mb-2">
                  <Clock size={16} className="me-2" />
                  Pickup: {new Date(donation.pickupTime).toLocaleString()}
                </div>
              )}
              <div className="d-flex align-items-center mb-2">
                <MapPin size={16} className="me-2" />
                {donation.location}
              </div>
              <div className="d-flex align-items-center">
                <User size={16} className="me-2" />
                Donor: {donation?.donorName}
              </div>
            </div>

            {/* Contact */}
            {(donation.contactName || donation.contactPhone) && (
              <div className="border rounded p-3 mb-3">
                <p className="fw-semibold small text-muted mb-2">
                  Contact Details
                </p>
                {donation.contactName && (
                  <div className="d-flex align-items-center small">
                    <User size={14} className="me-2 text-muted" />
                    {donation.contactName}
                  </div>
                )}
                {donation.contactPhone && (
                  <div className="d-flex align-items-center small mt-1">
                    <Phone size={14} className="me-2 text-muted" />
                    {donation.contactPhone}
                  </div>
                )}
              </div>
            )}

            {/* Volunteer */}
            {donation.assignedVolunteerName && (
              <div className="alert alert-primary py-2">
                <small className="text-muted">Assigned Volunteer</small>
                <div className="fw-semibold">
                  <Truck size={14} className="me-2" />
                  {donation.assignedVolunteerName}
                </div>
              </div>
            )}

            {/* Notes */}
            {donation.notes && (
              <div className="bg-light rounded p-3 mb-3">
                <small className="text-muted">Notes</small>
                <p className="mb-0 small">{donation.notes}</p>
              </div>
            )}

            {/* Claimed */}
            {donation.claimedByName && (
              <div className="border rounded p-3 mb-3">
                <small className="text-muted">Claimed by</small>
                <div className="fw-semibold">{donation.claimedByName}</div>
                {donation.claimedAt && (
                  <small className="text-muted">
                    {new Date(donation.claimedAt).toLocaleString()}
                  </small>
                )}
              </div>
            )}

            {/* Timeline */}
            <div className="border rounded p-3">
              <small className="text-muted fw-semibold">
                Status Timeline
              </small>
              {[
                { label: "Posted", time: donation.createdAt },
                { label: "Claimed", time: donation.claimedAt },
                { label: "Picked Up", time: donation.pickedUpAt },
                { label: "Delivered", time: donation.deliveredAt },
              ].map((step) => (
                <div
                  key={step.label}
                  className="d-flex justify-content-between small mt-2"
                >
                  <span>{step.label}</span>
                  {step.time && (
                    <span className="text-muted">
                      {new Date(step.time).toLocaleString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            {userRole === "receiver" &&
              donation.status === "available" &&
              onClaim && (
                <button
                  className="btn btn-success"
                  onClick={() => onClaim(donation.id)}
                >
                  Claim Donation
                </button>
              )}

            {userRole === "donor" &&
              donation.status === "available" &&
              onCancel && (
                <button
                  className="btn btn-danger"
                  onClick={() => onCancel(donation._id)}
                >
                  Cancel Listing
                </button>
              )}

            {userRole === "donor" &&
              donation.status === "claimed" &&
              onPickedUp && (
                <button
                  className="btn btn-primary"
                  onClick={() => onPickedUp(donation._id)}
                >
                  Mark as Picked Up
                </button>
              )}

            {userRole === "donor" &&
              donation.status === "picked_up" &&
              onDelivered && (
                <button
                  className="btn btn-primary"
                  onClick={() => onDelivered(donation._id)}
                >
                  <Truck size={16} className="me-1" />
                  Mark as Delivered
                </button>
              )}

            <button className="btn btn-outline-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetailModal;