import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Plus, Package, Trash2, Eye } from "lucide-react";
import DonationDetailModal from "../../components/DonationDetailModal";
import { useNavigate } from "react-router-dom";

import {
  fetchMyDonations,
  deleteDonation,
} from "../../services/donationService";
import "./donordashboard.css";
import {
  getDonationClaims,
  approveClaim,
  rejectClaim,
} from "../../services/claimService";

const DonorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState("listings");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD DONATIONS ================= */

  const loadMyDonations = async () => {
    try {
      setLoading(true);
      const res = await fetchMyDonations();
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.donations || [];
      setDonations(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load donations");
      setDonations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyDonations();
  }, []);

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this donation?")) return;
    try {
      await deleteDonation(id);
      loadMyDonations();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* ================= APPROVE CLAIM ================= */

  const handleApproveClaim = async (claimId) => {
    try {
      await approveClaim(claimId);
      alert("Claim approved");
      loadMyDonations();
    } catch (err) {
      console.error(err);
      alert("Failed to approve claim");
    }
  };

  /* ================= REJECT CLAIM ================= */

  const handleRejectClaim = async (claimId) => {
    try {
      await rejectClaim(claimId);
      alert("Claim rejected");
      loadMyDonations();
    } catch (err) {
      console.error(err);
      alert("Failed to reject claim");
    }
  };

  /* ================= GET ALL CLAIM REQUESTS ================= */

  const [claimRequests, setClaimRequests] = useState([]);

  const loadClaimRequests = async () => {
    try {
      const allClaims = [];
      for (const donation of donations) {
        const res = await getDonationClaims(donation._id);
        const claims = res.data.filter(claim => claim.status === "pending");
        claims.forEach(claim => allClaims.push({ donation, claim }));
      }
      setClaimRequests(allClaims);
    } catch (err) {
      console.error("Failed to load claim requests", err);
    }
  };

  useEffect(() => {
    if (donations.length > 0) {
      loadClaimRequests();
    }
  }, [donations]);

  return (
    <div className="container mt-4">

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3>Donor Dashboard</h3>
          <p className="text-muted">Welcome, {user?.name || "User"}</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/donations/NewDonation")}
        >
          <Plus size={16} className="me-1" />
          New Donation
        </button>
      </div>

      {/* TABS */}

      <ul className="nav nav-tabs mb-4">
        {["listings", "requests"].map((t) => (
          <li className="nav-item" key={t}>
            <button
              className={`nav-link ${tab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>

      {/* ================= LISTINGS TAB ================= */}

      {tab === "listings" && (
        <>
          {loading && <p>Loading...</p>}

          {!loading && donations.length === 0 && (
            <p className="text-muted">No donations yet</p>
          )}

          {donations.map((d) => (
            <div className="card mb-3" key={d._id}>
              <div className="card-body d-flex justify-content-between">

                <div>
                  <h5>{d.foodTitle || "Food Item"}</h5>

                  <p className="text-muted mb-1">
                    <Package size={14} /> {d.remainingQuantity || 0} / {d.totalQuantity || 0} {d.unit || ""}
                  </p>

                  <p className="text-muted mb-1">
                    Category: {d.category || "N/A"}
                  </p>

                  <span className="badge bg-secondary">
                    {d.status || "available"}
                  </span>
                </div>

                <div className="d-flex gap-2">

                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setSelectedDonation(d)}
                  >
                    <Eye size={14} />
                  </button>

                  {d.status === "available" && (
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(d._id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}

                </div>

              </div>
            </div>
          ))}
        </>
      )}

      {/* ================= REQUESTS TAB ================= */}

      {tab === "requests" && (
        <>
          {claimRequests.length === 0 && (
            <p className="text-muted">No claim requests yet</p>
          )}

          {claimRequests.map(({ donation, claim }) => (
            <div className="card mb-3" key={claim._id}>
              <div className="card-body d-flex justify-content-between align-items-center">

                <div>
                  <h5>{donation.foodTitle || "Food Item"}</h5>

                  <p className="text-muted mb-1">
                    <Package size={14} /> {claim.quantity || 0} {donation.unit || ""}
                  </p>

                  <p className="text-muted mb-1">
                    📍 {donation.location || "Location not provided"}
                  </p>

                  <span className="badge bg-warning">
                    Claim Pending
                  </span>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setSelectedDonation(donation)}
                  >
                    <Eye size={14} />
                  </button>

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleApproveClaim(claim._id)}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRejectClaim(claim._id)}
                  >
                    Reject
                  </button>
                </div>

              </div>
            </div>
          ))}
        </>
      )}

      {/* ================= MODAL ================= */}

      {selectedDonation && (
        <DonationDetailModal
          donation={selectedDonation}
          onClose={() => setSelectedDonation(null)}
          userRole="donor"
        />
      )}

    </div>
  );
};

export default DonorDashboard;
