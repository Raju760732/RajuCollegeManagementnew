import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "https://rajucollegemanagementnew-1.onrender.com";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [students, setStudents] = useState([]);

  // ---------- LOGIN FUNCTION ----------
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/api/login`, {
        username,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
      }
    } catch (err) {
      alert("Invalid login");
    }
  };

  // ---------- FETCH STUDENTS ----------
  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API}/api/students`)
      .then((res) => setStudents(res.data))
      .catch(() => setStudents([]));
  }, [token]);

  // ---------- LOGOUT ----------
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // ---------------- UI ----------------
  if (!token) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  // ---------- STUDENT PAGE ----------
  return (
    <div style={{ padding: 20 }}>
      <h1>College Management System</h1>
      <h2>Students</h2>

      <button onClick={logout}>Logout</button>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((s) => (
            <li key={s.id}>
              {s.name} — {s.roll_no}
            </li>
          ))}
        </ul>
      )}

      <p>
        API endpoint:{" "}
        <code>{API}/api/students</code>
      </p>
    </div>
  );
}
