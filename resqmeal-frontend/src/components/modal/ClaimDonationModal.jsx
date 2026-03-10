import React, { useState, useEffect } from "react";
import "./claimdonationmodal.css";

const ClaimDonationModal = ({ show, donation, onClose, onClaim }) => {
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (donation) {
      setQuantity("");
    }
  }, [donation]);

  if (!show || !donation) return null;

  const handleSubmit = () => {
    if (!quantity || quantity <= 0) {
      alert("Enter valid quantity");
      return;
    }

    if (quantity > donation.remainingQuantity) {
      alert("Cannot claim more than available quantity");
      return;
    }

    onClaim(donation._id, quantity);
  };

  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Claim Donation</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p><strong>Food:</strong> {donation.foodTitle}</p>
            <p><strong>Available Quantity:</strong> {donation.remainingQuantity}</p>

            <input
              type="number"
              className="form-control"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button className="btn btn-primary" onClick={handleSubmit}>
              Confirm Claim
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClaimDonationModal;