'use client';

import React, { useState } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { CLINIC_CONFIG } from "@/data/mockData";

const AppointmentSection = () => {
  const [date, setDate] = useState<Date | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
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
      newErrors.name = "Full name is required.";
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

    if (!date) {
      newErrors.date = "Please select an appointment date.";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (fieldName: string, value: string) => {
    let errorMsg = "";

    if (fieldName === "name") {
      if (!value.trim()) {
        errorMsg = "Full name is required.";
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
    } else if (fieldName === "service") {
      if (!value) {
        errorMsg = "Please select a service.";
      }
    }

    setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    let { name, value } = e.target;
    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (loading) return;

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const payload = {
      ...formData,
      appointment_date: date ? date.toISOString().split("T")[0] : "",
    };

    try {
      // Save locally for static/demo mode
      const existing = JSON.parse(localStorage.getItem("dental_appointments") || "[]");
      existing.push({
        id: Date.now(),
        ...payload,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("dental_appointments", JSON.stringify(existing));

      // Attempt backend if online
      fetch("http://127.0.0.1:8000/user/appointments/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {
        // Safe static fallback
      });

      setSuccessMessage("Appointment booked successfully! Our clinic team at " + CLINIC_CONFIG.name + " in Thalassery looks forward to seeing you.");
      setShowSuccessModal(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });

      setDate(null);
    } catch {
      setErrorMessage("Please check your input and try again.");
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
                <span className="text-white fw-semibold">Book Appointment</span>
              </div>

              <h2 className="fw-bold display-4 mb-3 text-white">
                Book an Appointment
              </h2>
              <p className="lead mx-auto text-light" style={{ maxWidth: "680px", opacity: 0.92, fontSize: "1.15rem" }}>
                Schedule your visit to {CLINIC_CONFIG.name} for gentle, personalized, and multi-specialty dental care in Thalassery.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. BOOKING FORM SECTION ───────────────────────────────────── */}
      <section style={{ background: "#f8fafc", padding: "80px 0" }}>
        <div className="container">

          <div className="row align-items-stretch g-4">

            {/* Left Image & Timings Card */}
            <div className="col-lg-5 mb-4 mb-lg-0">
              <div className="h-100 d-flex flex-column justify-content-between bg-white p-4 rounded-4 shadow-sm border">
                <div className="overflow-hidden rounded-3 mb-4 flex-grow-1" style={{ minHeight: "320px" }}>
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
                    alt="Dental Appointment"
                    className="w-100 h-100"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="bg-light p-3 rounded-3 border">
                  <div className="d-flex align-items-center gap-2 text-primary fw-bold mb-1">
                    <i className="fas fa-clock"></i> Clinic Timings
                  </div>
                  <small className="text-muted d-block">Mon – Sat: 9:00 AM – 8:00 PM</small>
                  <small className="text-muted d-block">Sunday: 10:00 AM – 2:00 PM</small>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="col-lg-7">
              <div className="appointment-card h-100 bg-white p-4 p-md-5 rounded-4 shadow-sm border">

              {errorMessage && (
                <div className="alert alert-danger mb-3">{errorMessage}</div>
              )}

              <div className="row g-3">

                {/* Name */}
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    style={{ borderColor: errors.name ? "#ef4444" : undefined }}
                    placeholder="Full Name"
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
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    style={{ borderColor: errors.email ? "#ef4444" : undefined }}
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div style={{ color: "#ef4444", fontSize: "0.82rem", marginTop: "4px", fontWeight: 500 }}>
                      ⚠️ {errors.email}
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div className="col-md-6">
                  <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    inputMode="numeric"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    style={{ borderColor: errors.phone ? "#ef4444" : undefined }}
                    placeholder="Phone Number (10 digits)"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <div style={{ color: "#ef4444", fontSize: "0.82rem", marginTop: "4px", fontWeight: 500 }}>
                      ⚠️ {errors.phone}
                    </div>
                  )}
                </div>

                {/* Date */}
                <div className="col-md-6">
                  <DatePicker
                    selected={date}
                    onChange={(d: Date | null) => {
                      setDate(d);
                      if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
                    }}
                    placeholderText="Select Date"
                    className={`form-control ${errors.date ? "is-invalid" : ""}`}
                    minDate={new Date()}
                  />
                  {errors.date && (
                    <div style={{ color: "#ef4444", fontSize: "0.82rem", marginTop: "4px", fontWeight: 500 }}>
                      ⚠️ {errors.date}
                    </div>
                  )}
                </div>

                {/* Service */}
                <div className="col-md-6">
                  <select
                    name="service"
                    className={`form-control ${errors.service ? "is-invalid" : ""}`}
                    style={{ borderColor: errors.service ? "#ef4444" : undefined }}
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select Service</option>
                    <option>Root Canal</option>
                    <option>Teeth Cleaning</option>
                    <option>Dental Implants</option>
                    <option>Braces</option>
                    <option>Tooth Extraction</option>
                  </select>
                  {errors.service && (
                    <div style={{ color: "#ef4444", fontSize: "0.82rem", marginTop: "4px", fontWeight: 500 }}>
                      ⚠️ {errors.service}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="col-12">
                  <textarea
                    name="message"
                    className="form-control"
                    rows={4}
                    placeholder="Message (Optional)"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Button */}
                <div className="col-12 text-center">
                  <button
                    className="appointment-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Booking..." : "Book Appointment"}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      <style>{`
        .appointment-card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.06);
        }

        .form-control {
          height: 50px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
        }

        textarea.form-control {
          height: auto;
        }

        .appointment-btn {
          background: #2563eb;
          color: white;
          border: none;
          padding: 14px 40px;
          border-radius: 30px;
          font-weight: 600;
          transition: 0.3s;
        }

        .appointment-btn:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
        }
      `}</style>

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
              Appointment Booked!
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

export default AppointmentSection;