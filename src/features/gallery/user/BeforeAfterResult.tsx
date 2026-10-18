'use client';

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { MOCK_BEFORE_AFTER, CLINIC_CONFIG } from "@/data/mockData";

const getImageUrl = (src?: string) => {
  if (!src || typeof src !== "string") return "";
  if (src.startsWith("data:") || src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
    return src;
  }
  return `/${src}`;
};

const BeforeAfterResult = () => {
  const [results, setResults] = useState<any[]>(MOCK_BEFORE_AFTER);
  const [positions, setPositions] = useState<Record<number, number>>(() => {
    const init: Record<number, number> = {};
    MOCK_BEFORE_AFTER.forEach(item => {
      init[item.id] = 50;
    });
    return init;
  });
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const containerRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin-panel/results/")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setResults(data);
          const initialPositions: Record<number, number> = {};
          data.forEach((item) => {
            if (item && item.id) initialPositions[item.id] = 50;
          });
          setPositions(initialPositions);
        }
      })
      .catch(() => {
        // Fallback silently to MOCK_BEFORE_AFTER
      });
  }, []);

  const handleMove = (clientX: number, id: number) => {
    const container = containerRefs.current[id];
    if (!container) return;

    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    let percent = (x / rect.width) * 100;

    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;

    setPositions((prev) => ({
      ...prev,
      [id]: percent,
    }));
  };

  const handleImageError = (key: string) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }));
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
                <span className="text-white fw-semibold">Smile Transformations</span>
              </div>

              <h2 className="fw-bold display-4 mb-3 text-white">
                Smile Transformations
              </h2>
              <p className="lead mx-auto text-light" style={{ maxWidth: "680px", opacity: 0.92, fontSize: "1.15rem" }}>
                Slide left or right to interactively compare our real before &amp; after patient results.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. GALLERY GRID ────────────────────────────────────────────── */}
      <section
        style={{
          padding: "90px 0 100px",
          background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
        }}
      >
        <div className="container text-center">
        {/* Header */}
        <div style={{ maxWidth: "650px", margin: "0 auto 50px" }}>
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
            Clinical Excellence
          </span>
          <h2 className="fw-bold mb-3" style={{ fontSize: "2.4rem", color: "#0f172a" }}>
            Smile Transformations
          </h2>
          <p style={{ color: "#64748b", fontSize: "1.05rem", margin: 0 }}>
            Slide left or right to interactively compare our real before &amp; after patient results.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="row g-4 justify-content-center">
          {(() => {
            const validResults = (Array.isArray(results) ? results : []).filter((item) => {
              if (!item || !item.id) return false;
              const beforeSrc = getImageUrl(item.before_image);
              const afterSrc = getImageUrl(item.after_image);
              const isBeforeErr = !beforeSrc || Boolean(imgErrors[`before_${item.id}`]);
              const isAfterErr = !afterSrc || Boolean(imgErrors[`after_${item.id}`]);
              return !isBeforeErr && !isAfterErr;
            });

            if (validResults.length === 0) {
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
                    <div style={{ fontSize: "3rem", marginBottom: "12px" }}>✨</div>
                    <h5 style={{ fontWeight: 700, color: "#1e293b" }}>Transformations Coming Soon</h5>
                    <p style={{ color: "#64748b", fontSize: "0.95rem", margin: 0 }}>
                      Our smile transformation results will be available shortly.
                    </p>
                  </div>
                </div>
              );
            }

            return validResults.map((item) => {
              const beforeSrc = getImageUrl(item.before_image);
              const afterSrc = getImageUrl(item.after_image);
              const hasBeforeErr = !beforeSrc || Boolean(imgErrors[`before_${item.id}`]);
              const hasAfterErr = !afterSrc || Boolean(imgErrors[`after_${item.id}`]);

              return (
                <div className="col-lg-6 col-md-6" key={item.id}>
                  <div
                    ref={(el) => {
                      containerRefs.current[item.id] = el;
                    }}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "360px",
                      overflow: "hidden",
                      borderRadius: "20px",
                      cursor: "ew-resize",
                      boxShadow: "0 12px 35px rgba(15, 23, 42, 0.12)",
                      border: "1px solid #e2e8f0",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      background: "#f1f5f9",
                    }}
                    onMouseDown={() => setDraggingIndex(item.id)}
                    onMouseUp={() => setDraggingIndex(null)}
                    onMouseLeave={() => setDraggingIndex(null)}
                    onMouseMove={(e) =>
                      draggingIndex === item.id && handleMove(e.clientX, item.id)
                    }
                    onTouchStart={() => setDraggingIndex(item.id)}
                    onTouchEnd={() => setDraggingIndex(null)}
                    onTouchMove={(e) =>
                      handleMove(e.touches[0].clientX, item.id)
                    }
                  >
                    {/* AFTER IMAGE (BASE LAYER) */}
                    {hasAfterErr ? (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#94a3b8",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <span style={{ fontSize: "2rem" }}>✨</span>
                        <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>After Treatment Result</span>
                      </div>
                    ) : (
                      <img
                        src={afterSrc}
                        alt=""
                        draggable={false}
                        onError={() => handleImageError(`after_${item.id}`)}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          pointerEvents: "none",
                        }}
                      />
                    )}

                    {/* BEFORE IMAGE (OVERLAY CLIP LAYER) */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        clipPath: `inset(0 ${100 - (positions[item.id] ?? 50)}% 0 0)`,
                      }}
                    >
                      {hasBeforeErr ? (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(135deg, #334155 0%, #1e293b 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#cbd5e1",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          <span style={{ fontSize: "2rem" }}>🔍</span>
                          <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>Before Treatment Condition</span>
                        </div>
                      ) : (
                        <img
                          src={beforeSrc}
                          alt=""
                          draggable={false}
                          onError={() => handleImageError(`before_${item.id}`)}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            pointerEvents: "none",
                          }}
                        />
                      )}
                    </div>

                    {/* VERTICAL DIVIDER LINE */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: `${positions[item.id] ?? 50}%`,
                        transform: "translateX(-50%)",
                        width: "3px",
                        height: "100%",
                        background: "linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)",
                        boxShadow: "0 0 10px rgba(37,99,235,0.6)",
                      }}
                    />

                    {/* DRAG HANDLE CIRCLE */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: `${positions[item.id] ?? 50}%`,
                        transform: "translate(-50%, -50%)",
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "#ffffff",
                        color: "#2563eb",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.25), 0 0 0 4px rgba(37,99,235,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        pointerEvents: "none",
                        transition: "transform 0.1s ease",
                      }}
                    >
                      ↔
                    </div>

                    {/* BEFORE BADGE */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: "14px",
                        left: "14px",
                        background: "rgba(15, 23, 42, 0.75)",
                        backdropFilter: "blur(8px)",
                        color: "#ffffff",
                        padding: "6px 14px",
                        borderRadius: "30px",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        border: "1px solid rgba(255,255,255,0.2)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      }}
                    >
                      Before
                    </span>

                    {/* AFTER BADGE */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: "14px",
                        right: "14px",
                        background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                        color: "#ffffff",
                        padding: "6px 14px",
                        borderRadius: "30px",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
                      }}
                    >
                      After
                    </span>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
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
              Ready for Your Own Smile Transformation?
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

export default BeforeAfterResult;