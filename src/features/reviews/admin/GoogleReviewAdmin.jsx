'use client';

import React, { useEffect, useState } from "react";

const revStyles = `
  .rev-page { font-family: 'Inter', sans-serif; }
  .rev-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
  }
  .rev-header h2 {
    font-size: 1.6rem; font-weight: 700; color: #0f172a; margin: 0;
  }
  .rev-badge {
    background: #eff6ff; color: #2563eb; border-radius: 20px;
    padding: 4px 14px; font-size: 0.8rem; font-weight: 600;
  }
  /* Main Container Card */
  .rev-card {
    background: #fff; border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    padding: 28px; margin-bottom: 28px; border: 1px solid #f1f5f9;
  }
  .rev-card-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px; padding-bottom: 16px;
    border-bottom: 2px solid #f1f5f9; flex-wrap: wrap; gap: 12px;
  }
  .rev-card-header h4 {
    font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0;
    display: flex; align-items: center; gap: 8px;
  }
  
  /* Buttons */
  .rev-btn {
    padding: 10px 20px; border-radius: 10px; border: none;
    font-size: 0.88rem; font-weight: 600; cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .rev-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .rev-btn-primary { background: linear-gradient(135deg,#3b82f6,#2563eb); color: #fff; box-shadow: 0 4px 12px rgba(37,99,235,0.2); }
  .rev-btn-secondary { background: #f1f5f9; color: #475569; }
  .rev-btn-edit { 
    background: #3b82f6; color: #fff; padding: 7px 14px; 
    font-size: 0.8rem; border-radius: 8px; border: none; 
    cursor: pointer; font-weight: 600; transition: background 0.2s;
  }
  .rev-btn-edit:hover { background: #2563eb; }
  .rev-btn-delete { 
    background: #ef4444; color: #fff; padding: 7px 14px; 
    font-size: 0.8rem; border-radius: 8px; border: none; 
    cursor: pointer; font-weight: 600; transition: background 0.2s;
  }
  .rev-btn-delete:hover { background: #dc2626; }
  
  /* Table styling */
  .rev-table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid #e2e8f0; }
  .rev-table {
    width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;
  }
  .rev-table th {
    background: #f8fafc; color: #64748b; font-size: 0.75rem;
    text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;
    padding: 14px 18px; border-bottom: 2px solid #e2e8f0; white-space: nowrap;
  }
  .rev-table td {
    padding: 16px 18px; border-bottom: 1px solid #f1f5f9;
    color: #334155; vertical-align: middle;
  }
  .rev-table tr:last-child td { border-bottom: none; }
  .rev-table tr:hover td { background: #f8fafc; }
  
  .rev-actions-cell {
    display: flex; align-items: center; gap: 8px; flex-wrap: nowrap;
  }
  .rev-stars { color: #f59e0b; font-size: 1rem; letter-spacing: 2px; }
  
  .rev-empty {
    text-align: center; padding: 48px 24px; color: #94a3b8;
  }
  .rev-empty div { font-size: 3rem; margin-bottom: 8px; }
  .rev-empty p { font-size: 0.9rem; margin: 0; }

  /* Modal Overlay & Card */
  .rev-modal-overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15, 23, 42, 0.55); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000; padding: 20px;
    animation: revFadeIn 0.2s ease-out;
  }
  @keyframes revFadeIn {
    from { opacity: 0; transform: scale(0.97); }
    to { opacity: 1; transform: scale(1); }
  }
  .rev-modal-card {
    background: #ffffff; border-radius: 20px;
    width: 100%; max-width: 560px; padding: 28px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.8);
  }
  .rev-modal-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid #f1f5f9;
  }
  .rev-modal-header h4 {
    font-size: 1.2rem; font-weight: 700; color: #0f172a; margin: 0;
  }
  .rev-close-btn {
    background: transparent; border: none; font-size: 1.3rem;
    color: #64748b; cursor: pointer; border-radius: 8px;
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
  }
  .rev-close-btn:hover { background: #f1f5f9; color: #0f172a; }

  /* Form */
  .rev-form-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;
  }
  @media (max-width: 550px) { .rev-form-grid { grid-template-columns: 1fr; } }
  .rev-field { display: flex; flex-direction: column; gap: 6px; }
  .rev-field label { font-size: 0.8rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
  .rev-input {
    border: 1.5px solid #e2e8f0; border-radius: 10px;
    padding: 10px 14px; font-size: 0.9rem; color: #1e293b;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    background: #f8fafc; width: 100%; box-sizing: border-box;
  }
  .rev-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.12); background: #fff; }
  .rev-textarea { resize: vertical; min-height: 90px; }
  .rev-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; margin-top: 16px; }
`;

