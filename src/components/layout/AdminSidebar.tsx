import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { to: "/admin-panel/dashboard",        icon: "🏠", label: "Dashboard" },
  { to: "/admin-panel/services",         icon: "🦷", label: "Services" },
  { to: "/admin-panel/doctors",          icon: "👨‍⚕️", label: "Doctors" },
  { to: "/admin-panel/appointments",     icon: "📅", label: "Appointments" },
  { to: "/admin-panel/google-reviews",   icon: "⭐", label: "Reviews" },
  { to: "/admin-panel/results",          icon: "🖼️", label: "Before & After" },
  { to: "/admin-panel/clinic-tour",      icon: "🏥", label: "Clinic Tour" },
  { to: "/admin-panel/contact-messages", icon: "✉️", label: "Contact" },
];

const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isStaff = typeof window !== "undefined" ? localStorage.getItem("is_staff") === "true" : false;
  const filteredNavItems = isStaff
    ? navItems
    : navItems.filter((item) => item.to === "/admin-panel/appointments");

  return (
    <>
      <style>{`
        .admin-sidebar {
          width: 240px;
          min-height: 100vh;
          background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
          color: #cbd5e1;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; left: 0;
          z-index: 1000;
          box-shadow: 4px 0 24px rgba(0,0,0,0.3);
          transition: transform 0.3s ease;
        }
        .admin-sidebar-logo {
          padding: 28px 24px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .admin-sidebar-logo h1 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #f8fafc;
          margin: 0;
          letter-spacing: 0.5px;
        }
        .admin-sidebar-logo span {
          font-size: 0.75rem;
          color: #64748b;
        }
        .admin-nav {
          padding: 16px 12px;
          flex: 1;
          overflow-y: auto;
        }
        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 16px;
          border-radius: 10px;
          text-decoration: none;
          color: #94a3b8;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 4px;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .admin-nav-item:hover {
          background: rgba(255,255,255,0.07);
          color: #f1f5f9;
          transform: translateX(3px);
        }
        .admin-nav-item.active {
          background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
          color: #fff;
          box-shadow: 0 4px 14px rgba(59,130,246,0.35);
        }
        .admin-nav-item .nav-icon {
          font-size: 1.1rem;
          width: 22px;
          text-align: center;
        }
        .admin-hamburger {
          display: none;
          position: fixed;
          top: 14px; left: 14px;
          z-index: 1100;
          background: #1e293b;
          border: none;
          border-radius: 10px;
          padding: 10px 12px;
          cursor: pointer;
          color: #f1f5f9;
          font-size: 1.3rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }
        .admin-overlay {
          display: none;
        }
        /* Tablet & Mobile */
        @media (max-width: 900px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.sidebar-open {
            transform: translateX(0);
          }
          .admin-hamburger {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .admin-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            z-index: 999;
          }
        }
      `}</style>

      {/* Hamburger button (mobile/tablet) */}
      <button
        className="admin-hamburger"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* Overlay (mobile/tablet) */}
      {open && (
        <div className="admin-overlay" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar${open ? " sidebar-open" : ""}`}>
        <div className="admin-sidebar-logo">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2>🦷 DentalCare</h2>
              <span>Admin Panel</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none", border: "none", color: "#64748b",
                fontSize: "1.4rem", cursor: "pointer", display: "none",
              }}
              className="sidebar-close-btn"
            >
              ✕
            </button>
          </div>
        </div>

        <nav className="admin-nav">
          {filteredNavItems.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className={`admin-nav-item${pathname === item.to ? " active" : ""}`}
              onClick={() => setOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("admin_token");
                localStorage.removeItem("admin_username");
                localStorage.removeItem("is_staff");
              }
              router.push("/admin-panel/login");
            }}
            className="admin-nav-item"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 16px",
              borderRadius: "10px",
              color: "#94a3b8",
              fontWeight: 500,
              fontSize: "0.9rem",
              transition: "background 0.2s, color 0.2s, transform 0.15s"
            }}
          >
            <span className="nav-icon" style={{ fontSize: "1.1rem", width: "22px", textAlign: "center" }}>🚪</span>
            Logout
          </button>
        </nav>

        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.07)", fontSize: "0.75rem", color: "#475569" }}>
          DentalCare Admin © 2026
        </div>
      </aside>

      <style>{`
        @media (max-width: 900px) {
          .sidebar-close-btn { display: block !important; }
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;