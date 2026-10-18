'use client';

import React, { useEffect, useState, useRef } from "react";

const doctorStyles = `
  .doc-page { font-family: 'Inter', sans-serif; }
  .doc-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 28px; flex-wrap: wrap; gap: 12px;
  }
  .doc-header h2 {
    font-size: 1.6rem; font-weight: 700; color: #0f172a; margin: 0;
  }
  .doc-badge {
    background: #eff6ff; color: #2563eb; border-radius: 20px;
    padding: 4px 14px; font-size: 0.8rem; font-weight: 600;
  }
  /* Card */
  .doc-card {
    background: #fff; border-radius: 16px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.07);
    padding: 28px; margin-bottom: 28px;
  }
  .doc-card h4 {
    font-size: 1.05rem; font-weight: 700; color: #1e293b;
    margin-bottom: 20px; padding-bottom: 12px;
    border-bottom: 2px solid #f1f5f9;
  }
  /* Form */
  .doc-form-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    margin-bottom: 16px;
  }
  @media (max-width: 600px) { .doc-form-grid { grid-template-columns: 1fr; } }
  .doc-field { display: flex; flex-direction: column; gap: 6px; }
  .doc-field label { font-size: 0.8rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
  .doc-input {
    border: 1.5px solid #e2e8f0; border-radius: 10px;
    padding: 10px 14px; font-size: 0.9rem; color: #1e293b;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    background: #f8fafc; width: 100%; box-sizing: border-box;
  }
  .doc-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.12); background: #fff; }
  
  .doc-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
  /* Buttons */
  .doc-btn {
    padding: 8px 16px; border-radius: 10px; border: none;
    font-size: 0.88rem; font-weight: 600; cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    display: inline-flex; align-items: center; justify-content: center;
    gap: 6px; white-space: nowrap;
  }
  .doc-btn:hover { opacity: 0.88; transform: translateY(-1px); }
  .doc-btn-primary { background: linear-gradient(135deg,#3b82f6,#2563eb); color: #fff; }
  .doc-btn-secondary { background: #f1f5f9; color: #475569; }
  .doc-btn-danger { background: linear-gradient(135deg,#ef4444,#dc2626); color: #fff; }
  .doc-btn-warning { background: linear-gradient(135deg,#f59e0b,#d97706); color: #fff; }
  .doc-btn-success { background: linear-gradient(135deg,#22c55e,#16a34a); color: #fff; }
  /* Alert */
  .doc-alert {
    background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d;
    border-radius: 10px; padding: 12px 18px; margin-bottom: 20px;
    font-size: 0.9rem; font-weight: 500;
  }
  /* Table wrapper */
  .doc-table-wrap { overflow-x: auto; }
  .doc-table {
    width: 100%; border-collapse: collapse; font-size: 0.88rem;
  }
  .doc-table th {
    background: #f8fafc; color: #64748b; font-size: 0.75rem;
    text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;
    padding: 12px 16px; text-align: left;
    border-bottom: 2px solid #f1f5f9;
  }
  .doc-table td {
    padding: 14px 16px; border-bottom: 1px solid #f1f5f9;
    color: #334155; vertical-align: middle;
  }
  .doc-table tr:last-child td { border-bottom: none; }
  .doc-table tr:hover td { background: #fafafa; }
  
  .doc-avatar {
    width: 44px; height: 44px; border-radius: 50%;
    background: #e2e8f0; display: flex; align-items: center;
    justify-content: center; font-weight: 700; color: #475569;
    font-size: 0.95rem; border: 2px solid #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    overflow: hidden;
  }
  .doc-avatar-img {
    width: 100%; height: 100%; object-fit: cover;
  }
  .doc-file-label {
    display: flex; align-items: center; gap: 10px;
    border: 2px dashed #cbd5e1; border-radius: 10px;
    padding: 14px 16px; cursor: pointer; color: #64748b;
    font-size: 0.88rem; transition: border-color 0.2s, background 0.2s;
  }
  .doc-file-label:hover { border-color: #3b82f6; background: #eff6ff; color: #2563eb; }
  .doc-file-input { display: none; }
  .doc-preview {
    width: 72px; height: 72px; object-fit: cover; border-radius: 50%;
    margin-top: 10px; border: 2px solid #e2e8f0;
  }
  .doc-row-actions { display: flex; gap: 8px; flex-wrap: nowrap; min-width: 130px; align-items: center; }
  /* Modal */
  .doc-modal-backdrop {
    position: fixed; inset: 0; background: rgba(15,23,42,0.55);
    display: flex; align-items: center; justify-content: center;
    z-index: 2000; padding: 16px;
  }
  .doc-modal {
    background: #fff; border-radius: 20px; padding: 32px;
    max-width: 420px; width: 100%;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    animation: modalIn 0.25s ease;
  }
  @keyframes modalIn { from { opacity:0; transform:scale(0.93); } to { opacity:1; transform:scale(1); } }
  .doc-modal-icon { font-size: 2.5rem; margin-bottom: 12px; }
  .doc-modal h4 { font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
  .doc-modal p { color: #64748b; font-size: 0.9rem; margin-bottom: 24px; }
  .doc-modal-actions { display: flex; gap: 10px; justify-content: flex-end; }
  /* Empty state */
  .doc-empty {
    text-align: center; padding: 48px 24px; color: #94a3b8;
  }
  .doc-empty div { font-size: 3rem; margin-bottom: 8px; }
  .doc-empty p { font-size: 0.9rem; }
  .doc-table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid #e2e8f0; }
  .doc-table {
    width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;
  }
  .doc-table th {
    background: #f8fafc; color: #64748b; font-size: 0.75rem;
    text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;
    padding: 14px 18px; border-bottom: 2px solid #e2e8f0; white-space: nowrap;
  }
  .doc-table td {
    padding: 16px 18px; border-bottom: 1px solid #f1f5f9;
    color: #334155; vertical-align: middle; white-space: nowrap;
  }
  .doc-table tr:last-child td { border-bottom: none; }
  .doc-table tr:hover td { background: #f8fafc; }

  @media (max-width: 768px) {
    .doc-table-wrap { border: none; overflow-x: visible; }
    .doc-table thead { display: none; }
    .doc-table, .doc-table tbody { display: block; width: 100%; }
    .doc-table tr {
      display: block; background: #ffffff;
      border: 1.5px solid #e2e8f0; border-radius: 16px;
      padding: 14px 18px; margin-bottom: 14px;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
    }
    .doc-table td {
      display: flex; justify-content: space-between;
      align-items: center; padding: 10px 0;
      border-bottom: 1px dashed #f1f5f9; white-space: normal; text-align: right;
    }
    .doc-table td:last-child { border-bottom: none; }
    .doc-table td::before {
      content: attr(data-label); font-weight: 700;
      color: #64748b; font-size: 0.75rem; text-transform: uppercase;
      letter-spacing: 0.5px; margin-right: 12px; flex-shrink: 0; text-align: left;
    }
  }
`;

