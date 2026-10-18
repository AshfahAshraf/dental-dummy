'use client';

import { useEffect, useState, useRef } from "react";

const adminStyles = `
  .sa-page { font-family: 'Inter', sans-serif; }
  .sa-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 28px; flex-wrap: wrap; gap: 12px;
  }
  .sa-header h2 {
    font-size: 1.6rem; font-weight: 700; color: #0f172a; margin: 0;
  }
  .sa-badge {
    background: #eff6ff; color: #2563eb; border-radius: 20px;
    padding: 4px 14px; font-size: 0.8rem; font-weight: 600;
  }
  /* Card */
  .sa-card {
    background: #fff; border-radius: 16px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.07);
    padding: 28px; margin-bottom: 28px;
  }
  .sa-card h4 {
    font-size: 1.05rem; font-weight: 700; color: #1e293b;
    margin-bottom: 20px; padding-bottom: 12px;
    border-bottom: 2px solid #f1f5f9;
  }
  /* Form */
  .sa-form-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    margin-bottom: 16px;
  }
  @media (max-width: 600px) { .sa-form-grid { grid-template-columns: 1fr; } }
  .sa-field { display: flex; flex-direction: column; gap: 6px; }
  .sa-field label { font-size: 0.8rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
  .sa-input {
    border: 1.5px solid #e2e8f0; border-radius: 10px;
    padding: 10px 14px; font-size: 0.9rem; color: #1e293b;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    background: #f8fafc; width: 100%; box-sizing: border-box;
  }
  .sa-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.12); background: #fff; }
  .sa-textarea { resize: vertical; min-height: 200px; }
  .sa-file-label {
    display: flex; align-items: center; gap: 10px;
    border: 2px dashed #cbd5e1; border-radius: 10px;
    padding: 14px 16px; cursor: pointer; color: #64748b;
    font-size: 0.88rem; transition: border-color 0.2s, background 0.2s;
  }
  .sa-file-label:hover { border-color: #3b82f6; background: #eff6ff; color: #2563eb; }
  .sa-file-input { display: none; }
  .sa-preview {
    width: 90px; height: 90px; object-fit: cover;
    border-radius: 10px; border: 2px solid #e2e8f0;
    margin-top: 8px;
  }
  .sa-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
  /* Buttons */
  .sa-btn {
    padding: 8px 16px; border-radius: 10px; border: none;
    font-size: 0.88rem; font-weight: 600; cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    display: inline-flex; align-items: center; justify-content: center;
    gap: 6px; white-space: nowrap;
  }
  .sa-btn:hover { opacity: 0.88; transform: translateY(-1px); }
  .sa-btn-primary { background: linear-gradient(135deg,#3b82f6,#2563eb); color: #fff; }
  .sa-btn-secondary { background: #f1f5f9; color: #475569; }
  .sa-btn-danger { background: linear-gradient(135deg,#ef4444,#dc2626); color: #fff; }
  .sa-btn-warning { background: linear-gradient(135deg,#f59e0b,#d97706); color: #fff; }
  .sa-btn-success { background: linear-gradient(135deg,#22c55e,#16a34a); color: #fff; }
  /* Alert */
  .sa-alert {
    background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d;
    border-radius: 10px; padding: 12px 18px; margin-bottom: 20px;
    font-size: 0.9rem; font-weight: 500;
  }
  /* Table wrapper */
  .sa-table-wrap { overflow-x: auto; }
  .sa-table {
    width: 100%; border-collapse: collapse; font-size: 0.88rem;
  }
  .sa-table th {
    background: #f8fafc; color: #64748b; font-size: 0.75rem;
    text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;
    padding: 12px 16px; text-align: left;
    border-bottom: 2px solid #f1f5f9;
  }
  .sa-table td {
    padding: 14px 16px; border-bottom: 1px solid #f1f5f9;
    color: #334155; vertical-align: middle;
  }
  .sa-table tr:last-child td { border-bottom: none; }
  .sa-table tr:hover td { background: #fafafa; }
  .sa-table-img {
    width: 72px; height: 72px; object-fit: cover;
    border-radius: 8px; border: 2px solid #e2e8f0;
  }
  .sa-table-no-img {
    width: 72px; height: 72px; background: #f1f5f9;
    border-radius: 8px; display: flex; align-items: center;
    justify-content: center; color: #94a3b8; font-size: 1.5rem;
  }
  .sa-desc-cell { max-width: 480px; white-space: normal; word-break: break-word; line-height: 1.5; display: block; }
  .sa-readmore-btn {
    background: none; border: none; color: #2563eb; font-weight: 600;
    cursor: pointer; font-size: 0.8rem; margin-left: 6px; padding: 0;
    text-decoration: underline; display: inline-block;
  }
  .sa-readmore-btn:hover { color: #1d4ed8; }
  .sa-row-actions { display: flex; gap: 8px; flex-wrap: nowrap; min-width: 130px; align-items: center; }
  /* Modal */
  .sa-modal-backdrop {
    position: fixed; inset: 0; background: rgba(15,23,42,0.55);
    display: flex; align-items: center; justify-content: center;
    z-index: 2000; padding: 16px;
  }
  .sa-modal {
    background: #fff; border-radius: 20px; padding: 32px;
    max-width: 420px; width: 100%;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    animation: modalIn 0.25s ease;
  }
  @keyframes modalIn { from { opacity:0; transform:scale(0.93); } to { opacity:1; transform:scale(1); } }
  .sa-modal-icon { font-size: 2.5rem; margin-bottom: 12px; }
  .sa-modal h4 { font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
  .sa-modal p { color: #64748b; font-size: 0.9rem; margin-bottom: 24px; }
  .sa-modal-actions { display: flex; gap: 10px; justify-content: flex-end; }
  /* Empty state */
  .sa-empty {
    text-align: center; padding: 48px 24px; color: #94a3b8;
  }
  .sa-empty div { font-size: 3rem; margin-bottom: 8px; }
  .sa-empty p { font-size: 0.9rem; }
  .sa-table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid #e2e8f0; }
  .sa-table {
    width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;
  }
  .sa-table th {
    background: #f8fafc; color: #64748b; font-size: 0.75rem;
    text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;
    padding: 14px 18px; border-bottom: 2px solid #e2e8f0; white-space: nowrap;
  }
  .sa-table td {
    padding: 16px 18px; border-bottom: 1px solid #f1f5f9;
    color: #334155; vertical-align: middle; white-space: nowrap;
  }
  .sa-table tr:last-child td { border-bottom: none; }
  .sa-table tr:hover td { background: #f8fafc; }

  @media (max-width: 768px) {
    .sa-table-wrap { border: none; overflow-x: visible; }
    .sa-table thead { display: none; }
    .sa-table, .sa-table tbody { display: block; width: 100%; }
    .sa-table tr {
      display: block; background: #ffffff;
      border: 1.5px solid #e2e8f0; border-radius: 16px;
      padding: 14px 18px; margin-bottom: 14px;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
    }
    .sa-table td {
      display: flex; justify-content: space-between;
      align-items: center; padding: 10px 0;
      border-bottom: 1px dashed #f1f5f9; white-space: normal; text-align: right;
    }
    .sa-table td:last-child { border-bottom: none; }
    .sa-table td::before {
      content: attr(data-label); font-weight: 700;
      color: #64748b; font-size: 0.75rem; text-transform: uppercase;
      letter-spacing: 0.5px; margin-right: 12px; flex-shrink: 0; text-align: left;
    }
  }
`;

