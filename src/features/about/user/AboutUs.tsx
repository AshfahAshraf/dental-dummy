'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CLINIC_CONFIG } from "@/data/mockData";

const AboutUs = () => {
  const featureList = [
    {
      icon: "fas fa-microscope",
      title: "Advanced Technology",
      sub: "Digital 3D Scans & X-Rays",
    },
    {
      icon: "fas fa-hand-holding-heart",
      title: "Gentle Care",
      sub: "Painless & Anxiety-Free",
    },
    {
      icon: "fas fa-user-doctor",
      title: "Expert Specialists",
      sub: "Personalized Treatment",
    },
    {
      icon: "fas fa-clock",
      title: "Flexible Timings",
      sub: "Prompt Appointments",
    },
  ];

  const statsList = [
    { number: "10,000+", label: "Happy Patients" },
    { number: "15+", label: "Specialized Treatments" },
    { number: "100%", label: "Safety & Sterilization" },
    { number: "4.9 ★", label: "Patient Rating" },
  ];

  const pillarsList = [
    {
      icon: "fas fa-seedling",
      title: "Our Beginning",
      desc: "Dr. Muhammed's Dental Care was founded with a singular purpose: to bring accessible, transparent, and multi-specialty dental care to Thalassery. We created a welcoming space where dental visits are anxiety-free and focused on patient comfort.",
    },
    {
      icon: "fas fa-tooth",
      title: "Modern Dental Precision",
      desc: "We continually upgrade our equipment with low-radiation digital radiography, high-precision intraoral tools, and premium bio-compatible materials to ensure long-lasting, natural-looking results.",
    },
    {
      icon: "fas fa-heart-pulse",
      title: "Patient-First Philosophy",
      desc: "We believe informed patients are confident patients. Our doctors walk you through every step of your treatment plan with full transparency, fair pricing, and gentle techniques.",
    },
    {
      icon: "fas fa-eye",
      title: "Our Long-Term Vision",
      desc: "To be Thalassery and North Malabar's leading dental health center known for excellence in orthodontics, root canals, pediatric dentistry, and cosmetic smile makeovers that boost self-confidence for life.",
    },
  ];

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
          animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.45, 0.25] }}
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
                <span className="text-white fw-semibold">About Us</span>
              </div>

              <h2 className="fw-bold display-4 mb-3 text-white">
                About {CLINIC_CONFIG.name}
              </h2>
              <p className="lead mx-auto text-light" style={{ maxWidth: "680px", opacity: 0.92, fontSize: "1.15rem" }}>
                Pioneering modern, gentle, and precision-driven dental care in Thalassery, Kannur. Dedicated to healthy smiles for life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN ABOUT & CLINIC OVERVIEW ───────────────────────────── */}
      <section style={{ padding: "90px 0", background: "#ffffff" }}>
        <div className="container">
          <div className="row align-items-center gy-5">

            {/* Left Image Grid Collage */}
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <div className="position-relative pe-lg-3">
                {/* Main Large Image */}
                <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 40px rgba(15,23,42,0.12)" }}>
                  <img
                    src="/images/about_image1.jpg"
                    alt="Dr Muhammed's Dental Care Clinic"
                    className="img-fluid w-100"
                    style={{ height: "420px", objectFit: "cover" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              className="col-lg-6 ps-lg-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <span
                className="badge fw-bold px-3 py-2 rounded-pill mb-3"
                style={{
                  background: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                  letterSpacing: "1px",
                  fontSize: "0.82rem",
                  textTransform: "uppercase"
                }}
              >
                WHO WE ARE
              </span>

              <h2 className="fw-bold display-6 mb-3" style={{ color: "#0f172a", fontSize: "2.2rem" }}>
                Modern Dental Care Designed For Confident Smiles
              </h2>

              <h6 className="text-primary fw-semibold mb-3">
                <i className="fas fa-location-dot me-2"></i> Thalassery, Kannur, Kerala
              </h6>

              <p className="text-muted mb-4" style={{ lineHeight: "1.7", fontSize: "1.02rem" }}>
                At {CLINIC_CONFIG.name}, we combine advanced clinical techniques with a warm, patient-first approach. Whether you require precision orthodontics, cosmetic smile restoration, root canals, or routine hygiene checks, our focus is always on pain-free procedures and long-term oral wellness in Thalassery.
              </p>

              {/* Key Features List with Scroll Stagger */}
              <div className="row g-3 mb-4">
                {featureList.map((item, index) => (
                  <motion.div
                    className="col-sm-6"
                    key={index}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                  >
                    <div className="d-flex align-items-center gap-3 p-3 about-feature-card">
                      <div className="d-flex align-items-center justify-content-center feature-icon-box">
                        <i className={item.icon}></i>
                      </div>
                      <div>
                        <div className="fw-bold feature-title">{item.title}</div>
                        <small className="text-muted" style={{ fontSize: "0.78rem" }}>{item.sub}</small>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <motion.div
                className="d-flex flex-wrap gap-3 mt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="d-flex flex-wrap gap-3">
                  <Link href="/book-appointment" className="btn btn-primary btn-lg px-4 shadow-sm about-btn-hover" style={{ borderRadius: "12px", fontSize: "0.98rem", fontWeight: 600 }}>
                    <i className="fas fa-calendar-check me-2"></i> Book Consultation
                  </Link>
                  <Link href="/team" className="btn btn-outline-primary btn-lg px-4 about-btn-hover" style={{ borderRadius: "12px", fontSize: "0.98rem", fontWeight: 600 }}>
                    Meet Our Doctors <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. STATS HIGHLIGHTS BAR WITH SCROLL REVEAL ─────────────────── */}
      <section style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", padding: "60px 0" }}>
        <div className="container">
          <div className="row g-4 text-center">

            {statsList.map((stat, index) => (
              <motion.div
                className="col-md-3 col-6"
                key={index}
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
              >
                <div className="p-4 bg-white rounded-4 shadow-sm h-100 border about-stat-card">
                  <div className="fw-extrabold display-6 text-primary mb-1">{stat.number}</div>
                  <div className="text-muted fw-medium" style={{ fontSize: "0.9rem" }}>{stat.label}</div>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ── 4. OUR STORY & CORE PILLARS WITH SCROLL ANIMATIONS ─────────── */}
      <section style={{ padding: "95px 0", background: "#ffffff" }}>
        <div className="container">

          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill mb-2" style={{ letterSpacing: "1px" }}>
              OUR JOURNEY & VALUES
            </span>
            <h2 className="fw-bold display-6" style={{ color: "#0f172a" }}>
              Building Healthy Smiles With Care & Excellence
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "580px" }}>
              Discover our core commitments, mission, and patient-first approach to quality dental health.
            </p>
          </motion.div>

          <div className="row g-4">
            {pillarsList.map((pillar, index) => (
              <motion.div
                className="col-lg-6"
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.14 }}
              >
                <div className="p-4 p-md-5 rounded-4 h-100 shadow-sm border about-pillar-card" style={{ background: "#ffffff", borderLeft: "5px solid #2563eb" }}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center pillar-icon" style={{ width: "50px", height: "50px", fontSize: "1.2rem", flexShrink: 0 }}>
                      <i className={pillar.icon}></i>
                    </div>
                    <h4 className="fw-bold mb-0" style={{ color: "#0f172a" }}>{pillar.title}</h4>
                  </div>
                  <p className="text-muted mb-0" style={{ lineHeight: "1.7" }}>
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. CLINIC AMBIANCE & STERILIZATION ────────────────────────── */}
      <section style={{ background: "#f8fafc", padding: "90px 0" }}>
        <div className="container">
          <div className="row align-items-center gy-5">

            <motion.div
              className="col-lg-6 order-lg-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 40px rgba(15,23,42,0.1)" }}>
                <img
                  src="/images/dental_chair.jpg"
                  alt="Dr Muhammed's Dental Clinic Chair"
                  className="img-fluid w-100"
                  style={{ height: "390px", objectFit: "cover" }}
                />
              </div>
            </motion.div>

            <motion.div
              className="col-lg-6 order-lg-1 pe-lg-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill mb-3" style={{ letterSpacing: "1px" }}>
                HYGIENE & INFRASTRUCTURE
              </span>
              <h2 className="fw-bold display-6 mb-3" style={{ color: "#0f172a" }}>
                State-of-the-Art Clinic Facility
              </h2>
              <p className="text-muted mb-4" style={{ lineHeight: "1.7" }}>
                Your safety is non-negotiable. Our clinic adheres to strict international hygiene and sterilization protocols to maintain a sterile, comfortable environment for every visitor.
              </p>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-start gap-3">
                  <i className="fas fa-circle-check text-primary mt-1" style={{ fontSize: "1.2rem" }}></i>
                  <div>
                    <strong style={{ color: "#0f172a" }}>Class-B Autoclave Sterilization</strong>
                    <div className="text-muted" style={{ fontSize: "0.9rem" }}>Strict 100% infection control for all instruments.</div>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <i className="fas fa-circle-check text-primary mt-1" style={{ fontSize: "1.2rem" }}></i>
                  <div>
                    <strong style={{ color: "#0f172a" }}>Ergonomic Treatment Chairs</strong>
                    <div className="text-muted" style={{ fontSize: "0.9rem" }}>Maximum comfort during short or extended procedures.</div>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <i className="fas fa-circle-check text-primary mt-1" style={{ fontSize: "1.2rem" }}></i>
                  <div>
                    <strong style={{ color: "#0f172a" }}>Digital Radiography</strong>
                    <div className="text-muted" style={{ fontSize: "0.9rem" }}>Ultra-low radiation X-rays for instant, safe diagnosis.</div>
                  </div>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 6. CALL TO ACTION BANNER ───────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)", padding: "75px 0", color: "#ffffff" }}>
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="fw-bold display-6 mb-3 text-white">
              Ready to Transform Your Dental Experience?
            </h2>
            <p className="lead text-light mb-4 mx-auto" style={{ maxWidth: "600px", opacity: 0.9 }}>
              Schedule your consultation with {CLINIC_CONFIG.name} today and step into a world of gentle, precision oral health in Thalassery.
            </p>

            <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
              <Link href="/book-appointment" className="btn btn-light btn-lg px-4 text-primary fw-bold shadow-sm about-btn-hover" style={{ borderRadius: "12px" }}>
                <i className="fas fa-calendar-check me-2"></i> Book Appointment Now
              </Link>
              <a href={`tel:${CLINIC_CONFIG.phone}`} className="btn btn-outline-light btn-lg px-4 fw-bold about-btn-hover" style={{ borderRadius: "12px" }}>
                <i className="fas fa-phone-alt me-2"></i> Call {CLINIC_CONFIG.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CSS Hover Styles */}
      <style>{`
        .about-feature-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .about-feature-card:hover {
          transform: translateY(-6px);
          background: #ffffff;
          border-color: #93c5fd;
          box-shadow: 0 16px 32px rgba(37, 99, 235, 0.12);
        }

        .feature-icon-box {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          background: #2563eb;
          color: #ffffff;
          border-radius: 12px;
          transition: all 0.35s ease;
        }

        .about-feature-card:hover .feature-icon-box {
          transform: scale(1.12) rotate(-5deg);
          background: #1d4ed8;
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35);
        }

        .feature-title {
          font-size: 0.92rem;
          color: #0f172a;
          transition: color 0.3s ease;
        }

        .about-feature-card:hover .feature-title {
          color: #2563eb;
        }

        .about-stat-card {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .about-stat-card:hover {
          transform: translateY(-8px);
          border-color: #3b82f6 !important;
          box-shadow: 0 18px 36px rgba(37, 99, 235, 0.15) !important;
        }

        .about-pillar-card {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .about-pillar-card:hover {
          transform: translateY(-8px);
          border-left-color: #1d4ed8 !important;
          box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12) !important;
        }

        .about-pillar-card:hover .pillar-icon {
          background-color: #2563eb !important;
          color: #ffffff !important;
          transform: scale(1.1);
        }

        .pillar-icon {
          transition: all 0.35s ease;
        }

        .about-btn-hover {
          transition: all 0.3s ease !important;
        }

        .about-btn-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25) !important;
        }
      `}</style>

    </div>
  );
};

export default AboutUs;