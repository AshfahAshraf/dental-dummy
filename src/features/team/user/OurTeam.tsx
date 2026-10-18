'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const DoctorCardImage = ({ doc }: { doc: any }) => {
  const [imgError, setImgError] = useState(false);

  const getImageUrl = (img?: string) => {
    if (!img) return "";
    if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:") || img.startsWith("/")) return img;
    return `/${img}`;
  };

  const getInitials = (name?: string) => {
    if (!name) return "DR";
    const cleanName = name.replace(/^(Dr\.\s*|Dr\s*)/i, "").trim();
    const parts = cleanName.split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return cleanName.slice(0, 2).toUpperCase();
  };

  const src = getImageUrl(doc.image);

  if (!src || imgError) {
    const initials = getInitials(doc.name);
    return (
      <div
        className="w-100 h-100 d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #1e40af 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: "absolute",
            width: "140px",
            height: "140px",
            background: "radial-gradient(circle, rgba(37,99,235,0.4) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            width: "95px",
            height: "95px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(8px)",
            border: "2px solid rgba(255, 255, 255, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25)",
            zIndex: 1,
          }}
        >
          <span className="fw-bold text-white" style={{ fontSize: "2.2rem", letterSpacing: "1px" }}>
            {initials}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={doc.name}
      className="team-img w-100 h-100"
      style={{ objectFit: "cover", objectPosition: "center 15%" }}
      onError={() => setImgError(true)}
    />
  );
};

import { MOCK_DOCTORS, CLINIC_CONFIG } from "@/data/mockData";

const OurTeam = () => {
  const [doctors, setDoctors] = useState<any[]>(MOCK_DOCTORS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin-panel/doctors/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch team");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDoctors(data);
        }
      })
      .catch(() => {
        // Fallback silently to MOCK_DOCTORS
      });
  }, []);

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
                <span className="text-white fw-semibold">Our Team</span>
              </div>

              <h2 className="fw-bold display-4 mb-3 text-white">
                Meet Our Expert Doctors
              </h2>
              <p className="lead mx-auto text-light mb-4" style={{ maxWidth: "680px", opacity: 0.92, fontSize: "1.15rem" }}>
                Experienced dental specialists dedicated to precision treatment, patient comfort, and lifelong smile transformations.
              </p>
              <div className="mt-4">
                <Link href="/book-appointment" className="btn btn-primary btn-lg px-4 py-2.5 fw-bold shadow-lg" style={{ borderRadius: "12px", background: "linear-gradient(135deg, #2563eb, #1d4ed8)", border: "none" }}>
                  <i className="fas fa-calendar-alt me-2"></i> Book Appointment
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. DOCTORS GRID ───────────────────────────────────────────── */}
      <section style={{ padding: "90px 0", background: "#f8fafc" }}>
        <div className="container">

          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <span
              className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill mb-2"
              style={{ letterSpacing: "1px", textTransform: "uppercase" }}
            >
              OUR SPECIALISTS
            </span>
            <h2 className="fw-bold display-6" style={{ color: "#0f172a" }}>
              Compassionate & Skilled Practitioners
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "560px" }}>
              Our team brings years of specialized experience in orthodontics, root canals, implants, and pediatric care.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading doctor profiles...</p>
            </div>
          ) : doctors.length > 0 ? (
            <div className="row g-4 justify-content-center">
              {doctors.map((doc, index) => (
                <motion.div
                  className="col-lg-4 col-md-6 col-sm-10"
                  key={doc.id || index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.12 }}
                >
                  <div className="team-card h-100 bg-white rounded-4 shadow-sm border overflow-hidden d-flex flex-column">

                    {/* Image Container */}
                    <div className="team-img-wrap overflow-hidden position-relative" style={{ background: "#f1f5f9", aspectRatio: "4/4" }}>
                      <DoctorCardImage doc={doc} />
                    </div>

                    {/* Content */}
                    <div className="p-4 text-center d-flex flex-column flex-grow-1 justify-content-center">
                      <h4 className="fw-bold mb-1" style={{ color: "#0f172a", fontSize: "1.25rem" }}>
                        {doc.name}
                      </h4>
                      <p className="text-primary fw-semibold mb-0" style={{ fontSize: "0.9rem" }}>
                        {doc.role}
                      </p>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted fs-5">No doctor profiles available at the moment.</p>
            </div>
          )}

        </div>
      </section>

      {/* ── 4. CALL TO ACTION BANNER ───────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)", padding: "75px 0", color: "#ffffff" }}>
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="fw-bold display-6 mb-3 text-white">
              Schedule a Visit With Our Dental Experts
            </h2>
            <p className="lead text-light mb-4 mx-auto" style={{ maxWidth: "600px", opacity: 0.9 }}>
              Experience personalized, gentle, and multi-specialty care at {CLINIC_CONFIG.name}, Thalassery.
            </p>

            <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
              <Link href="/book-appointment" className="btn btn-light btn-lg px-4 text-primary fw-bold shadow-sm" style={{ borderRadius: "12px" }}>
                <i className="fas fa-calendar-check me-2"></i> Book Appointment Now
              </Link>
              <a href={`tel:${CLINIC_CONFIG.phone}`} className="btn btn-outline-light btn-lg px-4 fw-bold" style={{ borderRadius: "12px" }}>
                <i className="fas fa-phone-alt me-2"></i> Call {CLINIC_CONFIG.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CSS Styling */}
      <style>{`
        .team-card {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12) !important;
          border-color: #93c5fd !important;
        }
        .team-img {
          transition: transform 0.4s ease;
        }
        .team-card:hover .team-img {
          transform: scale(1.05);
        }
      `}</style>

    </div>
  );
};

export default OurTeam;