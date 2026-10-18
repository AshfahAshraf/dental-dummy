import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_username", data.username);
        localStorage.setItem("is_staff", data.is_staff ? "true" : "false");
        
        if (data.is_staff) {
          router.push("/admin-panel/dashboard");
        } else {
          router.push("/admin-panel/appointments");
        }
      } else {
        setError(data.error || "Invalid username or password.");
      }
    } catch (err) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 10% 20%, rgba(240, 244, 248, 1) 0%, rgba(216, 226, 236, 1) 90.1%);
          font-family: 'Inter', sans-serif;
          padding: 20px;
        }
        .login-card {
          background: #ffffff;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
          max-width: 400px;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
        .login-logo {
          text-align: center;
          margin-bottom: 28px;
        }
        .login-logo h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .login-logo p {
          font-size: 0.82rem;
          color: #64748b;
          margin-top: 4px;
        }
        .login-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
        }
        .login-field label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .login-input {
          border: 1.5px solid #cbd5e1;
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 0.9rem;
          color: #1e293b;
          outline: none;
          background: #f8fafc;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .login-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
          background: #ffffff;
        }
        .login-btn {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          margin-top: 10px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }
        .login-btn:hover {
          opacity: 0.92;
          transform: translateY(-1px);
        }
        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .login-error {
          background: #fff1f2;
          border: 1px solid #fecdd3;
          color: #be123c;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 0.82rem;
          margin-bottom: 20px;
          font-weight: 500;
        }
      `}</style>

      <div className="login-card">
        <div className="login-logo">
          <h2>🦷 DentalCare</h2>
          <p>Sign in to access the administrative dashboard</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="login-field">
            <label>Username</label>
            <input
              type="text"
              required
              className="login-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              required
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