const DoctorAdmin = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ name?: string; role?: string }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const API = "http://127.0.0.1:8000/admin-panel/doctors/";

  const getHeaders = (isJson = false): Record<string, string> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    if (isJson) {
      headers["Content-Type"] = "application/json";
    }
    return headers;
  };

  const fetchDoctors = async () => {
    try {
      const res = await fetch(API, { headers: getHeaders() });
      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const resetForm = () => {
    setName("");
    setRole("");
    setImage(null);
    setPreview("");
    setEditingId(null);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("role", role);
    if (image) fd.append("image", image);
    return fd;
  };

  // Add Doctor
  const addDoctor = async () => {
    const res = await fetch("http://127.0.0.1:8000/admin-panel/doctors/add/", {
      method: "POST",
      headers: getHeaders(), // multipart/form-data: no JSON content-type
      body: buildFormData(),
    });

    if (res.ok) {
      setMessage("✅ Doctor added successfully");
      resetForm();
      setShowFormModal(false);
      fetchDoctors();
    } else {
      const err = await res.json().catch(() => ({}));
      setMessage(`❌ Failed to add doctor: ${JSON.stringify(err)}`);
    }
  };

  // Confirm Update
  const confirmUpdate = async () => {
    const res = await fetch(`http://127.0.0.1:8000/admin-panel/doctors/update/${editingId}/`, {
      method: "PUT",
      headers: getHeaders(), // multipart/form-data: no JSON content-type
      body: buildFormData(),
    });

    if (res.ok) {
      setMessage("✅ Doctor updated successfully");
      setShowUpdateModal(false);
      resetForm();
      setShowFormModal(false);
      fetchDoctors();
    } else {
      const err = await res.json().catch(() => ({}));
      setMessage(`❌ Failed to update doctor: ${JSON.stringify(err)}`);
    }
  };

  // Submit
  const handleSubmit = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) {
      newErrors.name = "Doctor Name is required.";
    }
    if (!role.trim()) {
      newErrors.role = "Specialization / Role is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (editingId) {
      setShowUpdateModal(true);
    } else {
      addDoctor();
    }
  };

  // Edit
  const handleEdit = (doctor: any) => {
    setName(doctor.name);
    setRole(doctor.role);
    setEditingId(doctor.id);
    setPreview(doctor.image ? `http://127.0.0.1:8000${doctor.image}` : "");
    setImage(null);
    setShowFormModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    const res = await fetch(`http://127.0.0.1:8000/admin-panel/doctors/delete/${deleteId}/`, {
      method: "DELETE",
      headers: getHeaders()
    });

    if (res.ok) {
      setMessage("🗑️ Doctor deleted");
      setShowDeleteModal(false);
      fetchDoctors();
    }
  };

  const filteredDoctors = doctors.filter((doc: any) =>
    (doc.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.role || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="doc-page">
      <style>{doctorStyles}</style>

      {/* Header */}
      <div className="doc-header">
        <h2>👨‍⚕️ Manage Doctors</h2>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span className="doc-badge">{doctors.length} doctors</span>
          <button className="doc-btn doc-btn-primary" onClick={() => { resetForm(); setShowFormModal(true); }}>
            ➕ Add Doctor
          </button>
        </div>
      </div>

      {/* Alert */}
      {message && (
        <div className="doc-alert" onClick={() => setMessage("")}>{message}</div>
      )}

      {/* Form Modal */}
      {showFormModal && (
        <div className="doc-modal-backdrop">
          <div className="doc-modal" style={{ width: "500px", maxWidth: "95%" }}>
            <h4 style={{ marginBottom: "20px", fontWeight: "700" }}>{editingId ? "✏️ Edit Doctor Profile" : "➕ Add New Doctor"}</h4>
            
            <div className="doc-form-grid" style={{ gridTemplateColumns: "1fr" }}>
              <div className="doc-field">
                <label>Doctor Name</label>
                <input
                  className="doc-input"
                  placeholder="e.g. Dr. Emily Stone"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                  }}
                  style={errors.name ? { borderColor: "#ef4444" } : {}}
                />
                {errors.name && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>{errors.name}</span>}
              </div>

              <div className="doc-field">
                <label>Specialization / Role</label>
                <input
                  className="doc-input"
                  placeholder="e.g. Orthodontist"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    if (errors.role) setErrors(prev => ({ ...prev, role: undefined }));
                  }}
                  style={errors.role ? { borderColor: "#ef4444" } : {}}
                />
                {errors.role && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>{errors.role}</span>}
              </div>

              <div className="doc-field">
                <label>Profile Picture (Optional)</label>
                <label className="doc-file-label">
                  📎 {image ? image.name : "Click to upload avatar"}
                  <input
                    type="file"
                    className="doc-file-input"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImage(file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
                {preview && <img src={preview} alt="preview" className="doc-preview" />}
              </div>
            </div>

            <div className="doc-actions" style={{ justifyContent: "flex-end", marginTop: "24px" }}>
              <button className="doc-btn doc-btn-secondary" onClick={() => { resetForm(); setShowFormModal(false); }}>
                Cancel
              </button>
              <button className="doc-btn doc-btn-primary" onClick={handleSubmit}>
                {editingId ? "Save Changes" : "Create Profile"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Card */}
      <div className="doc-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
          <h4 style={{ margin: 0 }}>📋 Medical Staff Directory</h4>
          <input
            type="text"
            className="doc-input"
            placeholder="🔍 Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "300px", padding: "8px 12px", fontSize: "0.85rem", margin: 0 }}
          />
        </div>

        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="doc-empty">
                      <div>👨‍⚕️</div>
                      <p>No doctors registered yet. Add staff above.</p>
                    </div>
                  </td>
                </tr>
              ) : filteredDoctors.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="doc-empty">
                      <div>🔍</div>
                      <p>No staff matches your search term "{searchTerm}".</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((doctor) => (
                  <tr key={doctor.id}>
                    <td data-label="#">
                      <span style={{ fontWeight: 600, color: "#94a3b8" }}>#{doctor.id}</span>
                    </td>
                    <td data-label="Avatar">
                      <div className="doc-avatar">
                        {doctor.image ? (
                          <img
                            src={doctor.image.startsWith("http") || doctor.image.startsWith("data:") ? doctor.image : `http://127.0.0.1:8000${doctor.image.startsWith("/") ? "" : "/"}${doctor.image}`}
                            alt={doctor.name}
                            className="doc-avatar-img"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                              if (e.target && (e.target as HTMLElement).parentElement) {
                                (e.target as HTMLElement).parentElement!.innerText = doctor.name ? doctor.name.replace(/^(Dr\.\s*)/i, "").slice(0, 2).toUpperCase() : "DR";
                              }
                            }}
                          />
                        ) : (
                          doctor.name ? doctor.name.replace(/^(Dr\.\s*)/i, "").slice(0, 2).toUpperCase() : "DR"
                        )}
                      </div>
                    </td>
                    <td data-label="Doctor Name" style={{ fontWeight: 600 }}>{doctor.name}</td>
                    <td data-label="Specialization">{doctor.role}</td>
                    <td data-label="Actions">
                      <div className="doc-row-actions">
                        <button className="doc-btn doc-btn-warning" onClick={() => handleEdit(doctor)}>
                          ✏️ Edit
                        </button>
                        <button
                          className="doc-btn doc-btn-danger"
                          onClick={() => { setDeleteId(doctor.id); setShowDeleteModal(true); }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {filteredDoctors.length > 0 && totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", flexWrap: "wrap", gap: "12px" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredDoctors.length)} of {filteredDoctors.length} entries
            </span>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                className="doc-btn doc-btn-secondary"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{ padding: "6px 12px", fontSize: "0.8rem", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
              >
                ◀ Previous
              </button>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155" }}>
                {currentPage} / {totalPages}
              </span>
              <button
                className="doc-btn doc-btn-secondary"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{ padding: "6px 12px", fontSize: "0.8rem", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
              >
                Next ▶
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="doc-modal-backdrop">
          <div className="doc-modal">
            <div className="doc-modal-icon">🗑️</div>
            <h4>Delete Doctor Profile</h4>
            <p>Are you sure you want to remove this doctor from the registry?</p>
            <div className="doc-modal-actions">
              <button className="doc-btn doc-btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="doc-btn doc-btn-danger" onClick={confirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="doc-modal-backdrop">
          <div className="doc-modal">
            <div className="doc-modal-icon">💾</div>
            <h4>Update Profile Changes</h4>
            <p>Do you want to save the modifications made to this doctor's profile?</p>
            <div className="doc-modal-actions">
              <button className="doc-btn doc-btn-secondary" onClick={() => setShowUpdateModal(false)}>Cancel</button>
              <button className="doc-btn doc-btn-success" onClick={confirmUpdate}>Yes, Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAdmin;