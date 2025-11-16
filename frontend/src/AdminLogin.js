import React, { useState } from "react";
import "./admin.css";
import axios from "axios";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const res = await axios.post(
        "https://rajucollegemanagementnew-1.onrender.com/api/login",
        {
          username,
          password,
        }
      );

      if (res.data.success) {
        // ⭐ Save token to localStorage
        localStorage.setItem("token", res.data.token);

        alert("Login successful!");

        // ⭐ Redirect to your main App page
        window.location.href = "/";
        return;
      }

      // If res.data.success is false:
      setError("Invalid username or password");

    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="logo-circle">R</div>

        <h2 className="login-title">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-box"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-box"
        />

        {error && <p className="error-text">{error}</p>}

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

      </div>
    </div>
  );
}
