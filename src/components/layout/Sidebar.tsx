'use client';

import React from "react";

const Sidebar = () => {
  return (
    <>
      {/* Custom styles for responsive floating action buttons */}
      <style>{`
        @media (max-width: 768px) {
          .floating-btn {
            width: 45px !important;
            height: 45px !important;
            font-size: 16px !important;
          }
          .whatsapp-btn {
            bottom: 15px !important;
            right: 15px !important;
          }
          .phone-btn {
            bottom: 70px !important;
            right: 15px !important;
          }
        }
      `}</style>

      {/* 🔥 WhatsApp Button */}
      <a
        href="https://wa.me/917561825537?text=Hello%2C%20I%20would%20like%20to%20book%20a%20dental%20consultation"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-success rounded-circle floating-btn whatsapp-btn shadow-lg"
        title="Chat on WhatsApp"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          backgroundColor: "#25D366",
          borderColor: "#25D366",
          boxShadow: "0 6px 16px rgba(37, 211, 102, 0.4)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <i className="fab fa-whatsapp" style={{ fontSize: "32px", color: "#ffffff" }}></i>
      </a>

      {/* 🔥 Phone Button */}
      <a
        href="tel:+917561825537"
        className="btn btn-primary rounded-circle floating-btn phone-btn shadow-lg"
        title="Call Clinic"
        style={{
          position: "fixed",
          bottom: "90px",
          right: "20px",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          backgroundColor: "#2563eb",
          borderColor: "#2563eb",
          boxShadow: "0 6px 16px rgba(37, 99, 235, 0.4)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <i className="fas fa-phone-alt" style={{ fontSize: "22px", color: "#ffffff" }}></i>
      </a>
    </>
  );
};

export default Sidebar;