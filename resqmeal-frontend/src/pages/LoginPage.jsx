import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import "./loginpage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      setEmailError("Email is required");
      return false;
    } 
    else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email");
      return false;
    }

    setEmailError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) return;

    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-overlay px-3">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-100"
          style={{ maxWidth: "420px" }}
        >

          {/* Header */}
          <div className="text-center mb-4">
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle bg-success"
              style={{ width: 52, height: 52 }}
            >
              <Leaf className="text-white" size={26} />
            </div>

            <h3 className="fw-bold">Welcome Back</h3>

            <p className="text-muted small">
              Sign in to your ResQMeal account
            </p>
          </div>

          {/* Login Card */}
          <div className="card shadow-sm login-card">
            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>

                {/* Error */}
                {error && (
                  <div className="alert alert-danger py-2">
                    {error}
                  </div>
                )}

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email
                  </label>

                  <input
                    type="email"
                    className={`form-control ${emailError ? "is-invalid" : ""}`}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => validateEmail(email)}
                    required
                  />

                  {emailError && (
                    <div className="invalid-feedback d-block">
                      {emailError}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Password
                  </label>

                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex="-1"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Sign In
                </button>

              </form>

              {/* Footer */}
              <p className="text-center text-muted small mt-4 mb-0">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="fw-semibold text-success"
                >
                  Sign Up
                </Link>
              </p>

            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default LoginPage;