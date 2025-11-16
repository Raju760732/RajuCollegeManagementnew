import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://rajucollegemanagementnew-1.onrender.com";

export default function Dashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API}/api/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setStudents(res.data))
      .catch(() => setStudents([]));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <button onClick={logout}>Logout</button>

      <h2>Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id || s._id || s.roll_no}>
            {s.name} — {s.roll_no}
          </li>
        ))}
      </ul>
    </div>
  );
}
