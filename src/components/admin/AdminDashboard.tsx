'use client';

import React, { useEffect, useState } from "react";

interface Doctor {
  id: number;
  name: string;
  role: string;
}

interface Appointment {
  id: number;
  name: string;
  email: string;
  phone: string;
  appointment_date: string;
  service: string;
  message: string;
  created_at: string;
}

const dbStyles = `
  .db-page {
    font-family: 'Inter', sans-serif;
  }
  .db-header {
    margin-bottom: 28px;
  }
  .db-header h2 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
  .db-header p {
    font-size: 0.9rem;
    color: #64748b;
    margin: 4px 0 0;
  }
  
  /* Stats Grid */
  .db-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }
  .db-stat-card {
    background: #fff;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    border: 1px solid #f1f5f9;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .db-stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  }
  .db-stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
  }
  .icon-services { background: #eff6ff; color: #2563eb; }
  .icon-doctors { background: #f0fdf4; color: #16a34a; }
  .icon-appointments { background: #faf5ff; color: #7c3aed; }
  .icon-reviews { background: #fef9c3; color: #ca8a04; }
  .icon-messages { background: #fff1f2; color: #e11d48; }
  
  .db-stat-info {
    display: flex;
    flex-direction: column;
  }
  .db-stat-value {
    font-size: 1.4rem;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.2;
  }
  .db-stat-label {
    font-size: 0.78rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 2px;
  }

  /* Split Layout */
  .db-content-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 24px;
  }
  @media (max-width: 1024px) {
    .db-content-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Card */
  .db-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    border: 1px solid #f1f5f9;
    padding: 24px;
  }
  .db-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f1f5f9;
  }
  .db-card-header h3 {
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
  .db-view-all {
    font-size: 0.8rem;
    font-weight: 600;
    color: #2563eb;
    text-decoration: none;
  }
  .db-view-all:hover {
    text-decoration: underline;
  }

  /* Doctors List style */
  .db-doctors-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .db-doctor-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid #f8fafc;
    background: #f8fafc;
    transition: background 0.2s;
  }
  .db-doctor-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #475569;
    font-size: 0.9rem;
  }
  .db-doctor-info h4 {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: #0f172a;
  }
  .db-doctor-info p {
    margin: 2px 0 0;
    font-size: 0.75rem;
    color: #64748b;
  }

  /* Table Style */
  .db-table-wrap {
    overflow-x: auto;
  }
  .db-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
  }
  .db-table th {
    background: #f8fafc;
    color: #64748b;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 700;
    padding: 10px 14px;
    text-align: left;
    border-bottom: 1.5px solid #f1f5f9;
  }
  .db-table td {
    padding: 12px 14px;
    border-bottom: 1px solid #f1f5f9;
    color: #334155;
    vertical-align: middle;
  }
  .db-table tr:last-child td {
    border-bottom: none;
  }
  .db-badge {
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 600;
    display: inline-block;
  }
  .badge-service {
    background: #eff6ff;
    color: #1d4ed8;
  }

  /* Loading State */
  .db-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    font-size: 0.9rem;
    color: #64748b;
    gap: 8px;
  }
  .db-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #e2e8f0;
    border-top-color: #2563eb;
    border-radius: 50%;
    animation: spinner 0.6s linear infinite;
  }
  @keyframes spinner {
    to { transform: rotate(360deg); }
  }
`;

