import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "./socialiconsrow.css";

const SocialIconsRow = () => {
  return (
    <div className="d-flex justify-content-center gap-3 my-4">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noreferrer"
        className="social-icon"
      >
        <FaFacebookF />
      </a>

      <a
        href="https://instagram.com"
        target="_blank"
        rel="noreferrer"
        className="social-icon"
      >
        <FaInstagram />
      </a>

      <a
        href="https://twitter.com"
        target="_blank"
        rel="noreferrer"
        className="social-icon"
      >
        <FaTwitter />
      </a>

      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noreferrer"
        className="social-icon"
      >
        <FaLinkedinIn />
      </a>
    </div>
  );
};

export default SocialIconsRow;