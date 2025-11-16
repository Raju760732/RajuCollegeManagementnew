// src/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://rajucollegemanagementnew-1.onrender.com";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token, redirect to root where AdminLogin should appear
      window.location.href = "/";
      return;
    }

    setLoading(true);
    setError("");

    axios
      .get(`${API}/api/students`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStudents(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Fetch students error:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setError("Not authorized. Please login again.");
          localStorage.removeItem("token");
          window.location.href = "/";
        } else {
          setError("Failed to fetch students.");
        }
        setStudents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>College Management System — Dashboard</h1>

      <div style={{ marginBottom: 12 }}>
        <button onClick={logout} style={{ padding: "8px 12px", cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <h2>Students</h2>

      {loading ? (
        <p>Loading students...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((s) => (
            <li key={s.id ?? s._id ?? s.roll_no}>
              {s.name} — {s.roll_no}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
