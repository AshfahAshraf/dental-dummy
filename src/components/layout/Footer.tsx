'use client';

import React from "react";
import Link from "next/link";
import { CLINIC_CONFIG } from "@/data/mockData";

const Footer = () => {
  return (
    <footer className="footer-dark position-relative overflow-hidden">
      <div className="container position-relative z-1">
        <div className="row gy-5">

          {/* ── 1. Brand Column ── */}
          <div className="col-lg-3 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src="/images/logo.png"
                alt={CLINIC_CONFIG.name}
                style={{ height: "48px", width: "auto", objectFit: "contain" }}
              />
              <div>
                <h5 className="fw-bold mb-0 text-white" style={{ fontSize: "0.95rem", letterSpacing: "0.2px" }}>
                  {CLINIC_CONFIG.fullName.split("&")[0].trim()}
                </h5>
                <small style={{ color: "#94a3b8", fontSize: "0.68rem", letterSpacing: "0.5px", fontWeight: "600", display: "block", marginTop: "2px" }}>
                  MULTI SPECIALITY CLINIC • THALASSERY
                </small>
              </div>
            </div>

            <p style={{ color: "#94a3b8", fontSize: "0.92rem", lineHeight: "1.65" }}>
              Modern multi-specialty dental care engineered with advanced digital technology, gentle techniques, and painless patient-first treatment.
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-2 mt-4">
              <a
                href="https://instagram.com/your_username"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn instagram-btn"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>

              <a
                href={`https://wa.me/${CLINIC_CONFIG.whatsapp}?text=Hello%2C%20I%20would%20like%20to%20book%20a%20dental%20consultation`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn whatsapp-btn"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>

              <a
                href={`tel:${CLINIC_CONFIG.phone}`}
                className="social-btn phone-btn"
                aria-label="Phone"
              >
                <i className="fas fa-phone-alt"></i>
              </a>
            </div>
          </div>

          {/* ── 2. Quick Links ── */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="footer-links">
              <li><Link href="/"><i className="fas fa-chevron-right me-2 text-primary" style={{ fontSize: "0.7rem" }}></i>Home</Link></li>
              <li><Link href="/about"><i className="fas fa-chevron-right me-2 text-primary" style={{ fontSize: "0.7rem" }}></i>About Us</Link></li>
              <li><Link href="/services"><i className="fas fa-chevron-right me-2 text-primary" style={{ fontSize: "0.7rem" }}></i>Services</Link></li>
              <li><Link href="/team"><i className="fas fa-chevron-right me-2 text-primary" style={{ fontSize: "0.7rem" }}></i>Our Team</Link></li>
              <li><Link href="/before-after"><i className="fas fa-chevron-right me-2 text-primary" style={{ fontSize: "0.7rem" }}></i>Before &amp; After</Link></li>
              <li><Link href="/contact"><i className="fas fa-chevron-right me-2 text-primary" style={{ fontSize: "0.7rem" }}></i>Contact Us</Link></li>
            </ul>
          </div>

          {/* ── 3. Services ── */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-heading">Our Services</h6>
            <ul className="footer-links">
              <li><Link href="/services"><i className="fas fa-tooth me-2 text-info" style={{ fontSize: "0.75rem" }}></i>Root Canal</Link></li>
              <li><Link href="/services"><i className="fas fa-tooth me-2 text-info" style={{ fontSize: "0.75rem" }}></i>Braces &amp; Aligners</Link></li>
              <li><Link href="/services"><i className="fas fa-tooth me-2 text-info" style={{ fontSize: "0.75rem" }}></i>Dental Implants</Link></li>
              <li><Link href="/services"><i className="fas fa-tooth me-2 text-info" style={{ fontSize: "0.75rem" }}></i>Teeth Cleaning</Link></li>
              <li><Link href="/services"><i className="fas fa-tooth me-2 text-info" style={{ fontSize: "0.75rem" }}></i>Smile Whitening</Link></li>
            </ul>
          </div>

          {/* ── 4. Contact Details ── */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-heading">Contact Details</h6>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-start gap-2">
                <i className="fas fa-phone-alt mt-1 text-primary" style={{ fontSize: "0.9rem" }}></i>
                <div>
                  <small style={{ color: "#64748b", display: "block", fontSize: "0.75rem" }}>Phone Number</small>
                  <a href={`tel:${CLINIC_CONFIG.phone}`} className="footer-contact-link">{CLINIC_CONFIG.phone}</a>
                </div>
              </div>

              <div className="d-flex align-items-start gap-2">
                <i className="fas fa-envelope mt-1 text-warning" style={{ fontSize: "0.9rem" }}></i>
                <div>
                  <small style={{ color: "#64748b", display: "block", fontSize: "0.75rem" }}>Email Address</small>
                  <a href={`mailto:${CLINIC_CONFIG.email}`} className="footer-contact-link">{CLINIC_CONFIG.email}</a>
                </div>
              </div>

              <div className="d-flex align-items-start gap-2">
                <i className="fas fa-map-marker-alt mt-1 text-danger" style={{ fontSize: "0.9rem" }}></i>
                <div>
                  <small style={{ color: "#64748b", display: "block", fontSize: "0.75rem" }}>Location</small>
                  <span style={{ color: "#cbd5e1", fontSize: "0.85rem", lineHeight: "1.4" }}>
                    {CLINIC_CONFIG.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── 5. Map Embed ── */}
          <div className="col-lg-3 col-md-12">
            <h6 className="footer-heading">Location Map</h6>
            <div className="map-card-dark">
              <iframe
                src={CLINIC_CONFIG.mapEmbed}
                width="100%"
                height="200"
                style={{ border: 0, filter: "brightness(0.9) contrast(1.1)" }}
                loading="lazy"
                title="clinic-map"
              />
            </div>
          </div>

        </div>

        {/* ── Bottom Copyright Bar ── */}
        <div className="footer-bottom-bar d-flex flex-column flex-md-row align-items-center justify-content-between pt-4 mt-5">
          <p className="mb-2 mb-md-0" style={{ color: "#64748b", fontSize: "0.88rem" }}>
            © {new Date().getFullYear()} {CLINIC_CONFIG.name}. All Rights Reserved.
          </p>
          <div className="d-flex gap-3" style={{ fontSize: "0.85rem" }}>
            <Link href="/about" style={{ color: "#94a3b8", textDecoration: "none" }}>Privacy Policy</Link>
            <span style={{ color: "#334155" }}>•</span>
            <Link href="/contact" style={{ color: "#94a3b8", textDecoration: "none" }}>Terms of Service</Link>
          </div>
        </div>

      </div>

      {/* Embedded CSS */}
      <style>{`
        .footer-dark {
          background: linear-gradient(180deg, #0f172a 0%, #090d16 100%);
          padding: 85px 0 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-family: 'Inter', sans-serif;
        }

        .footer-heading {
          color: #ffffff;
          font-weight: 700;
          font-size: 1.05rem;
          margin-bottom: 22px;
          position: relative;
          letter-spacing: "0.2px";
        }

        .footer-heading::after {
          content: "";
          display: block;
          width: 32px;
          height: 3px;
          background: #2563eb;
          border-radius: 2px;
          margin-top: 8px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 10px;
        }

        .footer-links a {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.25s ease;
          display: inline-block;
        }

        .footer-links a:hover {
          color: #60a5fa;
          transform: translateX(4px);
        }

        .footer-contact-link {
          color: #e2e8f0;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .footer-contact-link:hover {
          color: #38bdf8;
        }

        .social-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1rem;
        }

        .social-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }

        .instagram-btn:hover {
          background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
          color: #ffffff;
          border-color: transparent;
        }

        .whatsapp-btn:hover {
          background: #25D366;
          color: #ffffff;
          border-color: #25D366;
        }

        .phone-btn:hover {
          background: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
        }

        .map-card-dark {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
        }

        .footer-bottom-bar {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 768px) {
          .footer-dark {
            text-align: center;
          }
          .footer-heading::after {
            margin: 8px auto 0;
          }
          .social-btn {
            margin: 0 auto;
          }
          .footer-bottom-bar {
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;