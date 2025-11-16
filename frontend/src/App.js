// src/App.js
import React from "react";
import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";

export default function App() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <AdminLogin />;
  }

  return <Dashboard />;
}