const AdminDashboard: React.FC = () => {
  const [servicesCount, setServicesCount] = useState<number>(0);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviewsCount, setReviewsCount] = useState<number>(0);
  const [messagesCount, setMessagesCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const headers = {
        "Authorization": `Token ${localStorage.getItem("admin_token")}`
      };
      // Fetch all required counts and resource listings
      const [resServices, resDoctors, resAppointments, resReviews, resMessages] = await Promise.all([
        fetch("http://127.0.0.1:8000/admin-panel/services/", { headers }).then(r => r.ok ? r.json() : []),
        fetch("http://127.0.0.1:8000/admin-panel/doctors/", { headers }).then(r => r.ok ? r.json() : []),
        fetch("http://127.0.0.1:8000/user/appointments/list/", { headers }).then(r => r.ok ? r.json() : []),
        fetch("http://127.0.0.1:8000/admin-panel/reviews/", { headers }).then(r => r.ok ? r.json() : []),
        fetch("http://127.0.0.1:8000/admin-panel/contact/messages/", { headers }).then(r => r.ok ? r.json() : []),
      ]);

      setServicesCount(Array.isArray(resServices) ? resServices.length : 0);
      setDoctors(Array.isArray(resDoctors) ? resDoctors : []);
      setAppointments(Array.isArray(resAppointments) ? resAppointments : []);
      setReviewsCount(Array.isArray(resReviews) ? resReviews.length : 0);
      setMessagesCount(Array.isArray(resMessages) ? resMessages.length : 0);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="db-loading">
        <style>{dbStyles}</style>
        <div className="db-spinner"></div>
        <span>Loading dashboard metrics...</span>
      </div>
    );
  }

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="db-page">
      <style>{dbStyles}</style>

      {/* Header */}
      <div className="db-header">
        <h2>👋 Welcome back, Admin</h2>
        <p>Here's what's happening at DentalCare today.</p>
      </div>

      {/* Stats Cards */}
      <div className="db-stats-grid">
        <div className="db-stat-card">
          <div className="db-stat-icon icon-services">🦷</div>
          <div className="db-stat-info">
            <span className="db-stat-value">{servicesCount}</span>
            <span className="db-stat-label">Services</span>
          </div>
        </div>

        <div className="db-stat-card">
          <div className="db-stat-icon icon-doctors">👨‍⚕️</div>
          <div className="db-stat-info">
            <span className="db-stat-value">{doctors.length}</span>
            <span className="db-stat-label">Doctors</span>
          </div>
        </div>

        <div className="db-stat-card">
          <div className="db-stat-icon icon-appointments">📅</div>
          <div className="db-stat-info">
            <span className="db-stat-value">{appointments.length}</span>
            <span className="db-stat-label">Appointments</span>
          </div>
        </div>

        <div className="db-stat-card">
          <div className="db-stat-icon icon-reviews">⭐</div>
          <div className="db-stat-info">
            <span className="db-stat-value">{reviewsCount}</span>
            <span className="db-stat-label">Reviews</span>
          </div>
        </div>

        <div className="db-stat-card">
          <div className="db-stat-icon icon-messages">✉️</div>
          <div className="db-stat-info">
            <span className="db-stat-value">{messagesCount}</span>
            <span className="db-stat-label">Inquiries</span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="db-content-grid">
        {/* Left Column: Recent Appointments */}
        <div className="db-card">
          <div className="db-card-header">
            <h3>Recent Appointment Requests</h3>
            <a href="/admin-panel/appointments" className="db-view-all">View All</a>
          </div>

          <div className="db-table-wrap">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: "32px 0", color: "#94a3b8" }}>
                      No appointments booked yet.
                    </td>
                  </tr>
                ) : (
                  appointments.slice(0, 5).map((app) => (
                    <tr key={app.id}>
                      <td style={{ fontWeight: 600 }}>{app.name}</td>
                      <td>{app.phone}</td>
                      <td>
                        <span className="db-badge badge-service">{app.service}</span>
                      </td>
                      <td style={{ color: "#64748b" }}>{formatDate(app.appointment_date)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Doctors List */}
        <div className="db-card">
          <div className="db-card-header">
            <h3>Our Team (Doctors)</h3>
            <a href="/admin-panel/doctors" className="db-view-all">Manage</a>
          </div>

          <div className="db-doctors-list">
            {doctors.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0", color: "#94a3b8" }}>
                No doctors registered yet.
              </div>
            ) : (
              doctors.slice(0, 5).map((doc) => (
                <div className="db-doctor-item" key={doc.id}>
                  <div className="db-doctor-avatar">
                    {doc.name.replace(/^(Dr\.\s*)/i, "").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="db-doctor-info">
                    <h4>{doc.name}</h4>
                    <p>{doc.role}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;