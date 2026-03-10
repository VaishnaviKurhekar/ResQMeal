import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import SocialIconsRow from "./SocialIconsRow";

const Footer = () => {
  return (
    <footer className="border-top bg-light mt-5">
      <div className="container py-5">
        <div className="row g-4">
          
          {/* Brand */}
          <div className="col-md-3">
            <Link to="/" className="d-flex align-items-center text-decoration-none mb-3">
              <div
                className="d-flex align-items-center justify-content-center me-2 rounded bg-success text-white rounded p-2"
                style={{ width: "32px", height: "32px" }}
              >
                <Leaf size={16} color="#fff" />
              </div>
              <span className="fw-bold fs-5 text-dark">
                Res<span className="text-success">QMeal</span>
              </span>
            </Link>
            <p className="text-muted small">
              Connecting surplus food with those who need it most. Together we reduce waste and feed communities.
            </p>
          </div>

          {/* Platform */}
          <div className="col-md-3">
            <h6 className="fw-semibold mb-3">Platform</h6>
            <ul className="list-unstyled small text-muted">
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none text-muted hover-link">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/donations" className="text-decoration-none text-muted">
                  Donations
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-decoration-none text-muted">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Roles */}
          <div className="col-md-3">
            <h6 className="fw-semibold mb-3">Roles</h6>
            <ul className="list-unstyled small text-muted">
              <li className="mb-2">Food Donors</li>
              <li className="mb-2">NGOs & Shelters</li>
              <li>Administrators</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h6 className="fw-semibold mb-3">Contact</h6>
            <ul className="list-unstyled small text-muted">
              <li className="mb-2">hello@foodrescue.org</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-top mt-4 pt-3 text-center small text-muted">
            <SocialIconsRow />
          © 2026 FoodRescue. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;