export const formatRelativeTime = (dateStr) => {
  if (!dateStr || dateStr.trim() === "") return "Today";
  
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) {
    return dateStr;
  }

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

const getTodayDateStr = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const GoogleReview = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    review_time: getTodayDateStr(),
    review_text: "",
    rating: 5,
  });

  const API = "http://127.0.0.1:8000/admin-panel/reviews/";

  const getHeaders = (isJson = false) => {
    const token = localStorage.getItem("admin_token");
    const headers = {};
    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    if (isJson) {
      headers["Content-Type"] = "application/json";
    }
    return headers;
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(API, { headers: getHeaders() });
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      review_time: getTodayDateStr(),
      review_text: "",
      rating: 5,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (review) => {
    setEditingId(review.id);
    setFormData({
      name: review.name,
      review_time: review.review_time || getTodayDateStr(),
      review_text: review.review_text,
      rating: review.rating,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/admin-panel/reviews/delete/${id}/`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (res.ok) {
        fetchReviews();
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const url = editingId
        ? `http://127.0.0.1:8000/admin-panel/reviews/update/${editingId}/`
        : "http://127.0.0.1:8000/admin-panel/reviews/add/";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: getHeaders(true),
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        closeModal();
        fetchReviews();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="rev-page">
      <style>{revStyles}</style>

      {/* Page Header */}
      <div className="rev-header">
        <h2>⭐ Manage Google Reviews</h2>
        <span className="rev-badge">{reviews.length} total reviews</span>
      </div>

      {/* Reviews Table Card */}
      <div className="rev-card">
        <div className="rev-card-header">
          <h4>📋 Customer Feedback Registry</h4>
          <button className="rev-btn rev-btn-primary" onClick={openAddModal}>
            <span>➕</span> Add New Google Review
          </button>
        </div>

        <div className="rev-table-wrap">
          <table className="rev-table">
            <thead>
              <tr>
                <th style={{ width: "20%" }}>Name</th>
                <th style={{ width: "15%" }}>Relative Date</th>
                <th style={{ width: "40%" }}>Review Text</th>
                <th style={{ width: "13%" }}>Rating</th>
                <th style={{ width: "12%", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <tr key={review.id}>
                    <td style={{ fontWeight: 600, color: "#0f172a" }}>{review.name}</td>
                    <td style={{ color: "#2563eb", fontWeight: 500 }}>
                      {formatRelativeTime(review.review_time)}
                    </td>
                    <td style={{ color: "#475569", lineHeight: "1.5" }}>{review.review_text}</td>
                    <td>
                      <span className="rev-stars">{"★".repeat(Number(review.rating) || 5)}</span>
                    </td>
                    <td>
                      <div className="rev-actions-cell" style={{ justifyContent: "flex-end" }}>
                        <button className="rev-btn-edit" onClick={() => handleEdit(review)}>Edit</button>
                        <button className="rev-btn-delete" onClick={() => handleDelete(review.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div className="rev-empty">
                      <div>⭐</div>
                      <p>No reviews available yet.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Review Modal Overlay */}
      {isModalOpen && (
        <div className="rev-modal-overlay" onClick={closeModal}>
          <div className="rev-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="rev-modal-header">
              <h4>{editingId ? "✏️ Edit Google Review" : "➕ Add New Google Review"}</h4>
              <button className="rev-close-btn" onClick={closeModal}>✕</button>
            </div>

            <div className="rev-form-grid">
              <div className="rev-field">
                <label>Reviewer Name</label>
                <input
                  type="text"
                  name="name"
                  className="rev-input"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="rev-field">
                <label>Review Date</label>
                <input
                  type="date"
                  name="review_time"
                  className="rev-input"
                  value={formData.review_time}
                  onChange={handleChange}
                />
              </div>

              <div className="rev-field" style={{ gridColumn: "1 / -1" }}>
                <label>Review Text</label>
                <textarea
                  name="review_text"
                  className="rev-input rev-textarea"
                  placeholder="Write or paste the patient's review..."
                  value={formData.review_text}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="rev-field" style={{ gridColumn: "1 / -1" }}>
                <label>Rating</label>
                <select
                  name="rating"
                  className="rev-input"
                  value={formData.rating}
                  onChange={handleChange}
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                  <option value="3">⭐⭐⭐ (3 Stars)</option>
                  <option value="2">⭐⭐ (2 Stars)</option>
                  <option value="1">⭐ (1 Star)</option>
                </select>
              </div>
            </div>

            <div className="rev-actions">
              <button className="rev-btn rev-btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="rev-btn rev-btn-primary" onClick={handleSubmit}>
                {editingId ? "Update Review" : "Save Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleReview;