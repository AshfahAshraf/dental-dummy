'use client';

import React, { useEffect, useState, useRef } from "react";

const baStyles = `
  .ba-page { font-family: 'Inter', sans-serif; }
  .ba-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
  }
  .ba-header h2 {
    font-size: 1.6rem; font-weight: 700; color: #0f172a; margin: 0;
  }
  .ba-badge {
    background: #eff6ff; color: #2563eb; border-radius: 20px;
    padding: 4px 14px; font-size: 0.8rem; font-weight: 600;
  }

  /* Card */
  .ba-card {
    background: #fff; border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    padding: 28px; margin-bottom: 28px; border: 1px solid #f1f5f9;
  }
  .ba-card-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px; padding-bottom: 16px;
    border-bottom: 2px solid #f1f5f9; flex-wrap: wrap; gap: 12px;
  }
  .ba-card-header h4 {
    font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0;
    display: flex; align-items: center; gap: 8px;
  }

  /* Buttons */
  .ba-btn {
    padding: 10px 20px; border-radius: 10px; border: none;
    font-size: 0.88rem; font-weight: 600; cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .ba-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .ba-btn-primary { background: linear-gradient(135deg,#3b82f6,#2563eb); color: #fff; box-shadow: 0 4px 12px rgba(37,99,235,0.2); }
  .ba-btn-secondary { background: #f1f5f9; color: #475569; }
  .ba-btn-edit { 
    background: #3b82f6; color: #fff; padding: 7px 14px; 
    font-size: 0.8rem; border-radius: 8px; border: none; 
    cursor: pointer; font-weight: 600; transition: background 0.2s;
  }
  .ba-btn-edit:hover { background: #2563eb; }
  .ba-btn-delete { 
    background: #ef4444; color: #fff; padding: 7px 14px; 
    font-size: 0.8rem; border-radius: 8px; border: none; 
    cursor: pointer; font-weight: 600; transition: background 0.2s;
  }
  .ba-btn-delete:hover { background: #dc2626; }

  /* Table styling */
  .ba-table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid #e2e8f0; }
  .ba-table {
    width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;
  }
  .ba-table th {
    background: #f8fafc; color: #64748b; font-size: 0.75rem;
    text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;
    padding: 14px 18px; border-bottom: 2px solid #e2e8f0; white-space: nowrap;
  }
  .ba-table td {
    padding: 16px 18px; border-bottom: 1px solid #f1f5f9;
    color: #334155; vertical-align: middle;
  }
  .ba-table tr:last-child td { border-bottom: none; }
  .ba-table tr:hover td { background: #f8fafc; }

  .ba-table-img {
    width: 120px; height: 90px; object-fit: cover;
    border-radius: 10px; border: 1.5px solid #e2e8f0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  .ba-actions-cell {
    display: flex; align-items: center; gap: 8px; flex-wrap: nowrap;
  }

  .ba-empty {
    text-align: center; padding: 48px 24px; color: #94a3b8;
  }
  .ba-empty div { font-size: 3rem; margin-bottom: 8px; }
  .ba-empty p { font-size: 0.9rem; margin: 0; }

  /* Alert */
  .ba-alert {
    background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d;
    border-radius: 10px; padding: 12px 18px; margin-bottom: 20px;
    font-size: 0.9rem; font-weight: 500;
  }

  /* Modal Backdrop & Overlay */
  .ba-modal-backdrop {
    position: fixed; inset: 0; background: rgba(15,23,42,0.55);
    backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    z-index: 2000; padding: 20px;
    animation: baFadeIn 0.2s ease-out;
  }
  @keyframes baFadeIn { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }
  
  .ba-form-modal {
    background: #ffffff; border-radius: 20px;
    width: 100%; max-width: 620px; padding: 28px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.8);
  }
  .ba-modal-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid #f1f5f9;
  }
  .ba-modal-header h4 {
    font-size: 1.2rem; font-weight: 700; color: #0f172a; margin: 0;
  }
  .ba-close-btn {
    background: transparent; border: none; font-size: 1.3rem;
    color: #64748b; cursor: pointer; border-radius: 8px;
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
  }
  .ba-close-btn:hover { background: #f1f5f9; color: #0f172a; }

  /* Form */
  .ba-form-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;
  }
  @media (max-width: 600px) { .ba-form-grid { grid-template-columns: 1fr; } }
  .ba-field { display: flex; flex-direction: column; gap: 8px; }
  .ba-field label { font-size: 0.8rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
  .ba-file-label {
    display: flex; align-items: center; gap: 10px;
    border: 2px dashed #cbd5e1; border-radius: 12px;
    padding: 16px; cursor: pointer; color: #64748b;
    font-size: 0.88rem; transition: border-color 0.2s, background 0.2s;
  }
  .ba-file-label:hover { border-color: #3b82f6; background: #eff6ff; color: #2563eb; }
  .ba-file-input { display: none; }
  
  .ba-preview-container {
    margin-top: 8px; position: relative; width: 100%; height: 140px;
    overflow: hidden; border-radius: 8px; border: 1.5px solid #e2e8f0;
  }
  .ba-preview { width: 100%; height: 140px; object-fit: cover; }
  .ba-modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 16px; }

  /* Delete Confirmation Modal */
  .ba-confirm-modal {
    background: #fff; border-radius: 20px; padding: 28px;
    max-width: 420px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  }
  .ba-confirm-icon { font-size: 2.5rem; margin-bottom: 12px; }
  .ba-confirm-modal h4 { font-size: 1.15rem; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
  .ba-confirm-modal p { color: #64748b; font-size: 0.9rem; margin-bottom: 24px; }
`;

const BeforeAfterAdmin = () => {
  const [results, setResults] = useState<any[]>([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);
  const [beforePreview, setBeforePreview] = useState("");
  const [afterPreview, setAfterPreview] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Pagination state (5 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResults = results.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [results.length, totalPages, currentPage]);

  const beforeRef = useRef<HTMLInputElement>(null);
  const afterRef = useRef<HTMLInputElement>(null);

  const API = "http://127.0.0.1:8000/admin-panel/results/";

  const getHeaders = (): Record<string, string> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    return token ? { "Authorization": `Token ${token}` } : {};
  };

  const fetchResults = async () => {
    try {
      const res = await fetch(API, { headers: getHeaders() });
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const resetForm = () => {
    setBeforeImage(null);
    setAfterImage(null);
    setBeforePreview("");
    setAfterPreview("");
    setEditingId(null);
    if (beforeRef.current) beforeRef.current.value = "";
    if (afterRef.current) afterRef.current.value = "";
  };

  const openAddModal = () => {
    resetForm();
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    resetForm();
  };

  const getImageUrl = (src?: string) => {
    if (!src) return "";
    if (src.startsWith("data:") || src.startsWith("http://") || src.startsWith("https://")) {
      return src;
    }
    if (src.startsWith("/")) {
      return `http://127.0.0.1:8000${src}`;
    }
    return `http://127.0.0.1:8000/${src}`;
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setBeforePreview(getImageUrl(item.before_image));
    setAfterPreview(getImageUrl(item.after_image));
    setIsFormModalOpen(true);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (beforeImage) formData.append("before_image", beforeImage);
    if (afterImage) formData.append("after_image", afterImage);

    const url = editingId
      ? `http://127.0.0.1:8000/admin-panel/results/update/${editingId}/`
      : "http://127.0.0.1:8000/admin-panel/results/add/";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: getHeaders(),
      body: formData,
    });

    if (res.ok) {
      setMessage(editingId ? "✅ Case study updated successfully" : "✅ Case study added successfully");
      closeFormModal();
      fetchResults();
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`http://127.0.0.1:8000/admin-panel/results/delete/${deleteId}/`, {
      method: "DELETE",
      headers: getHeaders()
    });

    if (res.ok) {
      setMessage("🗑️ Case study deleted");
      setShowDeleteModal(false);
      fetchResults();
    }
  };

  return (
    <div className="ba-page">
      <style>{baStyles}</style>

      {/* Page Header */}
      <div className="ba-header">
        <h2>🖼️ Manage Before & After Gallery</h2>
        <span className="ba-badge">{results.length} Cases</span>
      </div>

      {/* Alert Message */}
      {message && (
        <div className="ba-alert" onClick={() => setMessage("")}>{message}</div>
      )}

      {/* Results Table Card */}
      <div className="ba-card">
        <div className="ba-card-header">
          <h4>📋 Before & After Gallery</h4>
          <button className="ba-btn ba-btn-primary" onClick={openAddModal}>
            <span>➕</span> Add New Case Study
          </button>
        </div>

        <div className="ba-table-wrap">
          <table className="ba-table">
            <thead>
              <tr>
                <th style={{ width: "15%" }}># Case ID</th>
                <th style={{ width: "35%" }}>Before Condition</th>
                <th style={{ width: "35%" }}>After Treatment</th>
                <th style={{ width: "15%", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <div className="ba-empty">
                      <div>🖼️</div>
                      <p>No gallery items yet. Click "Add New Case Study" to create one.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentResults.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span style={{ fontWeight: 600, color: "#64748b" }}>#{item.id}</span>
                    </td>
                    <td>
                      <img
                        src={getImageUrl(item.before_image)}
                        alt="Before condition"
                        className="ba-table-img"
                      />
                    </td>
                    <td>
                      <img
                        src={getImageUrl(item.after_image)}
                        alt="After treatment"
                        className="ba-table-img"
                      />
                    </td>
                    <td>
                      <div className="ba-actions-cell" style={{ justifyContent: "flex-end" }}>
                        <button className="ba-btn-edit" onClick={() => handleEdit(item)}>Edit</button>
                        <button
                          className="ba-btn-delete"
                          onClick={() => { setDeleteId(item.id); setShowDeleteModal(true); }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="d-flex align-items-center justify-content-between mt-4 pt-3 border-top flex-wrap gap-3">
            <small style={{ color: "#64748b", fontWeight: 500 }}>
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, results.length)} of {results.length} cases
            </small>
            <div className="d-flex align-items-center gap-2">
              <button
                className="ba-btn ba-btn-secondary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
              >
                ‹ Previous
              </button>
              <span className="px-2 fw-semibold" style={{ color: "#0f172a", fontSize: "0.9rem" }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="ba-btn ba-btn-secondary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
              >
                Next ›
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Form Modal */}
      {isFormModalOpen && (
        <div className="ba-modal-backdrop" onClick={closeFormModal}>
          <div className="ba-form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ba-modal-header">
              <h4>{editingId ? "✏️ Edit Case Study" : "➕ Add Case Study"}</h4>
              <button className="ba-close-btn" onClick={closeFormModal}>✕</button>
            </div>

            <div className="ba-form-grid">
              <div className="ba-field">
                <label>Before Image</label>
                <label className="ba-file-label">
                  📎 {beforeImage ? beforeImage.name : "Choose Before Image"}
                  <input
                    type="file"
                    className="ba-file-input"
                    ref={beforeRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setBeforeImage(file);
                        setBeforePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
                {beforePreview && (
                  <div className="ba-preview-container">
                    <img src={beforePreview} alt="Before preview" className="ba-preview" />
                  </div>
                )}
              </div>

              <div className="ba-field">
                <label>After Image</label>
                <label className="ba-file-label">
                  📎 {afterImage ? afterImage.name : "Choose After Image"}
                  <input
                    type="file"
                    className="ba-file-input"
                    ref={afterRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setAfterImage(file);
                        setAfterPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
                {afterPreview && (
                  <div className="ba-preview-container">
                    <img src={afterPreview} alt="After preview" className="ba-preview" />
                  </div>
                )}
              </div>
            </div>

            <div className="ba-modal-actions">
              <button className="ba-btn ba-btn-secondary" onClick={closeFormModal}>
                Cancel
              </button>
              <button className="ba-btn ba-btn-primary" onClick={handleSubmit}>
                {editingId ? "Save Changes" : "Upload Case Study"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="ba-modal-backdrop" onClick={() => setShowDeleteModal(false)}>
          <div className="ba-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ba-confirm-icon">🗑️</div>
            <h4>Delete Case Study</h4>
            <p>Are you sure you want to remove this case study from the gallery?</p>
            <div className="ba-modal-actions">
              <button className="ba-btn ba-btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="ba-btn ba-btn-delete" onClick={confirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeforeAfterAdmin;