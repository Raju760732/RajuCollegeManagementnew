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
      window.location.href = "/";
      return;
    }

    axios
      .get(`${API}/api/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStudents(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Fetch students error:", err);
        setError("Failed to load students. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/";
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

      <button
        onClick={logout}
        style={{
          padding: "8px 12px",
          background: "#1e88e5",
          border: "none",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
          marginBottom: 20,
        }}
      >
        Logout
      </button>

      <h2>Students</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((s) => (
            <li key={s.id || s.roll_no}>{s.name} — {s.roll_no}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
