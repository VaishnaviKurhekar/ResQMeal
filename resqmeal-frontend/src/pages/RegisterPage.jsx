import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Utensils, Building2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import "./registerpage.css";

const roleOptions = [
  { value: "donor", label: "Donor", icon: Utensils },
  { value: "ngo", label: "NGO", icon: Building2 },
  { value: "admin", label: "Admin", icon: ShieldCheck },
  {value: "volunteer", label: "Volunteer", icon: Leaf }
];

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [role, setRole] = useState("donor");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const { register } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[0-9]/.test(value)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (role === "donor" && !contactName.trim()) {
      newErrors.contactName = "Contact name is required for Donor";
    }

    if (role === "donor" && !contactPhone.trim()) {
      newErrors.contactPhone = "Contact phone is required for Donor";
    } else if (contactPhone && !/^\d{10}$/.test(contactPhone.replace(/\s+/g, ""))) {
      newErrors.contactPhone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrors({});
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role, contactName, contactPhone })
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        navigate("/dashboard");
      } else {
        // Registration failed
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-100"
        style={{ maxWidth: "420px" }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded bg-success"
            style={{ width: 48, height: 48 }}
          >
            <Leaf size={24} className="text-white" />
          </div>
          <h3 className="fw-bold">Create Account</h3>
          <p className="text-muted small">
            Join ResQMeal and reduce food waste
          </p>
        </div>

        {/* Card */}
        <div className="card shadow-sm">
          <div className="card-body p-4">
            {error && (
              <div className="alert alert-danger py-2">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Role Selection */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  I want to join as
                </label>
                <div className="row g-2">
                  {roleOptions.map((r) => {
                    const Icon = r.icon;
                    return (
                      <div className="col-5 align-items-center justify-content-center" key={r.value}>
                        <button
                          type="button"
                          onClick={() => setRole(r.value)}
                          className={`btn w-100 py-2 ${
                            role === r.value
                              ? "btn-success"
                              : "btn-outline-secondary"
                          }`}
                        >
                          <Icon size={18} className="mb-1" />
                          <div className="small">{r.label}</div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => {
                    if (!name.trim()) {
                      setErrors({...errors, name: "Full name is required"});
                    } else {
                      setErrors({...errors, name: ""});
                    }
                  }}
                  required
                />
                {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => {
                    const emailError = validateEmail(email);
                    setErrors({...errors, email: emailError});
                  }}
                  required
                />
                {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => {
                      const passwordError = validatePassword(password);
                      setErrors({...errors, password: passwordError});
                    }}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                <small className="text-muted d-block mt-1">
                  At least 6 characters, 1 uppercase letter, and 1 number
                </small>
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => {
                      if (!confirmPassword) {
                        setErrors({...errors, confirmPassword: "Please confirm your password"});
                      } else if (password !== confirmPassword) {
                        setErrors({...errors, confirmPassword: "Passwords do not match"});
                      } else {
                        setErrors({...errors, confirmPassword: ""});
                      }
                    }}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex="-1"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
              </div>

              {/* Contact Name */}
              <div className="mb-3">
                <label className="form-label">Contact Name {role === "donor" && <span className="text-danger">*</span>}</label>
                <input
                  type="text"
                  className={`form-control ${errors.contactName ? "is-invalid" : ""}`}
                  placeholder="Contact person name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  onBlur={() => {
                    if (role === "donor" && !contactName.trim()) {
                      setErrors({...errors, contactName: "Contact name is required for Donor"});
                    } else {
                      setErrors({...errors, contactName: ""});
                    }
                  }}
                />
                {errors.contactName && <div className="invalid-feedback d-block">{errors.contactName}</div>}
              </div>

              {/* Contact Phone */}
              <div className="mb-4">
                <label className="form-label">Contact Phone {role === "donor" && <span className="text-danger">*</span>}</label>
                <input
                  type="tel"
                  className={`form-control ${errors.contactPhone ? "is-invalid" : ""}`}
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  onBlur={() => {
                    if (role === "donor" && !contactPhone.trim()) {
                      setErrors({...errors, contactPhone: "Contact phone is required for Donor"});
                    } else if (contactPhone && !/^\d{10}$/.test(contactPhone.replace(/\s+/g, ""))) {
                      setErrors({...errors, contactPhone: "Please enter a valid 10-digit phone number"});
                    } else {
                      setErrors({...errors, contactPhone: ""});
                    }
                  }}
                />
                {errors.contactPhone && <div className="invalid-feedback d-block">{errors.contactPhone}</div>}
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-muted small mt-3 mb-0">
              Already have an account?{" "}
              <Link to="/login" className="fw-semibold text-success">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;