'use client';

import React, { useEffect, useState } from "react";

const appStyles = `
  .app-page { font-family: 'Inter', sans-serif; }
  .app-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 28px; flex-wrap: wrap; gap: 12px;
  }
  .app-header h2 {
    font-size: 1.6rem; font-weight: 700; color: #0f172a; margin: 0;
  }
  .app-badge {
    background: #eff6ff; color: #2563eb; border-radius: 20px;
    padding: 4px 14px; font-size: 0.8rem; font-weight: 600;
  }
  /* Card */
  .app-card {
    background: #fff; border-radius: 16px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.07);
    padding: 28px; margin-bottom: 28px;
  }
  .app-card h4 {
    font-size: 1.05rem; font-weight: 700; color: #1e293b;
    margin-bottom: 20px; padding-bottom: 12px;
    border-bottom: 2px solid #f1f5f9;
  }
  /* Table wrapper */
  .app-table-wrap { overflow-x: auto; }
  .app-table {
    width: 100%; border-collapse: collapse; font-size: 0.88rem;
  }
  .app-table th {
    background: #f8fafc; color: #64748b; font-size: 0.75rem;
    text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;
    padding: 12px 16px; text-align: left;
    border-bottom: 2px solid #f1f5f9;
  }
  .app-table td {
    padding: 14px 16px; border-bottom: 1px solid #f1f5f9;
    color: #334155; vertical-align: middle;
  }
  .app-table tr:last-child td { border-bottom: none; }
  .app-table tr:hover td { background: #fafafa; }
  
  .app-badge-service {
    background: #eff6ff; color: #2563eb; border-radius: 6px;
    padding: 4px 8px; font-size: 0.78rem; font-weight: 600;
    display: inline-block;
  }
  .app-status-badge {
    padding: 6px 12px; border-radius: 20px; font-size: 0.78rem; font-weight: 600;
    display: inline-flex; align-items: center; justify-content: center;
    border: none; outline: none; cursor: pointer;
  }
  .app-status-pending { background: #fef3c7; color: #d97706; }
  .app-status-confirmed { background: #dcfce7; color: #15803d; }
  .app-status-completed { background: #dbeafe; color: #1d4ed8; }
  .app-status-cancelled { background: #fee2e2; color: #b91c1c; }
  .app-date-group-header td {
    background: #f1f5f9; color: #1e3a8a; font-size: 0.8rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.6px; padding: 12px 18px !important;
    border-bottom: 1px solid #e2e8f0; border-top: 1px solid #e2e8f0; text-align: left;
  }
  .app-empty {
    text-align: center; padding: 48px 24px; color: #94a3b8;
  }
  .app-empty div { font-size: 3rem; margin-bottom: 8px; }
  .app-empty p { font-size: 0.9rem; }
  
  .app-input {
    border: 1.5px solid #e2e8f0; border-radius: 10px;
    padding: 8px 12px; font-size: 0.85rem; color: #1e293b;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    background: #f8fafc; width: 100%; box-sizing: border-box;
  }
  .app-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.12); background: #fff; }
  
  .app-btn {
    padding: 6px 12px; border-radius: 10px; border: none;
    font-size: 0.8rem; font-weight: 600; cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    display: inline-flex; align-items: center; justify-content: center;
    gap: 6px; white-space: nowrap;
    background: #f1f5f9; color: #475569;
  }
  .app-btn:hover { opacity: 0.88; transform: translateY(-1px); }
  .app-btn:disabled { cursor: not-allowed; opacity: 0.5; }

  .app-table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid #e2e8f0; }
  .app-table {
    width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;
  }
  .app-table th {
    background: #f8fafc; color: #64748b; font-size: 0.75rem;
    text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;
    padding: 14px 18px; border-bottom: 2px solid #e2e8f0; white-space: nowrap;
  }
  .app-table td {
    padding: 16px 18px; border-bottom: 1px solid #f1f5f9;
    color: #334155; vertical-align: middle; white-space: nowrap;
  }
  .app-table tr:last-child td { border-bottom: none; }
  .app-table tr:hover td { background: #f8fafc; }

  @media (max-width: 768px) {
    .app-table-wrap {
      border: none;
      overflow-x: visible;
    }
    .app-table thead {
      display: none;
    }
    .app-table, .app-table tbody {
      display: block;
      width: 100%;
    }
    .app-table tr.app-date-group-header {
      display: block;
      margin-top: 16px;
      margin-bottom: 10px;
    }
    .app-table tr.app-date-group-header td {
      border-radius: 10px;
      display: block;
      white-space: normal;
      background: #e2e8f0 !important;
      color: #0f172a !important;
      font-weight: 800 !important;
    }
    .app-table tr:not(.app-date-group-header) {
      display: block;
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 16px;
      padding: 14px 18px;
      margin-bottom: 14px;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
    }
    .app-table td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px dashed #f1f5f9;
      white-space: normal;
      text-align: right;
    }
    .app-table td:last-child {
      border-bottom: none;
    }
    .app-table td::before {
      content: attr(data-label);
      font-weight: 700;
      color: #64748b;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-right: 12px;
      flex-shrink: 0;
      text-align: left;
    }
  }
`;

