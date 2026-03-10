import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import "./profilepage.css";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    organization: "",
    bio: "",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    newDonations: true,
    pickupReminders: true,
    weeklyReport: false,
  });

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="fw-bold">Profile Settings</h1>
        <p className="text-muted">Manage your account and preferences</p>
      </div>

      <div className="row g-4">
        {/* Profile Card */}
        <div className="col-lg-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <div className="position-relative mx-auto mb-3 rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center"
                     style={{ width: 96, height: 96 }}>
                  <User size={40} className="text-success" />
                  <button className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle">
                    <Camera size={14} />
                  </button>
                </div>

                <h5 className="fw-semibold">{user?.name}</h5>
                <p className="text-muted small">{user?.email}</p>

                <span className="badge bg-secondary text-capitalize">
                  {user?.role}
                </span>

                <hr />

                <div className="text-start small">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Member since</span>
                    <span>Feb 2026</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Total donations</span>
                    <span>{user?.role === "donor" ? "12" : "8"}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Impact score</span>
                    <span className="fw-semibold text-success">92/100</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Forms */}
        <div className="col-lg-8">
          {/* Personal Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="fw-semibold mb-3">Personal Information</h5>

                <form onSubmit={handleSave} className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text"><User size={16} /></span>
                      <input
                        className="form-control"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <div className="input-group">
                      <span className="input-group-text"><Mail size={16} /></span>
                      <input
                        type="email"
                        className="form-control"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <div className="input-group">
                      <span className="input-group-text"><Phone size={16} /></span>
                      <input
                        className="form-control"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Organization</label>
                    <input
                      className="form-control"
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <div className="input-group">
                      <span className="input-group-text"><MapPin size={16} /></span>
                      <input
                        className="form-control"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Bio</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={form.bio}
                      onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <button className="btn btn-success">
                      <Save size={16} className="me-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">Notification Preferences</h5>

              {Object.keys(notifications).map((key) => (
                <div key={key} className="form-check form-switch mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={notifications[key]}
                    onChange={() =>
                      setNotifications({
                        ...notifications,
                        [key]: !notifications[key],
                      })
                    }
                  />
                  <label className="form-check-label text-capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card border-danger shadow-sm">
            <div className="card-body">
              <h5 className="text-danger fw-semibold">Danger Zone</h5>
              <p className="text-muted small">
                Once you delete your account, there is no going back.
              </p>
              <button className="btn btn-outline-danger btn-sm">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;