import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import "./contactpage.css";

/* Optional: replace this with Bootstrap Toast later */
const fakeToast = (title, description) => {
  alert(`${title}\n${description}`);
};

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      fakeToast("Message Sent!", "We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-vh-100">

      {/* Hero */}
      <section className="bg-hero py-5">
        <div className="container text-center py-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="display-5 fw-bold text-white">Contact Us</h1>
            <p className="text-white-50 mt-2">
              Have questions? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">

            {/* Contact Info */}
            <div className="col-lg-4">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  detail: "hello@foodrescue.org",
                  sub: "We reply within 24 hours",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  detail: "+1 (555) 123-4567",
                  sub: "Mon–Fri, 9am–6pm",
                },
                {
                  icon: MapPin,
                  title: "Office",
                  detail: "123 Green Street",
                  sub: "Eco City, EC 10001",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="d-flex align-items-start mb-4"
                >
                  <div
                    className="d-flex align-items-center justify-content-center rounded me-3"
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "rgba(25, 135, 84, 0.1)",
                    }}
                  >
                    <item.icon size={20} className="text-success" />
                  </div>
                  <div>
                    <h6 className="fw-semibold mb-1">{item.title}</h6>
                    <p className="mb-0">{item.detail}</p>
                    <small className="text-muted">{item.sub}</small>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <div className="col-lg-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card shadow-card border-0 rounded-xl p-4"
              >
                <h5 className="fw-semibold mb-4">Send us a message</h5>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">

                    <div className="col-md-6">
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Subject</label>
                      <input
                        className="form-control"
                        placeholder="How can we help?"
                        value={form.subject}
                        onChange={(e) =>
                          setForm({ ...form, subject: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Tell us more..."
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-success px-4"
                        disabled={loading}
                      >
                        {loading ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send size={16} className="me-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </form>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;