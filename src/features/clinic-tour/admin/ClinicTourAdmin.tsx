'use client';

import React, { useEffect, useState, useRef } from "react";

const ctStyles = `
  .ct-page { font-family: 'Inter', sans-serif; }
  .ct-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
  }
  .ct-header h2 {
    font-size: 1.6rem; font-weight: 700; color: #0f172a; margin: 0;
  }
  .ct-badge {
    background: #eff6ff; color: #2563eb; border-radius: 20px;
    padding: 4px 14px; font-size: 0.8rem; font-weight: 600;
  }

  /* Card */
  .ct-card {
    background: #fff; border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    padding: 28px; margin-bottom: 28px; border: 1px solid #f1f5f9;
  }
  .ct-card-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px; padding-bottom: 16px;
    border-bottom: 2px solid #f1f5f9; flex-wrap: wrap; gap: 12px;
  }
  .ct-card-header h4 {
    font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0;
    display: flex; align-items: center; gap: 8px;
  }

  /* Buttons */
  .ct-btn {
    padding: 10px 20px; border-radius: 10px; border: none;
    font-size: 0.88rem; font-weight: 600; cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .ct-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .ct-btn-primary { background: linear-gradient(135deg,#3b82f6,#2563eb); color: #fff; box-shadow: 0 4px 12px rgba(37,99,235,0.2); }
  .ct-btn-secondary { background: #f1f5f9; color: #475569; }
  .ct-btn-edit { 
    background: #3b82f6; color: #fff; padding: 7px 14px; 
    font-size: 0.8rem; border-radius: 8px; border: none; 
    cursor: pointer; font-weight: 600; transition: background 0.2s;
  }
  .ct-btn-edit:hover { background: #2563eb; }
  .ct-btn-delete { 
    background: #ef4444; color: #fff; padding: 7px 14px; 
    font-size: 0.8rem; border-radius: 8px; border: none; 
    cursor: pointer; font-weight: 600; transition: background 0.2s;
  }
  .ct-btn-delete:hover { background: #dc2626; }

  /* Table styling */
  .ct-table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid #e2e8f0; }
  .ct-table {
    width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;
  }
  .ct-table th {
    background: #f8fafc; color: #64748b; font-size: 0.75rem;
    text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;
    padding: 14px 18px; border-bottom: 2px solid #e2e8f0; white-space: nowrap;
  }
  .ct-table td {
    padding: 16px 18px; border-bottom: 1px solid #f1f5f9;
    color: #334155; vertical-align: middle;
  }
  .ct-table tr:last-child td { border-bottom: none; }
  .ct-table tr:hover td { background: #f8fafc; }

  .ct-table-img {
    width: 160px; height: 100px; object-fit: cover;
    border-radius: 10px; border: 1.5px solid #e2e8f0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  .ct-actions-cell {
    display: flex; align-items: center; gap: 8px; flex-wrap: nowrap;
  }

  .ct-empty {
    text-align: center; padding: 48px 24px; color: #94a3b8;
  }
  .ct-empty div { font-size: 3rem; margin-bottom: 8px; }
  .ct-empty p { font-size: 0.9rem; margin: 0; }

  /* Alert */
  .ct-alert {
    background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d;
    border-radius: 10px; padding: 12px 18px; margin-bottom: 20px;
    font-size: 0.9rem; font-weight: 500;
  }

  /* Modal Backdrop & Overlay */
  .ct-modal-backdrop {
    position: fixed; inset: 0; background: rgba(15,23,42,0.55);
    backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    z-index: 2000; padding: 20px;
    animation: ctFadeIn 0.2s ease-out;
  }
  @keyframes ctFadeIn { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }
  
  .ct-form-modal {
    background: #ffffff; border-radius: 20px;
    width: 100%; max-width: 520px; padding: 28px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.8);
  }
  .ct-modal-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid #f1f5f9;
  }
  .ct-modal-header h4 {
    font-size: 1.2rem; font-weight: 700; color: #0f172a; margin: 0;
  }
  .ct-close-btn {
    background: transparent; border: none; font-size: 1.3rem;
    color: #64748b; cursor: pointer; border-radius: 8px;
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
  }
  .ct-close-btn:hover { background: #f1f5f9; color: #0f172a; }

  /* Form */
  .ct-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .ct-field label { font-size: 0.8rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
  .ct-file-label {
    display: flex; align-items: center; gap: 10px;
    border: 2px dashed #cbd5e1; border-radius: 12px;
    padding: 16px; cursor: pointer; color: #64748b;
    font-size: 0.88rem; transition: border-color 0.2s, background 0.2s;
  }
  .ct-file-label:hover { border-color: #3b82f6; background: #eff6ff; color: #2563eb; }
  .ct-file-input { display: none; }
  
  .ct-preview-container {
    margin-top: 10px; position: relative; width: 100%; max-height: 180px;
    overflow: hidden; border-radius: 10px; border: 1.5px solid #e2e8f0;
  }
  .ct-preview { width: 100%; height: 180px; object-fit: cover; }
  .ct-modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 16px; }

  /* Delete Confirmation Modal */
  .ct-confirm-modal {
    background: #fff; border-radius: 20px; padding: 28px;
    max-width: 420px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  }
  .ct-confirm-icon { font-size: 2.5rem; margin-bottom: 12px; }
  .ct-confirm-modal h4 { font-size: 1.15rem; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
  .ct-confirm-modal p { color: #64748b; font-size: 0.9rem; margin-bottom: 24px; }
`;

