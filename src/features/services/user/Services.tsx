'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MOCK_SERVICES, CLINIC_CONFIG } from "@/data/mockData";

const Services = () => {
  const [services, setServices] = useState<any[]>(MOCK_SERVICES);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin-panel/services/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch services");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(() => {
        // Fallback silently to static mock services
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
                <span className="text-white fw-semibold">Services</span>
              </div>

              <h2 className="fw-bold display-4 mb-3 text-white">
                Our Dental Services
              </h2>
              <p className="lead mx-auto text-light" style={{ maxWidth: "680px", opacity: 0.92, fontSize: "1.15rem" }}>
                Comprehensive multi-specialty dental solutions engineered with advanced digital technology and painless patient care.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN SERVICES GRID ─────────────────────────────────────── */}
      <section style={{ padding: "90px 0", background: "#f8fafc" }}>
        <div className="container">

          {/* Section Header */}
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
              SPECIALIZED TREATMENTS
            </span>
            <h2 className="fw-bold display-6" style={{ color: "#0f172a" }}>
              Explore Our Complete Range of Care
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "580px" }}>
              From preventative hygiene to complex smile makeovers and precision orthodontics.
            </p>
          </motion.div>

          {/* Grid Content */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading dental services...</p>
            </div>
          ) : services.length > 0 ? (
            <div className="row g-4 justify-content-center">
              {services.map((item, index) => (
                <motion.div
                  className="col-lg-4 col-md-6"
                  key={item.id || index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.12 }}
                >
                  <div className="service-card h-100 shadow-sm border rounded-4 bg-white overflow-hidden d-flex flex-column">

                    {/* Image (Only show if uploaded image exists in MySQL) */}
                    {item.image && (
                      <div className="service-img-wrap overflow-hidden position-relative">
                        <img
                          src={
                            item.image.startsWith("data:") || item.image.startsWith("http") || item.image.startsWith("/")
                              ? item.image
                              : `/${item.image}`
                          }
                          alt={item.title}
                          className="service-img w-100"
                          style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", objectPosition: "center" }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                    )}

                    {/* Card Body */}
                    <div className="p-4 d-flex flex-column flex-grow-1">
                      <h4 className="fw-bold mb-3" style={{ color: "#0f172a", fontSize: "1.25rem" }}>
                        {item.title}
                      </h4>

                      <p className="text-muted mb-4 flex-grow-1" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                        {item.description
                          ? item.description.slice(0, 110) + (item.description.length > 110 ? "..." : "")
                          : "High-precision dental care tailored to your individual oral health needs."}
                      </p>

                      {/* Action Links */}
                      <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-auto">
                        <button
                          onClick={() => router.push(`/service/${item.slug}`)}
                          className="btn btn-link text-primary fw-semibold p-0 text-decoration-none border-0 bg-transparent"
                          style={{ fontSize: "0.95rem" }}
                        >
                          Read Details <i className="fas fa-arrow-right ms-1"></i>
                        </button>

                        <Link
                          href="/book-appointment"
                          className="btn btn-sm btn-outline-primary fw-medium rounded-pill px-3"
                        >
                          Book Now
                        </Link>
                      </div>

                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted fs-5">No services currently listed.</p>
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
              Unsure Which Treatment You Need?
            </h2>
            <p className="lead text-light mb-4 mx-auto" style={{ maxWidth: "600px", opacity: 0.9 }}>
              Book an initial consultation with our expert dental team and let us craft your personalized treatment plan.
            </p>

            <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
              <Link href="/book-appointment" className="btn btn-light btn-lg px-4 text-primary fw-bold shadow-sm" style={{ borderRadius: "12px" }}>
                <i className="fas fa-calendar-check me-2"></i> Book Consultation
              </Link>
              <a href={`tel:${CLINIC_CONFIG.phone}`} className="btn btn-outline-light btn-lg px-4 fw-bold" style={{ borderRadius: "12px" }}>
                <i className="fas fa-phone-alt me-2"></i> Call {CLINIC_CONFIG.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Styling */}
      <style>{`
        .service-card {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12) !important;
          border-color: #93c5fd !important;
        }
        .service-img {
          transition: transform 0.4s ease;
        }
        .service-card:hover .service-img {
          transform: scale(1.06);
        }
      `}</style>

    </div>
  );
};

export default Services;