const AppointmentView = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [rangeTab, setRangeTab] = useState("all");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const headers = token ? { "Authorization": `Token ${token}` } : {};
      const res = await fetch("http://127.0.0.1:8000/user/appointments/list/", { headers });
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("admin_token");
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      };
      const res = await fetch(`http://127.0.0.1:8000/user/appointments/${id}/status/`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDate, rangeTab, selectedYear]);

  useEffect(() => {
    if (selectedDate) {
      const year = new Date(selectedDate).getFullYear();
      if (year && year !== selectedYear) {
        setSelectedYear(year);
      }
    }
  }, [selectedDate]);

  const todayObj = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const todayStr = `${todayObj.getFullYear()}-${pad(todayObj.getMonth() + 1)}-${pad(todayObj.getDate())}`;

  const activeYear = selectedYear;

  // All bookings count for the active year
  const countAll = appointments.filter((item) => {
    if (!item.appointment_date) return false;
    const appDate = new Date(item.appointment_date);
    return appDate.getFullYear() === activeYear;
  }).length;

  // This Week count for the active year
  const countWeek = appointments.filter((item) => {
    if (!item.appointment_date) return false;
    const appDate = new Date(item.appointment_date);
    if (appDate.getFullYear() !== activeYear) return false;

    const currentDay = todayObj.getDay();
    const startOfWeek = new Date(todayObj);
    startOfWeek.setDate(todayObj.getDate() - currentDay);
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    appDate.setHours(12, 0, 0, 0);
    return appDate >= startOfWeek && appDate <= endOfWeek;
  }).length;

  // This Month count for the active year
  const countMonth = appointments.filter((item) => {
    if (!item.appointment_date) return false;
    const appDate = new Date(item.appointment_date);
    if (appDate.getFullYear() !== activeYear) return false;
    return todayObj.getMonth() === appDate.getMonth();
  }).length;

  const filteredAppointments = appointments.filter((item) => {
    const matchesSearch =
      (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.phone || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.service || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.message || "").toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Filter list to only show the selected active year
    if (!item.appointment_date) return false;
    const appDate = new Date(item.appointment_date);
    if (appDate.getFullYear() !== activeYear) return false;

    // Calendar exact date selection
    if (selectedDate) {
      return item.appointment_date === selectedDate;
    }

    if (rangeTab === "all") return true;

    if (rangeTab === "today") {
      const todayStr = `${todayObj.getFullYear()}-${pad(todayObj.getMonth() + 1)}-${pad(todayObj.getDate())}`;
      let itemDateStr = item.appointment_date || (item.created_at ? item.created_at.split('T')[0] : "");
      return itemDateStr === todayStr;
    }

    if (rangeTab === "week") {
      const currentDay = todayObj.getDay();
      const startOfWeek = new Date(todayObj);
      startOfWeek.setDate(todayObj.getDate() - currentDay);
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      appDate.setHours(12, 0, 0, 0);
      return appDate >= startOfWeek && appDate <= endOfWeek;
    }

    if (rangeTab === "month") {
      return todayObj.getMonth() === appDate.getMonth() && todayObj.getFullYear() === appDate.getFullYear();
    }

    if (rangeTab === "year") {
      return todayObj.getFullYear() === appDate.getFullYear();
    }

    return true;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);

  const groupedItems = {};
  currentItems.forEach((item) => {
    let bookedDateKey = "Unknown Date";
    if (item.created_at) {
      try {
        bookedDateKey = new Date(item.created_at).toISOString().split('T')[0];
      } catch {
        bookedDateKey = item.created_at.split('T')[0] || "Unknown Date";
      }
    } else if (item.appointment_date) {
      bookedDateKey = item.appointment_date;
    }

    if (!groupedItems[bookedDateKey]) {
      groupedItems[bookedDateKey] = [];
    }
    groupedItems[bookedDateKey].push(item);
  });

  const sortedGroupDates = Object.keys(groupedItems).sort((a, b) => {
    if (a === "Unknown Date") return 1;
    if (b === "Unknown Date") return -1;
    return b.localeCompare(a);
  });

  const formatDateHeader = (dateKey) => {
    if (!dateKey || dateKey === "Unknown Date") return "BOOKED ON UNKNOWN DATE";

    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${pad(yesterday.getMonth() + 1)}-${pad(yesterday.getDate())}`;

    let labelPrefix = "BOOKED ON ";
    if (dateKey === todayStr) {
      labelPrefix = "BOOKED TODAY — ";
    } else if (dateKey === yesterdayStr) {
      labelPrefix = "BOOKED YESTERDAY — ";
    }

    try {
      const parts = dateKey.split("-");
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        const formatted = d.toLocaleDateString('en-US', options);
        return `${labelPrefix}${formatted}`.toUpperCase();
      }
      return `${labelPrefix}${dateKey}`.toUpperCase();
    } catch {
      return `${labelPrefix}${dateKey}`.toUpperCase();
    }
  };

  const formatBookedTime = (createdAt) => {
    if (!createdAt) return "N/A";
    try {
      const d = new Date(createdAt);
      const timeStr = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
      return timeStr;
    } catch {
      return "N/A";
    }
  };

  const formatRequestedDate = (appDateStr) => {
    if (!appDateStr) return "N/A";
    try {
      const parts = appDateStr.split("-");
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
      }
      return appDateStr;
    } catch {
      return appDateStr;
    }
  };

  return (
    <div className="app-page">
      <style>{appStyles}</style>

      {/* Header */}
      <div className="app-header">
        <h2>📅 Appointment Details</h2>
        <span className="app-badge">{appointments.length} bookings</span>
      </div>

      {/* Table Card */}
      <div className="app-card">
        {/* Card Header Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "16px", borderBottom: "2px solid #f1f5f9", flexWrap: "wrap", gap: "14px" }}>
          {/* Left Title */}
          <h4 style={{ margin: 0, border: "none", padding: 0, fontSize: "1.1rem", fontWeight: 700, color: "#1e293b" }}>
            📋 Appointment Schedule
          </h4>
          
          {/* Right Filter & Controls Group */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            {/* Search Input */}
            <input
              type="text"
              className="app-input"
              placeholder="🔍 Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "200px", margin: 0, padding: "8px 12px" }}
            />

            {/* Filter Period Dropdown */}
            <select
              value={rangeTab}
              onChange={(e) => {
                setRangeTab(e.target.value);
                setSelectedDate("");
              }}
              className="app-input"
              style={{ width: "135px", margin: 0, padding: "8px 10px", fontWeight: 600, background: "#fff" }}
            >
              <option value="all">All Bookings</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>

            {/* Year Dropdown */}
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(Number(e.target.value));
                setSelectedDate("");
              }}
              className="app-input"
              style={{ width: "90px", margin: 0, padding: "8px 10px", background: "#fff" }}
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
              <option value={2027}>2027</option>
              <option value={2028}>2028</option>
            </select>

            {/* Calendar Date Picker */}
            <input
              type="date"
              className="app-input"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setRangeTab("all");
              }}
              style={{ width: "145px", margin: 0, padding: "7px 10px", background: "#fff" }}
            />
            {selectedDate && (
              <button
                className="app-btn"
                onClick={() => setSelectedDate("")}
                style={{ background: "#ef4444", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "8px" }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="app-table-wrap">
          <table className="app-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Phone Number</th>
                <th>Requested Service</th>
                <th>Appointment Date</th>
                <th>Status</th>
                <th>Message</th>
                <th>Booked Time</th>
              </tr>
            </thead>

            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <div className="app-empty">
                      <div>📅</div>
                      <p>No appointments found in the system registry.</p>
                    </div>
                  </td>
                </tr>
              ) : filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <div className="app-empty">
                      <div>🔍</div>
                      <p>No appointments match your search term "{searchTerm}".</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedGroupDates.map((date) => (
                  <React.Fragment key={date}>
                    {/* Date separator row */}
                    <tr className="app-date-group-header">
                      <td colSpan={8}>
                        {formatDateHeader(date)}
                      </td>
                    </tr>
                    {/* Appointment rows under this date */}
                    {groupedItems[date].map((item) => (
                      <tr key={item.id}>
                        <td data-label="#">
                          <span style={{ fontWeight: 600, color: "#94a3b8" }}>#{item.id}</span>
                        </td>
                        <td data-label="Patient" style={{ fontWeight: 600 }}>{item.name}</td>
                        <td data-label="Phone Number">
                          <div style={{ fontSize: "0.85rem", color: "#334155" }}>
                            <a href={`tel:${item.phone}`} style={{ textDecoration: "none", color: "#2563eb", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              <i className="fas fa-phone-alt me-1"></i> {item.phone}
                            </a>
                          </div>
                        </td>
                        <td data-label="Service">
                          <span className="app-badge-service">{item.service}</span>
                        </td>
                        <td data-label="Appointment Date" style={{ fontWeight: 600, color: "#2563eb", fontSize: "0.85rem" }}>
                          📅 {formatRequestedDate(item.appointment_date)}
                        </td>
                        <td data-label="Status">
                          {localStorage.getItem("is_staff") === "true" ? (
                            <select
                              value={item.status || "Pending"}
                              onChange={(e) => updateStatus(item.id, e.target.value)}
                              className={`app-status-badge app-status-${(item.status || "Pending").toLowerCase()}`}
                              style={{ border: "none", outline: "none", cursor: "pointer", fontWeight: "600" }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          ) : (
                            <span
                              className={`app-status-badge app-status-${(item.status || "Pending").toLowerCase()}`}
                              style={{ fontWeight: "600" }}
                            >
                              {item.status || "Pending"}
                            </span>
                          )}
                        </td>
                        <td data-label="Message" style={{ color: "#64748b", fontStyle: item.message ? "normal" : "italic" }}>
                          {item.message || "No message"}
                        </td>
                        <td data-label="Booked Time" style={{ color: "#64748b", fontSize: "0.8rem" }}>
                          {formatBookedTime(item.created_at)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {filteredAppointments.length > 0 && totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", flexWrap: "wrap", gap: "12px" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredAppointments.length)} of {filteredAppointments.length} entries
            </span>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                className="app-btn"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
              >
                ◀ Previous
              </button>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155" }}>
                {currentPage} / {totalPages}
              </span>
              <button
                className="app-btn"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{ cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
              >
                Next ▶
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentView;