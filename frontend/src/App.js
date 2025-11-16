import React from "react";
import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";

export default function App() {
  const token = localStorage.getItem("token");

  // If token does not exist → show login page
  if (!token) {
    return <AdminLogin />;
  }

  // If token exists → show dashboard
  return <Dashboard />;
}