const ClinicTourAdmin = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Pagination state (5 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(tours.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTours = tours.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [tours.length, totalPages, currentPage]);

  const fileRef = useRef<HTMLInputElement>(null);

  const API = "http://127.0.0.1:8000/admin-panel/clinic-tour/";

  const getHeaders = (): Record<string, string> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    return token ? { "Authorization": `Token ${token}` } : {};
  };

  const fetchTours = async () => {
    try {
      const res = await fetch(API, { headers: getHeaders() });
      const data = await res.json();
      setTours(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const resetForm = () => {
    setImage(null);
    setPreview("");
    setEditingId(null);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
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
    setPreview(getImageUrl(item.image));
    setIsFormModalOpen(true);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }

    const url = editingId
      ? `http://127.0.0.1:8000/admin-panel/clinic-tour/update/${editingId}/`
      : "http://127.0.0.1:8000/admin-panel/clinic-tour/add/";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: getHeaders(),
      body: formData,
    });

    if (res.ok) {
      setMessage(editingId ? "✅ Image updated successfully" : "✅ Image added successfully");
      closeFormModal();
      fetchTours();
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`http://127.0.0.1:8000/admin-panel/clinic-tour/delete/${deleteId}/`, {
      method: "DELETE",
      headers: getHeaders()
    });

    if (res.ok) {
      setMessage("🗑️ Image deleted");
      setShowDeleteModal(false);
      fetchTours();
    }
  };

  return (
    <div className="ct-page">
      <style>{ctStyles}</style>

      {/* Page Header */}
      <div className="ct-header">
        <h2>🏥 Manage Clinic Tour</h2>
        <span className="ct-badge">{tours.length} Photos</span>
      </div>

      {/* Alert Message */}
      {message && (
        <div className="ct-alert" onClick={() => setMessage("")}>{message}</div>
      )}

      {/* Results Table Card */}
      <div className="ct-card">
        <div className="ct-card-header">
          <h4>📋 Clinic Tour Gallery</h4>
          <button className="ct-btn ct-btn-primary" onClick={openAddModal}>
            <span>➕</span> Add New Tour Photo
          </button>
        </div>

        <div className="ct-table-wrap">
          <table className="ct-table">
            <thead>
              <tr>
                <th style={{ width: "20%" }}># Photo ID</th>
                <th style={{ width: "60%" }}>Tour Photo Preview</th>
                <th style={{ width: "20%", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.length === 0 ? (
                <tr>
                  <td colSpan={3}>
                    <div className="ct-empty">
                      <div>🏥</div>
                      <p>No gallery items yet. Click "Add New Tour Photo" to upload one.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentTours.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span style={{ fontWeight: 600, color: "#64748b" }}>#{item.id}</span>
                    </td>
                    <td>
                      <img
                        src={getImageUrl(item.image)}
                        alt="Clinic Tour"
                        className="ct-table-img"
                      />
                    </td>
                    <td>
                      <div className="ct-actions-cell" style={{ justifyContent: "flex-end" }}>
                        <button className="ct-btn-edit" onClick={() => handleEdit(item)}>Edit</button>
                        <button
                          className="ct-btn-delete"
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, tours.length)} of {tours.length} photos
            </small>
            <div className="d-flex align-items-center gap-2">
              <button
                className="ct-btn ct-btn-secondary"
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
                className="ct-btn ct-btn-secondary"
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
        <div className="ct-modal-backdrop" onClick={closeFormModal}>
          <div className="ct-form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ct-modal-header">
              <h4>{editingId ? "✏️ Edit Tour Image" : "➕ Add Tour Image"}</h4>
              <button className="ct-close-btn" onClick={closeFormModal}>✕</button>
            </div>

            <div className="ct-field">
              <label>Tour Image</label>
              <label className="ct-file-label">
                📎 {image ? image.name : "Choose Gallery Image"}
                <input
                  type="file"
                  className="ct-file-input"
                  ref={fileRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImage(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
              {preview && (
                <div className="ct-preview-container">
                  <img src={preview} alt="Tour preview" className="ct-preview" />
                </div>
              )}
            </div>

            <div className="ct-modal-actions">
              <button className="ct-btn ct-btn-secondary" onClick={closeFormModal}>
                Cancel
              </button>
              <button className="ct-btn ct-btn-primary" onClick={handleSubmit}>
                {editingId ? "Save Changes" : "Upload Image"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="ct-modal-backdrop" onClick={() => setShowDeleteModal(false)}>
          <div className="ct-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ct-confirm-icon">🗑️</div>
            <h4>Delete Image</h4>
            <p>Are you sure you want to remove this photo from the clinic tour?</p>
            <div className="ct-modal-actions">
              <button className="ct-btn ct-btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="ct-btn ct-btn-delete" onClick={confirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicTourAdmin;