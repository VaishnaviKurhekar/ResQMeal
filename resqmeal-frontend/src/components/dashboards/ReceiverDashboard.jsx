import React, { useEffect, useState } from "react";
import {
  getAvailableDonations,
  claimDonation,
  getMyClaims,
} from "../../services/donationService";

import ClaimDonationModal from "../../components/modal/ClaimDonationModal";
import "./receiverdashboard.css";

const ReceiverDashboard = () => {

  const [availableDonations, setAvailableDonations] = useState([]);
  const [myClaims, setMyClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  /* ================= FETCH DONATIONS ================= */

  const fetchDonations = async () => {
    try {
      setLoading(true);

      const [availableRes, claimsRes] = await Promise.all([
        getAvailableDonations(),
        getMyClaims(),
      ]);

      setAvailableDonations(availableRes.data);
      setMyClaims(claimsRes.data);
    } catch (err) {
      console.error("Error fetching donations", err);
      alert("Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  /* ================= OPEN CLAIM MODAL ================= */

  const openClaimModal = (donation) => {
    setSelectedDonation(donation);
    setShowModal(true);
  };

  /* ================= CLAIM DONATION ================= */

  const handleClaimDonation = async (id, quantity) => {
    try {
      await claimDonation(id, quantity);
      alert("Donation claimed successfully");
      setShowModal(false);
      fetchDonations();
    } catch (err) {
      console.error(err);
      alert("Unable to claim donation");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading donations...</div>;
  }

  return (

    <div className="container mt-4">

      <h3 className="mb-4">Receiver Dashboard</h3>

      {/* ================= AVAILABLE DONATIONS ================= */}

      <h4>Available Donations</h4>

      {availableDonations.length === 0 ? (

        <div className="alert alert-info">
          No available donations at the moment.
        </div>

      ) : (

        <div className="row">

          {availableDonations.map((donation) => {

            const isExpired = new Date(donation.expiry) < new Date();

            return (

              <div className="col-md-4 mb-3" key={donation._id}>

                <div className="card shadow-sm h-100">

                  <div className="card-body">

                    <h5 className="card-title">{donation.foodTitle}</h5>

                    <p className="mb-1">
                      <strong>Available Quantity:</strong> {donation.remainingQuantity} {donation.unit}
                    </p>

                    <p className="mb-1">
                      <strong>Category:</strong> {donation.category}
                    </p>

                    <p className="mb-1">
                      <strong>Location:</strong> {donation.location}
                    </p>

                    <p className="mb-2">
                      <strong>Expiry:</strong>{" "}
                      {donation.expiryTime
                        ? new Date(donation.expiryTime).toLocaleString()
                        : "N/A"}
                    </p>

                    {donation.pickupTime && (
                      <p className="mb-2">
                        <strong>Pickup Time:</strong>{" "}
                        {new Date(donation.pickupTime).toLocaleString()}
                      </p>
                    )}

                    {isExpired && (
                      <span className="badge bg-danger">Expired</span>
                    )}

                  </div>

                  <div className="card-footer bg-white border-0">

                    <button
                      className="btn btn-primary btn-sm w-100"
                      disabled={isExpired || donation.remainingQuantity === 0}
                      onClick={() => openClaimModal(donation)}
                    >
                      Claim Donation
                    </button>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      )}

      {/* ================= MY CLAIMS ================= */}

      <h4 className="mt-5">My Claims</h4>

      {myClaims.length === 0 ? (

        <div className="alert alert-secondary">
          You have not claimed any donations yet.
        </div>

      ) : (

        <div className="row">

          {myClaims.map((claim) => (

            <div className="col-md-4 mb-3" key={claim._id}>

              <div className="card border-success h-100">

                <div className="card-body">

                  <h5 className="card-title">{claim.donation?.foodTitle}</h5>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`badge ${claim.status === 'delivered' ? 'bg-success' : claim.status === 'picked_up' ? 'bg-info' : 'bg-warning'}`}>
                      {claim.status}
                    </span>
                  </p>

                  <p className="mb-1">
                    <strong>Claimed Quantity:</strong> {claim.quantity} {claim.donation?.unit}
                  </p>

                  <p className="mb-1">
                    <strong>Location:</strong> {claim.donation?.location}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* ================= CLAIM MODAL ================= */}

      <ClaimDonationModal
        show={showModal}
        donation={selectedDonation}
        onClose={() => setShowModal(false)}
        onClaim={handleClaimDonation}
      />

    </div>
  );
};

export default ReceiverDashboard;