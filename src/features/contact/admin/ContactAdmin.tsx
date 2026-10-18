'use client';

import React, { useEffect, useState } from "react";

const contactStyles = `
  .con-page { font-family: 'Inter', sans-serif; }
  .con-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 28px; flex-wrap: wrap; gap: 12px;
  }
  .con-header h2 {
    font-size: 1.6rem; font-weight: 700; color: #0f172a; margin: 0;
  }
  .con-badge {
    background: #eff6ff; color: #2563eb; border-radius: 20px;
    padding: 4px 14px; font-size: 0.8rem; font-weight: 600;
  }
  /* Card */
  .con-card {
    background: #fff; border-radius: 16px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.07);
    padding: 28px; margin-bottom: 28px; border: 1px solid #f1f5f9;
  }
  .con-card-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px; padding-bottom: 16px;
    border-bottom: 2px solid #f1f5f9; flex-wrap: wrap; gap: 16px;
  }
  .con-card-header h4 {
    font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0;
    display: flex; align-items: center; gap: 8px;
  }
  /* Table wrapper */
  .con-table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid #e2e8f0; }
  .con-table {
    width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;
  }
  .con-table th {
    background: #f8fafc; color: #64748b; font-size: 0.75rem;
    text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;
    padding: 14px 18px; border-bottom: 2px solid #e2e8f0; white-space: nowrap;
  }
  .con-table td {
    padding: 16px 18px; border-bottom: 1px solid #f1f5f9;
    color: #334155; vertical-align: middle;
  }
  .con-table tr:last-child td { border-bottom: none; }
  .con-table tr:hover td { background: #f8fafc; }

  .con-date-group-header td {
    background: #f1f5f9; color: #1e3a8a; font-size: 0.8rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.6px; padding: 12px 18px !important;
    border-bottom: 1px solid #e2e8f0; border-top: 1px solid #e2e8f0; text-align: left;
  }

  .con-empty {
    text-align: center; padding: 48px 24px; color: #94a3b8;
  }
  .con-empty div { font-size: 3rem; margin-bottom: 8px; }
  .con-empty p { font-size: 0.9rem; margin: 0; }

  .con-btn-sec {
    background: #f1f5f9; color: #475569; padding: 8px 16px;
    border-radius: 10px; border: none; font-size: 0.85rem; font-weight: 600;
    cursor: pointer; transition: background 0.2s;
  }
  .con-btn-sec:hover { background: #e2e8f0; }

  @media (max-width: 768px) {
    .con-table-wrap { border: none; overflow-x: visible; }
    .con-table thead { display: none; }
    .con-table, .con-table tbody { display: block; width: 100%; }
    .con-table tr.con-date-group-header {
      display: block; margin-top: 16px; margin-bottom: 10px;
    }
    .con-table tr.con-date-group-header td {
      border-radius: 10px; display: block; white-space: normal;
      background: #e2e8f0 !important; color: #0f172a !important; font-weight: 800 !important;
    }
    .con-table tr:not(.con-date-group-header) {
      display: block; background: #ffffff;
      border: 1.5px solid #e2e8f0; border-radius: 16px;
      padding: 14px 18px; margin-bottom: 14px;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
    }
    .con-table td {
      display: flex; justify-content: space-between;
      align-items: center; padding: 10px 0;
      border-bottom: 1px dashed #f1f5f9; white-space: normal; text-align: right;
    }
    .con-table td:last-child { border-bottom: none; }
    .con-table td::before {
      content: attr(data-label); font-weight: 700;
      color: #64748b; font-size: 0.75rem; text-transform: uppercase;
      letter-spacing: 0.5px; margin-right: 12px; flex-shrink: 0; text-align: left;
    }
  }
`;

