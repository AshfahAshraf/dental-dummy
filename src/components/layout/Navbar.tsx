'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const closeMobileMenu = () => {
    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      const bsCollapse = (window as any).bootstrap?.Collapse?.getInstance(navbarCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      } else {
        navbarCollapse.classList.remove("show");
      }
    }
  };

  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        // The hero main section is 1000vh tall on homepage
        const heroEnd = window.innerHeight * 10;
        setScrolled(window.scrollY >= heroEnd - window.innerHeight * 0.5 || window.scrollY > 80);
      } else {
        // On non-home pages (About Us, Team, etc.), always use light scrolled navbar
        setScrolled(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, pathname]);

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMobileMenu();
    if (isHomePage) {
      const el = document.getElementById("services");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/#services");
    }
  };

  const navStyle: React.CSSProperties = (scrolled || !isHomePage)
    ? {
        background: "#ffffff",
        boxShadow: "0 4px 25px rgba(0,0,0,0.06)",
        borderBottom: "1px solid #e2e8f0",
        transition: "all 0.3s ease",
        padding: "10px 0",
      }
    : {
        background: "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        transition: "all 0.3s ease",
        padding: "14px 0",
      };

  const isLightNav = scrolled || !isHomePage;
  const linkColor = isLightNav ? "#1e293b" : "#ffffff";
  const logoTextColor = isLightNav ? "#1e40af" : "#ffffff";
  const logoSubColor = isLightNav ? "#64748b" : "rgba(255,255,255,0.75)";

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <style>
        {`
          .modern-hover,
          .navbar-nav .nav-link,
          .book-btn-desktop,
          .book-btn-mobile {
            white-space: nowrap !important;
          }

          .modern-hover {
            position: relative;
            font-weight: 500;
            cursor: pointer;
            transition: color 0.3s ease;
            font-size: 0.95rem;
            white-space: nowrap !important;
          }

          .navbar-nav .nav-link {
            white-space: nowrap !important;
            padding-left: 0.65rem !important;
            padding-right: 0.65rem !important;
          }

          .modern-hover::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 0%;
            height: 2.5px;
            background: #2563eb;
            border-radius: 2px;
            transition: width 0.3s ease;
          }

          .modern-hover:hover::after,
          .modern-hover.active::after {
            width: 100%;
          }

          .modern-hover.active {
            color: #2563eb !important;
            font-weight: 600;
          }

          .nav-logo {
            height: 55px;
            width: auto;
            object-fit: contain;
          }

          @media (min-width: 992px) {
            .nav-logo { height: 60px; }
          }

          @media (max-width: 575px) {
            .nav-logo { height: 46px; }
          }

          .book-btn-desktop {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            padding: 10px 20px;
            border-radius: 12px;
            white-space: nowrap !important;
            flex-shrink: 0;
          }
          .book-btn-mobile  { display: none; }

          @media (min-width: 992px) and (max-width: 1240px) {
            .navbar-nav .nav-link {
              padding-left: 0.4rem !important;
              padding-right: 0.4rem !important;
              font-size: 0.88rem !important;
            }
            .book-btn-desktop {
              padding: 9px 15px !important;
              font-size: 0.86rem !important;
            }
            .nav-logo {
              height: 48px !important;
            }
            .navbar-brand div > div {
              font-size: 0.88rem !important;
            }
            .navbar-brand div > small {
              font-size: 0.62rem !important;
            }
          }

          @media (max-width: 991px) {
            .book-btn-desktop { display: none; }
            .book-btn-mobile {
              display: block;
              margin-top: 12px;
              width: 100%;
              padding: 10px 0;
              font-weight: 600;
              border-radius: 10px;
            }
            .navbar-collapse {
              background: ${isLightNav ? "#ffffff" : "rgba(15, 23, 42, 0.95)"};
              padding: 20px;
              border-radius: 16px;
              margin-top: 10px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            }
          }

          .dropdown-toggle::after {
            display: none !important;
          }

          /* Toggler icon color adapts to background */
          .navbar-toggler-dark  { filter: invert(1); border-color: rgba(255,255,255,0.4); }
          .navbar-toggler-light { filter: none; }
        `}
      </style>

      <nav className="navbar navbar-expand-lg fixed-top" style={navStyle}>
        <div className="container-fluid px-xl-5 px-lg-4 px-3">

          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center gap-2 flex-shrink-0" href="/" onClick={closeMobileMenu}>
            <img src="/images/logo.png" className="nav-logo" alt="DR. MUHAMMED'S DENTAL CARE, MULTI SPECIALITY DENTAL CLINIC Logo" />
            <div>
              <div className="fw-bold lh-1 text-nowrap" style={{ color: logoTextColor, fontSize: "0.95rem" }}>DR. MUHAMMED'S DENTAL CARE</div>
              <small className="text-nowrap" style={{ color: logoSubColor, fontSize: "0.68rem", letterSpacing: "0.5px", fontWeight: "600", display: "block", marginTop: "2px" }}>MULTI SPECIALITY DENTAL CLINIC • THALASSERY</small>
            </div>
          </Link>

          {/* Mobile Toggle */}
          <button
            className={`navbar-toggler ${isLightNav ? "navbar-toggler-light" : "navbar-toggler-dark"}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ border: isLightNav ? "1px solid #cbd5e1" : "1px solid rgba(255,255,255,0.3)" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu */}
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav gap-xl-3 gap-lg-1 gap-2 align-items-center">

              <li className="nav-item">
                <Link
                  className={`nav-link modern-hover text-nowrap ${isActive("/") ? "active" : ""}`}
                  style={{ color: isActive("/") ? "#2563eb" : linkColor }}
                  href="/"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link modern-hover text-nowrap ${isActive("/about") ? "active" : ""}`}
                  style={{ color: isActive("/about") ? "#2563eb" : linkColor }}
                  href="/about"
                  onClick={closeMobileMenu}
                >
                  About Us
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link modern-hover text-nowrap ${isActive("/services") ? "active" : ""}`}
                  style={{ color: isActive("/services") ? "#2563eb" : linkColor }}
                  href="/services"
                  onClick={closeMobileMenu}
                >
                  Services
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link modern-hover text-nowrap ${isActive("/team") ? "active" : ""}`}
                  style={{ color: isActive("/team") ? "#2563eb" : linkColor }}
                  href="/team"
                  onClick={closeMobileMenu}
                >
                  Our Team
                </Link>
              </li>

              {/* Gallery Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle modern-hover text-nowrap ${isActive("/before-after") || isActive("/clinic-tour") ? "active" : ""}`}
                  style={{ color: (isActive("/before-after") || isActive("/clinic-tour")) ? "#2563eb" : linkColor }}
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Gallery <i className="fas fa-chevron-down ms-1" style={{ fontSize: "0.75rem", opacity: 0.7 }}></i>
                </a>
                <ul className="dropdown-menu shadow-lg border-0" style={{ borderRadius: "14px", marginTop: "10px", padding: "8px" }}>
                  <li>
                    <Link
                      className={`dropdown-item py-2 px-3 rounded text-nowrap ${isActive("/before-after") ? "active bg-primary text-white" : ""}`}
                      href="/before-after"
                      onClick={closeMobileMenu}
                    >
                      <i className="fas fa-magic me-2 text-primary"></i> Before &amp; After Results
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item py-2 px-3 rounded text-nowrap ${isActive("/clinic-tour") ? "active bg-primary text-white" : ""}`}
                      href="/clinic-tour"
                      onClick={closeMobileMenu}
                    >
                      <i className="fas fa-hospital-user me-2 text-primary"></i> Clinic Tour
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link modern-hover text-nowrap ${isActive("/contact") ? "active" : ""}`}
                  style={{ color: isActive("/contact") ? "#2563eb" : linkColor }}
                  href="/contact"
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </Link>
              </li>

            </ul>

            {/* Mobile Book Button */}
            <Link href="/book-appointment" className="btn btn-primary book-btn-mobile shadow-sm text-nowrap" onClick={closeMobileMenu}>
              <i className="fas fa-calendar-check me-2"></i> Book Appointment
            </Link>
          </div>

          {/* Desktop Book Button */}
          <Link href="/book-appointment" className="btn btn-primary book-btn-desktop ms-lg-3 shadow-sm text-nowrap">
            <i className="fas fa-calendar-check me-2"></i> Book Appointment
          </Link>

        </div>
      </nav>
    </>
  );
};

export default Navbar;