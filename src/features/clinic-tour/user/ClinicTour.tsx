'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ctStyles = `
  .clinic-card {
    overflow: hidden;
    border-radius: 20px;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
    border: 1px solid #e2e8f0;
    background: #ffffff;
  }
  .clinic-img {
    transition: transform 0.5s ease;
  }
  .clinic-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.15);
    border-color: #93c5fd;
  }
  .clinic-card:hover .clinic-img {
    transform: scale(1.06);
  }
`;

import { MOCK_CLINIC_TOUR, CLINIC_CONFIG } from "@/data/mockData";

const getImageUrl = (src?: string) => {
  if (!src || typeof src !== "string") return "";
  if (src.startsWith("data:") || src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
    return src;
  }
  return `/${src}`;
};

const ClinicTour = () => {
  const [tours, setTours] = useState<any[]>(MOCK_CLINIC_TOUR);
  const [loading, setLoading] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin-panel/clinic-tour/")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTours(data);
        }
      })
      .catch(() => {
        // Fallback silently to MOCK_CLINIC_TOUR
      });
  }, []);

  const handleImageError = (id: number) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  if (loading) {
    return (
      <div className="text-center py-5" style={{ paddingTop: "140px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading clinic tour...</p>
      </div>
    );
  }

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
                <span className="text-white fw-semibold">Clinic Tour</span>
              </div>

              <h2 className="fw-bold display-4 mb-3 text-white">
                Explore Our Modern Clinic
              </h2>
              <p className="lead mx-auto text-light" style={{ maxWidth: "680px", opacity: 0.92, fontSize: "1.15rem" }}>
                Step inside our state-of-the-art dental facility engineered for comfort, hygiene, and advanced care.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. CLINIC TOUR GALLERY ───────────────────────────────────── */}
      <section
        style={{
          padding: "90px 0 100px",
          background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
        }}
      >
        <div className="container">
        {/* Header */}
        <div className="text-center mb-5" style={{ maxWidth: "680px", margin: "0 auto 50px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "30px",
              background: "#eff6ff",
              color: "#2563eb",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            State-of-the-Art Facility
          </span>
          <h2 className="fw-bold mb-3" style={{ fontSize: "2.4rem", color: "#0f172a" }}>
            Explore Our Modern Clinic
          </h2>
          <p style={{ color: "#64748b", fontSize: "1.05rem", lineHeight: "1.7" }}>
            Step inside our modern dental clinic designed for comfort, hygiene, and advanced care.
            We ensure a clean, safe, and welcoming environment with cutting-edge equipment.
          </p>
        </div>

        {/* Dynamic Images */}
        <div className="row g-4 justify-content-center">
          {(() => {
            const validTours = (Array.isArray(tours) ? tours : []).filter((item) => {
              if (!item || !item.id) return false;
              const imageSrc = getImageUrl(item.image);
              return imageSrc && !Boolean(imgErrors[item.id]);
            });

            if (validTours.length === 0) {
              return (
                <div className="col-12 text-center py-5">
                  <div
                    style={{
                      background: "#ffffff",
                      borderRadius: "20px",
                      padding: "48px 24px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                      maxWidth: "500px",
                      margin: "0 auto",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🏥</div>
                    <h5 style={{ fontWeight: 700, color: "#1e293b" }}>Clinic Gallery Coming Soon</h5>
                    <p style={{ color: "#64748b", fontSize: "0.95rem", margin: 0 }}>
                      Our modern facility photos will be available shortly.
                    </p>
                  </div>
                </div>
              );
            }

            return validTours.map((item) => {
              const imageSrc = getImageUrl(item.image);
              return (
                <div className="col-lg-4 col-md-6" key={item.id}>
                  <div className="clinic-card">
                    <img
                      src={imageSrc}
                      alt=""
                      className="clinic-img"
                      onError={() => handleImageError(item.id)}
                      style={{
                        width: "100%",
                        height: "260px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>

      {/* Hover & Card Styles */}
      <style>{ctStyles}</style>
    </section>

      {/* ── 3. CALL TO ACTION BANNER ───────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)", padding: "75px 0", color: "#ffffff" }}>
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="fw-bold display-6 mb-3 text-white">
              Experience Our Clinic in Person
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
    </div>
  );
};

export default ClinicTour;