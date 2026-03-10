import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { claimDonation as claimDonationAPI } from "../services/donationService";
import {
  MapPin,
  Clock,
  Package,
  Search,
  Eye,
  Phone,
  Truck,
} from "lucide-react";

import DonationDetailModal from "../components/DonationDetailModal";
import ClaimDonationModal from "../components/modal/ClaimDonationModal";

import API from "../services/api";
import { toast } from "react-toastify";
import { markPickedUp, markDelivered } from "../services/claimService";

const FOOD_CATEGORIES = [
  { value: "cooked", label: "Cooked Food" },
  { value: "raw", label: "Raw Food" },
  { value: "packed", label: "Packed Food" },
];

const STATUS_COLORS = {
  available: "bg-success",
  claimed: "bg-warning",
  picked_up: "bg-info",
  delivered: "bg-primary",
  expired: "bg-secondary",
};

const DonationsPage = () => {
  const { isAuthenticated, user } = useAuth();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedDonationForClaim, setSelectedDonationForClaim] =
    useState(null);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await API.get("/donations");
        setDonations(res.data);
      } catch (error) {
        toast.error("Failed to load donations");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const filtered = donations.filter((d) => {
    const matchSearch =
      (d.foodTitle?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (d.location?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (d.donor?.name?.toLowerCase() || "").includes(search.toLowerCase());

    const matchCategory =
      categoryFilter === "all" || d.category === categoryFilter;

    const matchStatus = statusFilter === "all" || d.status === statusFilter;

    return matchSearch && matchCategory && matchStatus;
  });

  const handleClaim = async () => {
    if (!selectedDonationForClaim) return;

    try {
      await claimDonationAPI(selectedDonationForClaim._id);

      setDonations((prev) =>
        prev.map((d) =>
          d._id === selectedDonationForClaim._id
            ? { ...d, status: "claimed" }
            : d
        )
      );

      toast.success("Donation claimed successfully");
      setShowClaimModal(false);
      setSelectedDonationForClaim(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to claim donation"
      );
    }
  };

  const handlePickedUp = async (donationId) => {
    try {
      // Find the claim ID for this donation
      const claimsRes = await API.get(`/claims/donations/${donationId}/claims`);
      const claims = claimsRes.data;
      
      if (!claims || claims.length === 0) {
        toast.error("No claim found for this donation");
        return;
      }

      // Get the approved or assigned claim
      const claim = claims.find(c => c.status === "approved" || c.status === "assigned");
      if (!claim) {
        toast.error("No active claim found");
        return;
      }

      await markPickedUp(claim._id);

      // Update donations list with new status
      setDonations((prev) =>
        prev.map((d) =>
          d._id === donationId
            ? { ...d, status: "picked_up" }
            : d
        )
      );

      // Update selected donation for modal display
      if (selectedDonation && selectedDonation._id === donationId) {
        setSelectedDonation((prev) => ({ ...prev, status: "picked_up" }));
      }

      toast.success("Marked as picked up");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to mark as picked up"
      );
    }
  };

  const handleDelivered = async (donationId) => {
    try {
      // Find the claim ID for this donation
      const claimsRes = await API.get(`/claims/donations/${donationId}/claims`);
      const claims = claimsRes.data;
      
      if (!claims || claims.length === 0) {
        toast.error("No claim found for this donation");
        return;
      }

      // Get the picked up claim
      const claim = claims.find(c => c.status === "picked_up");
      if (!claim) {
        toast.error("Donation not yet picked up");
        return;
      }

      await markDelivered(claim._id);

      // Update donations list with new status
      setDonations((prev) =>
        prev.map((d) =>
          d._id === donationId
            ? { ...d, status: "delivered" }
            : d
        )
      );

      // Update selected donation for modal display
      if (selectedDonation && selectedDonation._id === donationId) {
        setSelectedDonation((prev) => ({ ...prev, status: "delivered" }));
      }

      toast.success("Marked as delivered");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to mark as delivered"
      );
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary mb-3"></div>
        <p className="text-muted">Loading donations...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">All Donations</h2>
        <p className="text-muted">
          Browse and search food donations ({filtered.length} results)
        </p>
      </div>

      {/* Filters */}
      <div className="row g-2 mb-4">
        <div className="col-md-6 position-relative">
          <Search
            className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            size={16}
          />
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Search by food, location, or donor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {FOOD_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="claimed">Claimed</option>
            <option value="picked_up">Picked Up</option>
            <option value="delivered">Delivered</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Donations Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <Package size={40} className="mb-2" />
          <h5>No donations found</h5>
          <p>Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="row g-3">
          {filtered.map((d) => (
            <div key={d._id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <h6 className="fw-semibold mb-0">{d.foodTitle}</h6>
                      <small className="text-muted text-capitalize">
                        {d.category?.replace("_", " & ")}
                      </small>
                    </div>

                    <span className={`badge ${STATUS_COLORS[d.status]}`}>
                      {d.status.replace("_", " ")}
                    </span>
                  </div>

                  <div className="small text-muted mb-3">
                    <div>
                      <Package size={14} /> {d.quantity} {d.unit}
                    </div>

                    <div>
                      <Clock size={14} /> Best before: {d.expiry}
                    </div>

                    <div>
                      <MapPin size={14} /> {d.location}
                    </div>

                    {d.donor?.contactPhone && (
                      <div>
                        <Phone size={14} /> {d.donor?.contactName} ·{" "}
                        {d.donor?.contactPhone}
                      </div>
                    )}

                    <div className="mt-1">
                      Donor: <strong>{d.donor?.name}</strong>
                    </div>

                    {d.assignedVolunteerName && (
                      <div>
                        <Truck size={14} /> Volunteer:{" "}
                        {d.assignedVolunteerName}
                      </div>
                    )}
                  </div>

                  <div className="d-flex gap-2">
                    {d.status === "available" && user.role === "ngo" && (
                      <button
                        className="btn btn-success btn-sm w-100"
                        onClick={() => {
                          setSelectedDonationForClaim(d);
                          setShowClaimModal(true);
                        }}
                      >
                        Claim
                      </button>
                    )}

                    <button
                      className="btn btn-outline-secondary btn-sm w-100"
                      onClick={() => setSelectedDonation(d)}
                    >
                      <Eye size={14} /> Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Donation Details Modal */}
      {selectedDonation && (
        <DonationDetailModal
          donation={selectedDonation}
          onClose={() => setSelectedDonation(null)}
          onClaim={user.role === "ngo" ? handleClaim : undefined}
          onPickedUp={handlePickedUp}
          onDelivered={handleDelivered}
          userRole={user.role}
        />
      )}

      {/* Claim Modal */}
      <ClaimDonationModal
        show={showClaimModal}
        donation={selectedDonationForClaim}
        onClose={() => setShowClaimModal(false)}
        onClaim={handleClaim}
      />
    </div>
  );
};

export default DonationsPage;