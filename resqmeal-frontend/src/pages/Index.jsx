import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Users,
  TrendingDown,
  Utensils,
  Building2,
  ShieldCheck,
} from "lucide-react";
import heroImage from "../assets/hero-food.jpg";
import "./LandingPage.css"; // Import custom CSS

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// Data arrays
const stats = [
  { value: "1.3B", label: "Tons wasted yearly", icon: TrendingDown },
  { value: "828M", label: "People go hungry", icon: Users },
  { value: "$1T", label: "Economic loss", icon: Leaf },
];

const features = [
  {
    icon: Utensils,
    title: "Donate Surplus Food",
    description:
      "Restaurants, hotels, and households can list surplus food for pickup by local NGOs and shelters.",
  },
  {
    icon: Building2,
    title: "Receive Donations",
    description:
      "NGOs and community shelters can browse available food donations and request pickups in their area.",
  },
  {
    icon: ShieldCheck,
    title: "Admin Oversight",
    description:
      "Platform administrators monitor food safety, manage users, and generate impact reports.",
  },
];

const roles = [
  {
    role: "Donor",
    desc: "Share surplus food from your restaurant, hotel, or home",
    color: "bg-primary",
    icon: Utensils,
  },
  {
    role: "Receiver",
    desc: "NGOs & shelters can collect donations in your area",
    color: "bg-success",
    icon: Users,
  },
  {
    role: "Admin",
    desc: "Manage platform operations and ensure food safety",
    color: "bg-warning",
    icon: ShieldCheck,
  },
];

const LandingPage = () => {
  return (
    <div>
      {/* HERO */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay"></div>

        <div className="container position-relative text-center text-md-start">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7 }}
            className="col-lg-7"
          >
            <span className="badge bg-success mb-3 px-3 py-2">
              🌱 Reduce Food Waste, Feed Communities
            </span>

            <h1 className="display-4 fw-bold text-shadow">
              Every Meal Matters. <span className="text-success">Zero Waste.</span>
            </h1>

            <p className="lead mt-3">
              Connect surplus food from donors with NGOs and shelters who need it.
              Our platform makes food redistribution simple, safe, and impactful.
            </p>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <Link to="/register" className="btn btn-success btn-lg">
                Start Donating <ArrowRight size={18} className="ms-2" />
              </Link>
              <Link to="/about" className="btn btn-outline-light btn-lg">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-5 border-bottom">
        <div className="container">
          <div className="row text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="col-md-4 mb-4"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="d-flex flex-column align-items-center">
                  <stat.icon size={36} className="mb-2 text-success" />
                  <h3 className="fw-bold">{stat.value}</h3>
                  <p className="text-muted">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">How It Works</h2>
            <p className="text-muted">
              Three simple roles working together to eliminate food waste
            </p>
          </div>

          <div className="row g-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="col-md-4"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="card h-100 shadow-sm text-center p-4">
                  <feature.icon size={40} className="text-success mb-3" />
                  <h5 className="fw-semibold">{feature.title}</h5>
                  <p className="text-muted">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Choose Your Role</h2>
            <p className="text-muted">
              Join as a donor, receiver, or administrator
            </p>
          </div>

          <div className="row g-4">
            {roles.map((r, i) => (
              <motion.div
                key={r.role}
                className="col-md-4"
                variants={fadeInScale}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="card h-100 shadow-sm text-center p-4">
                  <div className={`role-icon ${r.color}`}>
                    <r.icon className="text-white" />
                  </div>
                  <h5 className="fw-semibold">{r.role}</h5>
                  <p className="text-muted">{r.desc}</p>
                  <Link to="/register" className="btn btn-outline-primary w-100">
                    Join as {r.role}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 bg-success text-white text-center">
        <div className="container">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="fw-bold">Ready to Make a Difference?</h2>
            <p className="mt-3">
              Join thousands of donors and organizations already reducing food
              waste in their communities.
            </p>
            <Link to="/register" className="btn btn-light btn-lg mt-3">
              Get Started Free <ArrowRight size={18} className="ms-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;