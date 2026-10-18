'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MOCK_SERVICES } from "@/data/mockData";

const ServiceDetail = () => {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  const router = useRouter();

  // Find initial service from static mock data immediately
  const initialService = MOCK_SERVICES.find(s => s.slug === slug) || MOCK_SERVICES[0];
  const [service, setService] = useState<any>(initialService);

  useEffect(() => {
    if (!slug) return;
    const matched = MOCK_SERVICES.find(s => s.slug === slug);
    if (matched) {
      setService(matched);
    }

    // Attempt backend sync if running; silent fallback
    fetch(`http://127.0.0.1:8000/admin-panel/services/slug/${slug}/`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data && data.title) {
          setService(data);
        }
      })
      .catch(() => {
        // Safe static fallback
      });
  }, [slug]);

  if (!service) {
    return (
      <div className="container text-center" style={{ padding: "120px 0" }}>
        <h3>Service not found</h3>
        <Link href="/services" className="btn btn-primary mt-3">Back to Services</Link>
      </div>
    );
  }

  const imgSrc = service.image
    ? (service.image.startsWith("data:") || service.image.startsWith("http") || service.image.startsWith("/")
        ? service.image
        : `/${service.image}`)
    : "";

  return (
    <section style={{ padding: "120px 0 90px", background: "#f8fafc", minHeight: "80vh" }}>
      <div className="container">

        {/* BREADCRUMB & BACK BUTTON */}
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <button
            onClick={() => router.push("/services")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "none",
              background: "white",
              color: "#1F3C88",
              fontWeight: "600",
              fontSize: "15px",
              cursor: "pointer",
              padding: "10px 18px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
            }}
          >
            ← Back to All Services
          </button>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0" style={{ fontSize: "0.88rem" }}>
              <li className="breadcrumb-item"><Link href="/" className="text-decoration-none text-muted">Home</Link></li>
              <li className="breadcrumb-item"><Link href="/services" className="text-decoration-none text-muted">Services</Link></li>
              <li className="breadcrumb-item active text-primary fw-semibold" aria-current="page">{service.title}</li>
            </ol>
          </nav>
        </div>

        <div className="row g-5 align-items-center">

          {/* LEFT IMAGE */}
          {imgSrc && (
            <div className="col-lg-6">
              <div
                style={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(15,23,42,0.12)",
                  background: "#fff",
                  border: "1px solid #e2e8f0"
                }}
              >
                <img
                  src={imgSrc}
                  alt={service.title}
                  className="img-fluid w-100"
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 10",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block"
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              {service.duration && (
                <div className="d-flex gap-3 mt-4">
                  <div className="bg-white p-3 rounded-4 shadow-sm border flex-fill text-center">
                    <small className="text-muted d-block fw-semibold" style={{ fontSize: "0.78rem" }}>ESTIMATED DURATION</small>
                    <span className="fw-bold text-dark">{service.duration}</span>
                  </div>
                  {service.idealFor && (
                    <div className="bg-white p-3 rounded-4 shadow-sm border flex-fill text-center">
                      <small className="text-muted d-block fw-semibold" style={{ fontSize: "0.78rem" }}>RECOMMENDED FOR</small>
                      <span className="fw-bold text-dark">{service.idealFor}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* RIGHT CONTENT */}
          <div className={imgSrc ? "col-lg-6" : "col-lg-10 mx-auto"}>
            <span
              className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-3 d-inline-block"
              style={{ fontSize: "0.85rem" }}
            >
              SPECIALIZED DENTAL TREATMENT
            </span>

            <h1 style={{ fontWeight: "800", color: "#0f172a", fontSize: "2.3rem", lineHeight: 1.25, marginBottom: "20px" }}>
              {service.title}
            </h1>

            <p style={{ color: "#334155", fontSize: "1.08rem", lineHeight: "1.75", marginBottom: "20px" }}>
              {service.fullDescription || service.description}
            </p>

            {service.features && service.features.length > 0 && (
              <div className="mb-4 pt-2">
                <h6 className="fw-bold text-dark mb-3">Key Treatment Highlights:</h6>
                <div className="d-flex flex-column gap-2">
                  {service.features.map((feat: string, idx: number) => (
                    <div key={idx} className="d-flex align-items-center gap-2">
                      <i className="fas fa-check-circle text-primary" style={{ fontSize: "1.05rem" }}></i>
                      <span style={{ color: "#475569", fontSize: "0.98rem" }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="d-flex flex-wrap gap-3 mt-4">
              <Link
                href="/book-appointment"
                className="btn btn-primary px-4 py-3 fw-bold rounded-3 shadow-sm d-inline-flex align-items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  border: "none",
                  boxShadow: "0 10px 25px rgba(37,99,235,0.25)"
                }}
              >
                <span>Book Appointment for This Service</span>
                <i className="fas fa-calendar-check"></i>
              </Link>

              <a
                href="https://wa.me/919847012345?text=Hello%20Doctor%2C%20I%20am%20interested%20in%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-success px-4 py-3 fw-semibold rounded-3 d-inline-flex align-items-center gap-2"
              >
                <i className="fab fa-whatsapp fs-5"></i>
                <span>Ask on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ServiceDetail;