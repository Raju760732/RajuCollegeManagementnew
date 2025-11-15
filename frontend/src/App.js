import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://rajucollegemanagementnew-1.onrender.com";

export default function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/students`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setStudents(res.data);
        } else {
          console.error("API did not return an array:", res.data);
          setStudents([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>College Management System</h1>
      <h2>Students</h2>

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
        API endpoint: <code>{API}/api/students</code>
      </p>
    </div>
  );
}
