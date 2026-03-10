import React from "react";
import { motion } from "framer-motion";
import { Leaf, Target, Users, Globe } from "lucide-react";
import "./aboutpage.css";

const AboutPage = () => {
  return (
    <div className="min-vh-100">

      {/* Hero Section */}
      <section className="bg-hero py-5">
        <div className="container text-center py-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="display-4 fw-bold text-white">
              About ResQMeal
            </h1>

            <p
              className="mt-3 text-white-50 mx-auto"
              style={{ maxWidth: "700px" }}
            >
              We connect surplus food from restaurants, hotels, and households
              with NGOs and shelters to reduce waste and feed communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">

            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "To eliminate food waste by creating a seamless bridge between food donors and those in need.",
              },
              {
                icon: Users,
                title: "Community First",
                desc: "We believe every community deserves access to nutritious food. Our platform empowers local action.",
              },
              {
                icon: Globe,
                title: "Global Impact",
                desc: "Reducing food waste helps fight hunger and climate change simultaneously.",
              },
            ].map((item, index) => (
              <div className="col-md-4" key={item.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="card h-100 text-center p-4 shadow-card border-0 rounded-xl"
                >
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded"
                    style={{
                      width: "56px",
                      height: "56px",
                      background: "rgba(25, 135, 84, 0.1)",
                    }}
                  >
                    <item.icon size={28} className="text-success" />
                  </div>

                  <h5 className="fw-semibold mb-2">{item.title}</h5>
                  <p className="text-muted small">{item.desc}</p>
                </motion.div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-light py-5">
        <div className="container">

          <h2 className="text-center fw-bold mb-5">
            How It Works
          </h2>

          <div className="row g-4 text-center">
            {[
              {
                step: "1",
                title: "Sign Up",
                desc: "Create an account as a Donor or Receiver",
              },
              {
                step: "2",
                title: "List / Browse",
                desc: "Donors list food; Receivers browse donations",
              },
              {
                step: "3",
                title: "Claim & Connect",
                desc: "Receivers claim donations and coordinate pickup",
              },
              {
                step: "4",
                title: "Reduce Waste",
                desc: "Food reaches people instead of landfills",
              },
            ].map((step, index) => (
              <div className="col-md-3" key={step.step}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle bg-success text-white fw-bold"
                    style={{ width: "48px", height: "48px" }}
                  >
                    {step.step}
                  </div>

                  <h6 className="fw-semibold">{step.title}</h6>
                  <p className="text-muted small">{step.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;