const ContactAdmin = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [periodFilter, setPeriodFilter] = useState("all");

  // Pagination state (10 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const headers: Record<string, string> = token ? { "Authorization": `Token ${token}` } : {};
    fetch("http://127.0.0.1:8000/admin-panel/contact/messages/", { headers })
      .then((res) => res.json())
      .then((data) => setMessages(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching messages:", err));
  }, []);

  // Filter messages by selected period or calendar date
  const filteredMessages = messages.filter((msg: any) => {
    if (!msg.created_at) return true;
    try {
      const msgDate = new Date(msg.created_at);
      const todayObj = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      const todayStr = `${todayObj.getFullYear()}-${pad(todayObj.getMonth() + 1)}-${pad(todayObj.getDate())}`;
      const msgDateStr = `${msgDate.getFullYear()}-${pad(msgDate.getMonth() + 1)}-${pad(msgDate.getDate())}`;

      if (selectedDate) {
        return msgDateStr === selectedDate;
      }

      if (periodFilter === "today") {
        return msgDateStr === todayStr;
      }

      if (periodFilter === "week") {
        const currentDay = todayObj.getDay();
        const startOfWeek = new Date(todayObj);
        startOfWeek.setDate(todayObj.getDate() - currentDay);
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        return msgDate >= startOfWeek && msgDate <= endOfWeek;
      }

      if (periodFilter === "month") {
        return msgDate.getMonth() === todayObj.getMonth() && msgDate.getFullYear() === todayObj.getFullYear();
      }

      if (periodFilter === "year") {
        return msgDate.getFullYear() === todayObj.getFullYear();
      }

      return true;
    } catch {
      return true;
    }
  });

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMessages = filteredMessages.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate, periodFilter]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredMessages.length, totalPages, currentPage]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  const formatDateHeader = (dateKey: string) => {
    if (!dateKey || dateKey === "Unknown Date") return "RECEIVED ON UNKNOWN DATE";

    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${pad(yesterday.getMonth() + 1)}-${pad(yesterday.getDate())}`;

    let labelPrefix = "RECEIVED ON ";
    if (dateKey === todayStr) {
      labelPrefix = "RECEIVED TODAY — ";
    } else if (dateKey === yesterdayStr) {
      labelPrefix = "RECEIVED YESTERDAY — ";
    }

    try {
      const parts = dateKey.split("-");
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
        const formatted = d.toLocaleDateString("en-US", options);
        return `${labelPrefix}${formatted}`.toUpperCase();
      }
      return `${labelPrefix}${dateKey}`.toUpperCase();
    } catch {
      return `${labelPrefix}${dateKey}`.toUpperCase();
    }
  };

  // Group current page messages by date
  const groupedMessages: { [key: string]: any[] } = {};
  currentMessages.forEach((msg: any) => {
    let dateKey = "Unknown Date";
    if (msg.created_at) {
      try {
        dateKey = new Date(msg.created_at).toISOString().split("T")[0];
      } catch {
        dateKey = "Unknown Date";
      }
    }
    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = [];
    }
    groupedMessages[dateKey].push(msg);
  });

  const sortedDates = Object.keys(groupedMessages).sort((a, b) => b.localeCompare(a));

  return (
    <div className="con-page">
      <style>{contactStyles}</style>

      {/* Header */}
      <div className="con-header">
        <h2>✉️ Contact Messages</h2>
        <span className="con-badge">{messages.length} Messages</span>
      </div>

      {/* Table Card */}
      <div className="con-card">
        <div className="con-card-header">
          <h4>📋 Contact Inquiries</h4>

          {/* Period Filter Dropdown & Calendar Date Filter */}
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <select
              className="form-select form-select-sm"
              style={{ width: "auto", borderRadius: "8px", fontWeight: 600, borderColor: "#cbd5e1" }}
              value={periodFilter}
              onChange={(e) => {
                setPeriodFilter(e.target.value);
                setSelectedDate("");
              }}
            >
              <option value="all">All Messages</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>

            <input
              type="date"
              className="form-control form-control-sm"
              style={{ width: "auto", borderRadius: "8px", borderColor: "#cbd5e1" }}
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setPeriodFilter("all");
              }}
            />
            {selectedDate && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setSelectedDate("")}
                style={{ borderRadius: "8px", fontSize: "0.8rem" }}
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        <div className="con-table-wrap">
          <table className="con-table">
            <thead>
              <tr>
                <th style={{ width: "20%" }}>Sender</th>
                <th style={{ width: "22%" }}>Phone Number</th>
                <th style={{ width: "20%" }}>Subject</th>
                <th style={{ width: "23%" }}>Message</th>
                <th style={{ width: "15%" }}>Time Received</th>
              </tr>
            </thead>

            <tbody>
              {sortedDates.length > 0 ? (
                sortedDates.map((dateKey) => (
                  <React.Fragment key={dateKey}>
                    {/* Uppercase Group Date Header Bar */}
                    <tr className="con-date-group-header">
                      <td colSpan={5}>
                        {formatDateHeader(dateKey)}
                      </td>
                    </tr>
                    {groupedMessages[dateKey].map((msg: any) => (
                      <tr key={msg.id}>
                        <td data-label="Sender" style={{ fontWeight: 600, color: "#0f172a" }}>
                          {msg.name}
                        </td>
                        <td data-label="Phone Number">
                          <div style={{ fontSize: "0.88rem", color: "#2563eb", fontWeight: 600 }}>{msg.phone}</div>
                        </td>
                        <td data-label="Subject" style={{ fontWeight: 600, color: "#1e293b" }}>
                          {msg.subject || "General Inquiry"}
                        </td>
                        <td data-label="Message" style={{ color: "#475569", lineHeight: "1.5" }}>
                          {msg.message}
                        </td>
                        <td data-label="Time Received" style={{ fontSize: "0.8rem", color: "#64748b" }}>
                          {formatDate(msg.created_at)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div className="con-empty">
                      <div>✉️</div>
                      <p>
                        {selectedDate
                          ? `No messages found for ${selectedDate}.`
                          : "No contact messages found."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="d-flex align-items-center justify-content-between mt-4 pt-3 border-top flex-wrap gap-3">
            <small style={{ color: "#64748b", fontWeight: 500 }}>
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredMessages.length)} of {filteredMessages.length} messages
            </small>
            <div className="d-flex align-items-center gap-2">
              <button
                className="con-btn-sec"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
              >
                ‹ Previous
              </button>
              <span className="px-2 fw-semibold" style={{ color: "#0f172a", fontSize: "0.9rem" }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="con-btn-sec"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
              >
                Next ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactAdmin;