import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import "./notfound.css";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 px-3 bg-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {/* 404 Badge */}
        <div
          className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10"
          style={{ width: 96, height: 96 }}
        >
          <span className="fw-bold fs-1 text-success">404</span>
        </div>

        {/* Text */}
        <h1 className="fw-bold mb-2">Page Not Found</h1>
        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: 420 }}>
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>

        {/* Actions */}
        <div className="d-flex justify-content-center gap-3">
          <Link to="/" className="btn btn-success d-flex align-items-center">
            <Home size={16} className="me-2" />
            Go Home
          </Link>

          <button
            className="btn btn-outline-secondary d-flex align-items-center"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={16} className="me-2" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;