const ServiceAdmin = () => {
  const [services, setServices] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ title?: string; description?: string; image?: string }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedDesc, setExpandedDesc] = useState<Record<number, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toggleDesc = (id: number) => {
    setExpandedDesc(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const API = "http://127.0.0.1:8000/admin-panel/services/";

  const getHeaders = (): Record<string, string> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    return token ? { "Authorization": `Token ${token}` } : {};
  };

  const fetchServices = async () => {
    try {
      const res = await fetch(API, { headers: getHeaders() });
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchServices(); }, []);

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
    setTitle(""); setDescription(""); setImage(null);
    setPreview(""); setEditingId(null);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    if (image) fd.append("image", image);
    return fd;
  };

  const addService = async () => {
    const res = await fetch(API, {
      method: "POST",
      headers: getHeaders(),
      body: buildFormData()
    });
    if (res.ok) {
      setMessage("✅ Service added successfully");
      resetForm();
      setShowFormModal(false);
      fetchServices();
    } else {
      const err = await res.json().catch(() => ({}));
      setMessage(`❌ Failed to add service: ${JSON.stringify(err)}`);
    }
  };

  const updateService = async () => {
    const res = await fetch(`${API}${editingId}/`, {
      method: "PUT",
      headers: getHeaders(),
      body: buildFormData()
    });
    if (res.ok) {
      setMessage("✅ Service updated successfully");
      setShowUpdateModal(false);
      resetForm();
      setShowFormModal(false);
      fetchServices();
    } else {
      const err = await res.json().catch(() => ({}));
      setMessage(`❌ Failed to update service: ${JSON.stringify(err)}`);
    }
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (!editingId && !image) {
      newErrors.image = "Image is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    editingId ? setShowUpdateModal(true) : addService();
  };

  const handleEdit = (item: any) => {
    setTitle(item.title); setDescription(item.description); setEditingId(item.id);
    if (item.image) setPreview(`http://127.0.0.1:8000${item.image}`);
    setShowFormModal(true);
  };

  const confirmDelete = async () => {
    const res = await fetch(`${API}${deleteId}/`, {
      method: "DELETE",
      headers: getHeaders()
    });
    if (res.ok) { setMessage("🗑️ Service deleted"); setShowDeleteModal(false); fetchServices(); }
  };

  const filteredServices = services.filter((item: any) =>
    (item.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="sa-page">
      <style>{adminStyles}</style>

      {/* Header */}
      <div className="sa-header">
        <h2>🦷 Manage Services</h2>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span className="sa-badge">{services.length} services</span>
          <button className="sa-btn sa-btn-primary" onClick={() => { resetForm(); setShowFormModal(true); }}>
            ➕ Add Service
          </button>
        </div>
      </div>

      {/* Alert */}
      {message && (
        <div className="sa-alert" onClick={() => setMessage("")}>{message}</div>
      )}

      {/* Form Modal */}
      {showFormModal && (
        <div className="sa-modal-backdrop">
          <div className="sa-modal" style={{ width: "700px", maxWidth: "95%" }}>
            <h4 style={{ marginBottom: "20px", fontWeight: "700" }}>{editingId ? "✏️ Edit Service" : "➕ Add New Service"}</h4>

            <div className="sa-form-grid" style={{ gridTemplateColumns: "1fr" }}>
              <div className="sa-field">
                <label>Title</label>
                <input
                  className="sa-input"
                  placeholder="e.g. Teeth Whitening"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors(prev => ({ ...prev, title: undefined }));
                  }}
                  style={errors.title ? { borderColor: "#ef4444" } : {}}
                />
                {errors.title && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>{errors.title}</span>}
              </div>

              <div className="sa-field">
                <label>Description</label>
                <textarea
                  className="sa-input sa-textarea"
                  placeholder="Describe the service..."
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors(prev => ({ ...prev, description: undefined }));
                  }}
                  style={errors.description ? { borderColor: "#ef4444" } : {}}
                />
                {errors.description && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>{errors.description}</span>}
              </div>

              <div className="sa-field">
                <label>Image</label>
                <label className="sa-file-label" style={errors.image ? { borderColor: "#ef4444" } : {}}>
                  📎 {image ? image.name : "Click to upload image"}
                  <input
                    type="file"
                    className="sa-file-input"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImage(file);
                        setPreview(URL.createObjectURL(file));
                        if (errors.image) setErrors(prev => ({ ...prev, image: undefined }));
                      }
                    }}
                  />
                </label>
                {errors.image && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>{errors.image}</span>}
                {preview && <img src={preview} alt="preview" className="sa-preview" />}
              </div>
            </div>

            <div className="sa-actions" style={{ justifyContent: "flex-end", marginTop: "24px" }}>
              <button className="sa-btn sa-btn-secondary" onClick={() => { resetForm(); setShowFormModal(false); }}>
                Cancel
              </button>
              <button className="sa-btn sa-btn-primary" onClick={handleSubmit}>
                {editingId ? "Save Changes" : "Create Service"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Card */}
      <div className="sa-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
          <h4 style={{ margin: 0 }}>📋 All Services</h4>
          <input
            type="text"
            className="sa-input"
            placeholder="🔍 Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "300px", padding: "8px 12px", fontSize: "0.85rem", margin: 0 }}
          />
        </div>

        <div className="sa-table-wrap">
          <table className="sa-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="sa-empty">
                      <div>🦷</div>
                      <p>No services yet. Add your first service above.</p>
                    </div>
                  </td>
                </tr>
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="sa-empty">
                      <div>🔍</div>
                      <p>No services match your search term "{searchTerm}".</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id}>
                    <td data-label="#">
                      <span style={{ fontWeight: 600, color: "#94a3b8" }}>#{item.id}</span>
                    </td>
                    <td data-label="Image">
                      {item.image ? (
                        <img
                          src={
                            item.image.startsWith("data:") || item.image.startsWith("http")
                              ? item.image
                              : `http://127.0.0.1:8000/${item.image}`
                          }
                          alt={item.title}
                          className="sa-table-img"
                        />
                      ) : (
                        <span style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>—</span>
                      )}
                    </td>
                    <td data-label="Title" style={{ fontWeight: 600 }}>{item.title}</td>
                    <td data-label="Description">
                      <span className="sa-desc-cell">
                        {item.description.length > 120 ? (
                          <>
                            {expandedDesc[item.id] ? item.description : `${item.description.slice(0, 120)}...`}
                            <button onClick={() => toggleDesc(item.id)} className="sa-readmore-btn">
                              {expandedDesc[item.id] ? "Read Less" : "Read More"}
                            </button>
                          </>
                        ) : (
                          item.description
                        )}
                      </span>
                    </td>
                    <td data-label="Actions">
                      <div className="sa-row-actions">
                        <button className="sa-btn sa-btn-warning" onClick={() => handleEdit(item)}>
                          ✏️ Edit
                        </button>
                        <button
                          className="sa-btn sa-btn-danger"
                          onClick={() => { setDeleteId(item.id); setShowDeleteModal(true); }}
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
        {filteredServices.length > 0 && totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", flexWrap: "wrap", gap: "12px" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredServices.length)} of {filteredServices.length} entries
            </span>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                className="sa-btn sa-btn-secondary"
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
                className="sa-btn sa-btn-secondary"
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
        <div className="sa-modal-backdrop">
          <div className="sa-modal">
            <div className="sa-modal-icon">🗑️</div>
            <h4>Delete Service</h4>
            <p>Are you sure you want to delete this service? This action cannot be undone.</p>
            <div className="sa-modal-actions">
              <button className="sa-btn sa-btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="sa-btn sa-btn-danger" onClick={confirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="sa-modal-backdrop">
          <div className="sa-modal">
            <div className="sa-modal-icon">💾</div>
            <h4>Update Service</h4>
            <p>Are you sure you want to save these changes to the service?</p>
            <div className="sa-modal-actions">
              <button className="sa-btn sa-btn-secondary" onClick={() => setShowUpdateModal(false)}>Cancel</button>
              <button className="sa-btn sa-btn-success" onClick={updateService}>Yes, Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceAdmin;