'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../../../components/layout/Sidebar";
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { MOCK_SERVICES, MOCK_REVIEWS, CLINIC_CONFIG } from "@/data/mockData";

const ServicesGrid = () => {
  const [services, setServices] = useState<any[]>(MOCK_SERVICES);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Optionally sync with backend if available; silently fallback to static mock
    fetch("http://127.0.0.1:8000/admin-panel/services/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(() => {
        // Safe static fallback
      });
  }, []);

  const visible = showAll ? services : services.slice(0, 3);

  return (
    <>
      <div className="row g-4">
        {visible.map((item: any) => (
          <div className="col-md-4" key={item.id}>
            <div
              className="card border-0 shadow-sm h-100 p-3"
              style={{
                borderRadius: "22px",
                backgroundColor: "#fff",
              }}
            >
              {item.image && (
                <img
                  src={
                    item.image.startsWith("data:") || item.image.startsWith("http") || item.image.startsWith("/")
                      ? item.image
                      : `/${item.image}`
                  }
                  alt={item.title}
                  className="w-100"
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "15px",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}

              <div className="card-body px-0 pt-4 d-flex flex-column">
                <h4
                  style={{
                    color: "#1F3C88",
                    fontWeight: "700",
                    marginBottom: "18px",
                  }}
                >
                  {item.title}
                </h4>

                <div style={{ flexGrow: 1 }} />

                <button
                  onClick={() => router.push(`/service/${item.slug}`)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#1F3C88",
                    fontWeight: "600",
                    fontSize: "18px",
                    padding: "0",
                    textAlign: "left",
                  }}
                >
                  Read More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length > 3 && (
        <div className="text-center mt-4">
          <button
            className="btn btn-primary px-4 py-2"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less Services" : "Show All Services"}
          </button>
        </div>
      )}
    </>
  );
};


const WhyChooseUs = () => {
  return (
    <section style={{ background: "#0f172a", padding: "100px 0", color: "#ffffff" }}>
      <div className="container" style={{ overflow: "hidden" }}>
        <div className="row align-items-center">

          {/* Left image */}
          <motion.div
            className="col-lg-6 mb-4 mb-lg-0"
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="/images/dental_chair.jpg"
              className="img-fluid shadow-lg"
              style={{
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
              alt="Dr Muhammed Dental Chair"
            />
          </motion.div>

          {/* Right content */}
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-2" style={{ fontSize: "0.85rem" }}>
              Why Choose Us
            </span>

            <h2 className="fw-bold mb-3 text-white" style={{ fontSize: "2.4rem" }}>
              Why Choose Us
            </h2>

            <p style={{ color: "#94a3b8", lineHeight: "1.7" }} className="mb-4">
              At <strong className="text-white">Dr. Muhammed's Dental Care</strong>, we believe every patient deserves
              gentle, honest, and high-quality dental treatment. Our clinic provides
              modern dental care in a clean and comfortable environment, using advanced
              technology for accurate diagnosis and effective treatment in Thalassery.
            </p>

            <div className="why-card-dark">
              <h6 className="text-white font-weight-bold">Experienced Dentists</h6>
              <p style={{ color: "#cbd5e1" }}>Skilled specialists for advanced dental treatments.</p>
            </div>

            <div className="why-card-dark">
              <h6 className="text-white font-weight-bold">Modern Equipment</h6>
              <p style={{ color: "#cbd5e1" }}>Latest dental technology for precise care.</p>
            </div>

            <div className="why-card-dark">
              <h6 className="text-white font-weight-bold">Pain Free Treatment</h6>
              <p style={{ color: "#cbd5e1" }}>Comfortable and stress-free procedures.</p>
            </div>

            <div className="why-card-dark">
              <h6 className="text-white font-weight-bold">Affordable Pricing</h6>
              <p style={{ color: "#cbd5e1" }}>Quality dental care at reasonable cost.</p>
            </div>

          </motion.div>
        </div>
      </div>

      <style>{`
        .why-card-dark {
          background: #1e293b;
          padding: 18px 20px;
          border-radius: 14px;
          margin-bottom: 15px;
          transition: 0.3s ease;
          border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer;
        }

        .why-card-dark h6 {
          margin: 0;
          font-weight: 600;
        }

        .why-card-dark p {
          margin: 5px 0 0;
          font-size: 14px;
        }

        .why-card-dark:hover {
          background: #2563eb;
          border-color: #3b82f6;
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(37,99,235,0.3);
        }

        .why-card-dark:hover p {
          color: #ffffff !important;
        }
      `}</style>

    </section>
  );
};

const formatRelativeTime = (dateStr: string) => {
  if (!dateStr) return "Today";
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return dateStr;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());

  const diffTime = today.getTime() - target.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays > 1 && diffDays < 7) return `${diffDays} days ago`;
  if (diffDays >= 7 && diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }
  if (diffDays >= 30 && diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }
  const years = Math.floor(diffDays / 365);
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
};

const GoogleReviews = () => {
  const [reviews, setReviews] = useState<any[]>(MOCK_REVIEWS);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin-panel/reviews/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      })
      .catch(() => {
        // Fallback silently to MOCK_REVIEWS
      });
  }, []);

  return (
    <section style={{ background: "#f8fafc", padding: "100px 0" }}>
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-5" style={{ maxWidth: "650px", margin: "0 auto 45px" }}>
          <h2 className="fw-bold mb-2" style={{ color: "#0f172a" }}>
            What Our Patients Say
          </h2>
          <p style={{ color: "#64748b" }}>
            Real experiences from Google reviews by our happy patients in Thalassery
          </p>
        </div>

        {/* Dynamic Reviews */}
        <div className="row mb-5">
          {reviews.length > 0 ? (
            reviews.map((item: any) => (
              <div className="col-lg-4 mb-4" key={item.id}>
                <div className="review-card">

                  <div className="review-header">
                    <div className="avatar">
                      {item.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h6 style={{ color: "#0f172a", margin: 0, fontWeight: 700 }}>{item.name}</h6>
                      <small style={{ color: "#94a3b8" }}>{formatRelativeTime(item.review_time)}</small>
                    </div>
                  </div>

                  <div className="stars">
                    {"★".repeat(item.rating || 5)}
                  </div>

                  <p style={{ color: "#475569", margin: 0, fontSize: "0.92rem", lineHeight: "1.6" }}>{item.review_text}</p>

                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted">
              No reviews available
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="google-box text-center">
          <h4 className="fw-bold mb-2" style={{ color: "#0f172a" }}>
            {CLINIC_CONFIG.name}
          </h4>

          <p className="text-muted mb-3">
            Based on 500+ Verified Patient Reviews • Thalassery
          </p>

          <a
            href={CLINIC_CONFIG.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="google-btn"
            style={{
              textDecoration: "none",
              display: "inline-block"
            }}
          >
            Review us on Google
          </a>
        </div>

      </motion.div>

      <style>{`
        .review-card{
          background: white;
          padding: 25px;
          border-radius: 16px;
          height: 100%;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
        }

        .review-header{
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 10px;
        }

        .avatar{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #2563eb;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .stars{
          color: #f59e0b;
          margin: 8px 0;
        }

        .google-box{
          margin-top: 10px;
        }

        .google-btn{
          background: #2563eb;
          color: white;
          border: none;
          padding: 12px 28px;
          border-radius: 30px;
          font-weight: 600;
          transition: 0.3s ease;
        }

        .google-btn:hover{
          background: #1d4ed8;
          transform: translateY(-2px);
        }
      `}</style>

    </section>
  );
};


const AppointmentSection = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Root Canal");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert("Please enter your name and phone number");
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem("dental_appointments") || "[]");
      existing.push({
        id: Date.now(),
        name: fullName,
        phone,
        service,
        date: date ? date.toLocaleDateString() : "Flexible",
        message,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("dental_appointments", JSON.stringify(existing));
    } catch {
      // ignore storage errors
    }

    setSubmitted(true);
    setFullName("");
    setPhone("");
    setDate(null);
    setMessage("");
  };

  return (
    <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #1e40af 100%)", padding: "100px 0", color: "#ffffff" }}>
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >

        <div className="text-center mb-5">
          <h2
            className="fw-bold display-5 text-white mb-2"
          >
            Book an Appointment
          </h2>
          <p className="text-light" style={{ opacity: 0.9, fontSize: "1.05rem" }}>
            Schedule your visit to {CLINIC_CONFIG.name}, Thalassery today
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">

            <div className="appointment-card">
              {submitted ? (
                <div className="text-center py-4">
                  <div
                    style={{
                      width: "65px",
                      height: "65px",
                      borderRadius: "50%",
                      background: "#dcfce7",
                      color: "#16a34a",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      marginBottom: "16px",
                    }}
                  >
                    ✓
                  </div>
                  <h4 className="fw-bold text-dark mb-2">Appointment Request Received!</h4>
                  <p className="text-muted mb-4" style={{ maxWidth: "480px", margin: "0 auto 20px" }}>
                    Thank you! Our clinic team at {CLINIC_CONFIG.location} will contact you shortly to confirm your time slot.
                  </p>
                  <button
                    className="btn btn-outline-primary px-4 py-2 rounded-pill fw-semibold"
                    onClick={() => setSubmitted(false)}
                  >
                    Book Another Slot
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">

                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Full Name *"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Phone Number *"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    {/* Modern Date Picker */}
                    <div className="col-md-6">
                      {mounted ? (
                        <DatePicker
                          selected={date}
                          onChange={(date: Date | null) => setDate(date)}
                          placeholderText="Select Date"
                          className="form-control"
                          minDate={new Date()}
                        />
                      ) : (
                        <input type="text" className="form-control" placeholder="Select Date" readOnly />
                      )}
                    </div>

                    <div className="col-md-6">
                      <select
                        className="form-control"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                      >
                        <option>Root Canal Treatment</option>
                        <option>Laser Teeth Whitening & Cleaning</option>
                        <option>Permanent Dental Implants</option>
                        <option>Orthodontics & Clear Aligners</option>
                        <option>Cosmetic Smile Makeover</option>
                        <option>Pediatric Dentistry</option>
                        <option>Zirconia Ceramic Crowns</option>
                        <option>Wisdom Tooth Surgery</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="Message or specific concern (Optional)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="col-12 text-center mt-4">
                      <button type="submit" className="appointment-btn">
                        Book Appointment Now
                      </button>
                    </div>

                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

      </motion.div>

      <style>{`
        .appointment-card{
          background: white;
          padding: 45px;
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
        }

        .form-control{
          height: 52px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          color: #0f172a;
          font-size: 0.95rem;
        }

        textarea.form-control{
          height: auto;
        }

        /* Button */
        .appointment-btn{
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: white;
          border: none;
          padding: 16px 48px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 1rem;
          transition: .3s;
          box-shadow: 0 8px 20px rgba(37,99,235,0.3);
        }

        .appointment-btn:hover{
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(37,99,235,0.4);
        }

        /* Modern Datepicker */
        .react-datepicker{
          border-radius: 16px !important;
          border: none !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
        }

        .react-datepicker__header{
          background: #2563eb !important;
          border: none !important;
        }

        .react-datepicker__current-month{
          color: white !important;
        }

        .react-datepicker__day--selected{
          background: #2563eb !important;
          border-radius: 8px !important;
        }

        .react-datepicker__day:hover{
          background: #e0edff !important;
          border-radius: 8px;
        }
      `}</style>

    </section>
  );
};


const faqList = [
  {
    id: "faq1",
    question: "Does dental treatment hurt?",
    answer: "No. We use gentle care and local numbing to keep your treatment completely pain-free."
  },
  {
    id: "faq2",
    question: "How often should I visit the dentist?",
    answer: "We recommend a checkup and cleaning once every 6 months."
  },
  {
    id: "faq3",
    question: "Do I need to book an appointment before visiting?",
    answer: "Walk-ins are welcome, but booking an appointment in advance helps avoid any waiting time."
  },
  {
    id: "faq4",
    question: "Does a root canal hurt?",
    answer: "No. With modern numbing, a root canal treatment is quick, safe, and comfortable."
  },
  {
    id: "faq5",
    question: "How long does teeth whitening take?",
    answer: "It takes about 45 to 60 minutes for a brighter, whiter smile in a single visit."
  },
  {
    id: "faq6",
    question: "Are dental implants permanent?",
    answer: "Yes. Implants are permanent tooth replacements that can last a lifetime."
  },
  {
    id: "faq7",
    question: "What should I do for a sudden toothache?",
    answer: "Call us right away at +91 7561825537 for fast emergency dental care."
  },
  {
    id: "faq8",
    question: "How do I protect my teeth at home?",
    answer: "Brush twice daily, floss every day, and limit sugary food and drinks."
  },
  {
    id: "faq9",
    question: "Do you treat children?",
    answer: "Yes, we provide friendly and gentle dental care for kids of all ages."
  },
  {
    id: "faq10",
    question: "How do I book an appointment?",
    answer: "You can book online on our website or call us directly at +91 7561825537."
  }
];

const FAQSection = () => {
  return (
    <section style={{ background: "#ffffff", padding: "100px 0" }}>
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-5" style={{ maxWidth: "680px", margin: "0 auto 45px" }}>
          <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-2" style={{ fontSize: "0.85rem" }}>
            Got Questions?
          </span>
          <h2 className="fw-bold mb-2" style={{ color: "#0f172a", fontSize: "2.4rem" }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: "#64748b", fontSize: "1.05rem" }}>
            Clear answers to common questions about treatments, appointments, and oral care.
          </p>
        </div>

        <div className="accordion custom-accordion mx-auto" id="faqAccordion" style={{ maxWidth: "850px" }}>
          {faqList.map((item, index) => (
            <div
              className="accordion-item shadow-sm border mb-3"
              key={item.id}
              style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid #e2e8f0" }}
            >
              <h2 className="accordion-header">
                <button
                  className={`accordion-button fw-bold ${index !== 0 ? "collapsed" : ""}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${item.id}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={item.id}
                  style={{ fontSize: "1.02rem" }}
                >
                  <span className="me-2 text-primary fw-semibold" style={{ minWidth: "24px" }}>
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  {item.question}
                </button>
              </h2>
              <div
                id={item.id}
                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body" style={{ color: "#475569", lineHeight: "1.65", fontSize: "0.95rem" }}>
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* LIGHT ACCORDION STYLES */}
      <style>{`
        .custom-accordion .accordion-item {
          background: #ffffff;
          transition: all 0.3s ease;
        }

        .custom-accordion .accordion-button {
          background: #f8fafc;
          color: #0f172a;
          box-shadow: none;
          padding: 18px 24px;
          transition: all 0.25s ease;
        }

        .custom-accordion .accordion-button:hover {
          background: #f1f5f9;
        }

        .custom-accordion .accordion-button:not(.collapsed) {
          background: #eff6ff;
          color: #2563eb;
          box-shadow: inset 0 -1px 0 rgba(37, 99, 235, 0.15);
        }

        .custom-accordion .accordion-body {
          background: #ffffff;
          padding: 20px 24px 22px;
          border-top: 1px solid #f1f5f9;
        }
      `}</style>
    </section>
  );
};


const HeroSection = () => {
  const router = useRouter();
  return (
    <section
      style={{
        background: "#ffffff",
        padding: "120px 0 90px",
        position: "relative",
        overflow: "hidden",
        color: "#0f172a"
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="row align-items-center g-5">
          {/* Left Hero Content */}
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1
              className="fw-bold mb-3"
              style={{
                color: "#0f172a",
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em"
              }}
            >
              Your Dream Smile Starts with <span style={{ color: "#2563eb" }}>Gentle &amp; Expert Care</span>
            </h1>

            <p
              style={{
                color: "#475569",
                fontSize: "1.1rem",
                lineHeight: "1.7",
                marginBottom: "2rem",
                maxWidth: "540px"
              }}
            >
              Welcome to Dr. Muhammed's Dental Care, Multi Speciality Dental Clinic in Thalassery. We provide world-class orthodontics, painless procedures, and gentle care for the whole family.
            </p>

            <div className="d-flex flex-wrap gap-3 mb-4">
              <button
                onClick={() => router.push("/book-appointment")}
                className="btn btn-primary px-4 py-3 fw-bold d-flex align-items-center gap-2 shadow-sm"
                style={{
                  borderRadius: "12px",
                  fontSize: "1rem",
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  border: "none",
                  boxShadow: "0 10px 25px rgba(37,99,235,0.25)"
                }}
              >
                <span>Book Appointment</span>
                <i className="fas fa-arrow-right fs-6"></i>
              </button>

              <a
                href="#services"
                className="btn btn-outline-secondary px-4 py-3 fw-semibold"
                style={{
                  borderRadius: "12px",
                  fontSize: "1rem",
                  textDecoration: "none",
                  borderColor: "#cbd5e1",
                  color: "#1e293b"
                }}
              >
                Explore Services
              </a>
            </div>

            {/* Patient Trust Stats */}
            <div className="pt-3 border-top d-flex flex-wrap gap-4 align-items-center" style={{ borderColor: "#e2e8f0" }}>
              <div>
                <div className="fw-bold fs-5" style={{ color: "#0f172a" }}>⭐ 4.9 / 5.0</div>
                <small style={{ color: "#64748b" }}>Google Reviews</small>
              </div>
              <div style={{ width: "1px", height: "30px", background: "#e2e8f0" }}></div>
              <div>
                <div className="fw-bold fs-5" style={{ color: "#0f172a" }}>1000+</div>
                <small style={{ color: "#64748b" }}>Happy Patients</small>
              </div>
              <div style={{ width: "1px", height: "30px", background: "#e2e8f0" }}></div>
              <div>
                <div className="fw-bold fs-5" style={{ color: "#0f172a" }}>100%</div>
                <small style={{ color: "#64748b" }}>Painless & Gentle</small>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Image Card */}
          <motion.div
            className="col-lg-6 position-relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="position-relative">
              <img
                src="/images/hero_banner.jpg"
                alt="Patient-friendly dentist with child patient at Dr Muhammed Dental Clinic"
                className="img-fluid w-100 shadow"
                style={{
                  borderRadius: "24px",
                  border: "1px solid #e2e8f0",
                  maxHeight: "520px",
                  objectFit: "cover"
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const router = useRouter();

  return (
    <>
      <Sidebar />
      <HeroSection />


      {/* About Section after hero */}
      <section
        id="about"
        style={{
          background: "#0f172a",
          padding: "100px 0",
          position: "relative",
          zIndex: 20,
          color: "#ffffff"
        }}
      >
        <div className="container" style={{ overflow: "hidden" }}>
          <div className="row align-items-center">

            {/* Images */}
            <motion.div
              className="col-lg-6 mb-4"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="d-flex gap-4">
                <img
                  src="/images/about_image1.jpg"
                  className="img-fluid rounded-4 shadow-lg"
                  style={{ width: "48%" }}
                  alt="About Dr Muhammed Dental"
                />
                <img
                  src="/images/about_image2.jpg"
                  className="img-fluid rounded-4 shadow-lg mt-5"
                  style={{ width: "48%" }}
                  alt="Dental Clinic Interior"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >

              <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-2" style={{ fontSize: "0.85rem" }}>
                About Us
              </span>

              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: "10px 0 15px"
                }}
              >
                Modern Dental Care <br />
                For Healthy Smiles
              </h2>

              <h5 className="text-info mb-3" style={{ fontSize: "1.1rem" }}>
                Dental Clinic in Thalassery, Kannur
              </h5>

              <p style={{ color: "#94a3b8", marginBottom: "1.5rem", lineHeight: "1.7" }}>
                At Dr. Muhammed's Dental Care, we provide modern and comfortable dental
                treatments in Thalassery, Kannur. Our focus is on precision
                orthodontics, painless procedures, and long-term oral health.
              </p>

              {/* Modern feature cards */}
              <div className="row g-3 mb-4">

                <div className="col-6">
                  <div className="feature-card-dark">
                    <i className="fas fa-check-circle text-info me-2"></i>Advanced Technology
                  </div>
                </div>

                <div className="col-6">
                  <div className="feature-card-dark">
                    <i className="fas fa-check-circle text-info me-2"></i>Gentle Care
                  </div>
                </div>

                <div className="col-6">
                  <div className="feature-card-dark">
                    <i className="fas fa-check-circle text-info me-2"></i>Personalized Treatment
                  </div>
                </div>

                <div className="col-6">
                  <div className="feature-card-dark">
                    <i className="fas fa-check-circle text-info me-2"></i>Flexible Appointment
                  </div>
                </div>

              </div>
              <div className="d-flex flex-wrap gap-3">
                <button onClick={() => router.push("/book-appointment")} className="btn btn-primary px-4 py-2 fw-semibold" style={{ borderRadius: "10px" }}>
                  Book An Appointment
                </button>

                <button onClick={() => router.push("/about")} className="btn btn-outline-light px-4 py-2 fw-semibold" style={{ borderRadius: "10px" }}>
                  Explore More
                </button>
              </div>

            </motion.div>

          </div>
        </div>

        <style>{`
          .feature-card-dark {
            background: #1e293b;
            color: #f8fafc;
            padding: 14px 16px;
            border-radius: 12px;
            font-size: 0.88rem;
            font-weight: 600;
            border: 1px solid rgba(255,255,255,0.08);
          }
        `}</style>
      </section>


      {/* Services Section (PURE WHITE BACKGROUND - NO BLACK) */}
      <section
        id="services"
        style={{
          background: "#ffffff",
          padding: "100px 0",
          position: "relative",
          zIndex: 20
        }}
      >
        <div className="container" style={{ overflow: "hidden" }}>

          {/* heading */}
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-2" style={{ fontSize: "0.85rem" }}>
              Our Services
            </span>

            <h2 className="fw-bold mt-2" style={{ color: "#0f172a", fontSize: "2.4rem" }}>
              Complete Dental Care Solutions
            </h2>

            <p style={{ color: "#64748b", maxWidth: "600px", margin: "12px auto 0" }}>
              Advanced dental solutions designed to improve your smile, oral health,
              and confidence with comfortable and personalized care.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            <ServicesGrid />
          </motion.div>

        </div>
      </section>

      <WhyChooseUs />

      <GoogleReviews />

      <AppointmentSection />
      <FAQSection />



    </>
  );
}

export default Home;


