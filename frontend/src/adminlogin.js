import React, { useState } from "react";
import "./admin.css";  // we will create this file next
import axios from "axios";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://rajucollegemanagementnew-1.onrender.com/api/login", {
        username,
        password,
      });

      if (res.data.success) {
        window.location.href = "/students"; // after login go to students list
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-box">
        <div className="logo">R</div>
        <h2>Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
