'use client';

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CLINIC_CONFIG } from "@/data/mockData";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@example.com).";
    }

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (fieldName: string, value: string) => {
    let errorMsg = "";

    if (fieldName === "name") {
      if (!value.trim()) {
        errorMsg = "Name is required.";
      }
    } else if (fieldName === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        errorMsg = "Email address is required.";
      } else if (!emailRegex.test(value.trim())) {
        errorMsg = "Please enter a valid email address (e.g. name@example.com).";
      }
    } else if (fieldName === "phone") {
      const cleanPhone = value.replace(/\D/g, "");
      if (!value.trim()) {
        errorMsg = "Phone number is required.";
      } else if (cleanPhone.length !== 10) {
        errorMsg = "Phone number must be exactly 10 digits.";
      }
    } else if (fieldName === "message") {
      if (!value.trim()) {
        errorMsg = "Message is required.";
      }
    }

    setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target;
    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (loading) return;

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Save locally so demo works 100% offline/static
      const existing = JSON.parse(localStorage.getItem("dental_contact_inquiries") || "[]");
      existing.push({
        id: Date.now(),
        ...formData,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem("dental_contact_inquiries", JSON.stringify(existing));

      // Attempt backend if online
      fetch("http://127.0.0.1:8000/admin-panel/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch(() => {
        // Safe static fallback
      });

      setSuccessMessage("Thank you for contacting us! Your inquiry has been submitted successfully. Our team at " + CLINIC_CONFIG.name + " in Thalassery will reach out to you shortly.");
      setShowSuccessModal(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch {
      setErrorMessage("Something went wrong. Please check your details and try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1e293b", overflowX: "hidden" }}>
      {/* ── 1. HERO BANNER ────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #1e40af 100%)",
          padding: "140px 0 75px",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(37,99,235,0.45) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div className="container position-relative">
          <div className="row justify-content-center text-center">
            <motion.div
              className="col-lg-9"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Breadcrumb */}
              <div className="d-flex align-items-center justify-content-center gap-2 mb-3" style={{ fontSize: "0.9rem", color: "#93c5fd" }}>
                <Link href="/" className="text-decoration-none" style={{ color: "#93c5fd" }}>Home</Link>
                <span>/</span>
                <span className="text-white fw-semibold">Contact Us</span>
              </div>

              <h2 className="fw-bold display-4 mb-3 text-white">
                Contact Us
              </h2>
              <p className="lead mx-auto text-light" style={{ maxWidth: "680px", opacity: 0.92, fontSize: "1.15rem" }}>
                Book your appointment or reach out to us for consultation and inquiries.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. CONTACT CONTENT ───────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          padding: "80px 0 100px",
          background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
          color: "#000",
        }}
      >
        <div className="container">

        <div className="row">

          {/* Left - Contact Info */}
          <div className="col-lg-5 mb-4">
            <div className="p-4 p-md-5 rounded-4 bg-white shadow-sm border h-100">
              <h4 className="fw-bold mb-4" style={{ color: "#0f172a" }}>
                Clinic Details
              </h4>

              {/* Address */}
              <div className="d-flex align-items-start gap-3 mb-4">
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: "#fef2f2",
                    color: "#ef4444",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.15rem",
                    flexShrink: 0,
                  }}
                >
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1" style={{ color: "#0f172a", fontSize: "0.95rem" }}>
                    Clinic Location
                  </h6>
                  <p className="text-muted mb-0" style={{ fontSize: "0.92rem", lineHeight: "1.5" }}>
                    {CLINIC_CONFIG.name},<br />{CLINIC_CONFIG.location}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="d-flex align-items-start gap-3 mb-4">
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: "#eff6ff",
                    color: "#2563eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.15rem",
                    flexShrink: 0,
                  }}
                >
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1" style={{ color: "#0f172a", fontSize: "0.95rem" }}>
                    Phone Number
                  </h6>
                  <a
                    href={`tel:${CLINIC_CONFIG.phone}`}
                    className="fw-semibold text-decoration-none"
                    style={{ color: "#2563eb", fontSize: "0.95rem" }}
                  >
                    {CLINIC_CONFIG.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="d-flex align-items-start gap-3 mb-4">
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: "#fefce8",
                    color: "#ca8a04",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.15rem",
                    flexShrink: 0,
                  }}
                >
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1" style={{ color: "#0f172a", fontSize: "0.95rem" }}>
                    Email Address
                  </h6>
                  <a
                    href={`mailto:${CLINIC_CONFIG.email}`}
                    className="text-muted text-decoration-none"
                    style={{ fontSize: "0.92rem" }}
                  >
                    {CLINIC_CONFIG.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="d-flex align-items-start gap-3">
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: "#f0fdf4",
                    color: "#16a34a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.15rem",
                    flexShrink: 0,
                  }}
                >
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1" style={{ color: "#0f172a", fontSize: "0.95rem" }}>
                    Working Hours
                  </h6>
                  <p className="text-muted mb-0" style={{ fontSize: "0.92rem", lineHeight: "1.5" }}>
                    Mon - Sat: 9:00 AM - 7:00 PM<br />
                    Sunday: 9:00 AM - 1:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="col-lg-7">
            <div className="p-4 p-md-5 rounded-4 bg-white shadow-sm border">
              <h4 className="fw-bold mb-4" style={{ color: "#0f172a" }}>
                Send Us a Message
              </h4>

              {/* Error Message */}
              {errorMessage && (
                <div className="alert alert-danger mb-3">
                  {errorMessage}
                </div>
              )}

              <form noValidate onSubmit={handleSubmit}>
                <div className="row">

                  {/* Name */}
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      style={{ borderColor: errors.name ? "#ef4444" : undefined }}
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div style={{ color: "#ef4444", fontSize: "0.82rem", marginTop: "4px", fontWeight: 500 }}>
                        ⚠️ {errors.name}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      style={{ borderColor: errors.email ? "#ef4444" : undefined }}
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div style={{ color: "#ef4444", fontSize: "0.82rem", marginTop: "4px", fontWeight: 500 }}>
                        ⚠️ {errors.email}
                      </div>
                    )}
                  </div>

                </div>

                <div className="row">

                  {/* Phone */}
                  <div className="col-md-6 mb-3">
                    <input
                      type="tel"
                      name="phone"
                      maxLength={10}
                      inputMode="numeric"
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      style={{ borderColor: errors.phone ? "#ef4444" : undefined }}
                      placeholder="Your Phone Number (10 digits)"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <div style={{ color: "#ef4444", fontSize: "0.82rem", marginTop: "4px", fontWeight: 500 }}>
                        ⚠️ {errors.phone}
                      </div>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      placeholder="Subject (Optional)"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                {/* Message */}
                <div className="mb-3">
                  <textarea
                    name="message"
                    className={`form-control ${errors.message ? "is-invalid" : ""}`}
                    style={{ borderColor: errors.message ? "#ef4444" : undefined }}
                    rows={5}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && (
                    <div style={{ color: "#ef4444", fontSize: "0.82rem", marginTop: "4px", fontWeight: 500 }}>
                      ⚠️ {errors.message}
                    </div>
                  )}
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 fw-bold shadow-sm"
                  disabled={loading}
                  style={{
                    background: loading ? "#94a3b8" : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Sending Message...
                    </span>
                  ) : (
                    <span>
                      <i className="fas fa-paper-plane me-2"></i> Send Message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Google Map */}
        <div className="mt-5 p-3 bg-white shadow rounded">
          <iframe
            title="clinic-location"
            src={CLINIC_CONFIG.mapEmbed}
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: "10px" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>

    {/* Success Popup Modal */}
    {showSuccessModal && (
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "20px",
        }}
        onClick={() => setShowSuccessModal(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "40px 32px",
            maxWidth: "480px",
            width: "100%",
            textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "#f0fdf4",
              border: "2px solid #bbf7d0",
              color: "#16a34a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.2rem",
              margin: "0 auto 20px",
            }}
          >
            <i className="fas fa-check-circle"></i>
          </div>

          <h4 className="fw-bold mb-2" style={{ color: "#0f172a", fontSize: "1.4rem" }}>
            Message Submitted!
          </h4>

          <p style={{ color: "#64748b", fontSize: "0.96rem", lineHeight: "1.6", marginBottom: "28px" }}>
            {successMessage}
          </p>

          <button
            onClick={() => setShowSuccessModal(false)}
            className="btn btn-primary w-100 py-3 fw-bold"
            style={{
              borderRadius: "14px",
              fontSize: "1rem",
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              boxShadow: "0 8px 20px rgba(37,99,235,0.3)",
              border: "none",
            }}
          >
            OK
          </button>
        </motion.div>
      </div>
    )}
    </div>
  );
};

export default Contact;