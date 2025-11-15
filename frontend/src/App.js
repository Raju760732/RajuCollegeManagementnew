import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || '';

export default function App(){
  const [students, setStudents] = useState([]);
  useEffect(()=> {
    axios.get(`${API}/api/students`).then(r => setStudents(r.data)).catch(()=>{/*ignore*/});
  },[]);
  return (
    <div style={{padding:20}}>
      <h1>College Management System</h1>
      <h2>Students</h2>
      <ul>
        {students.map(s=> <li key={s.id}>{s.name} — {s.roll_no}</li>)}
      </ul>
      <p>API endpoint: <code>{API}/api/students</code></p>
    </div>
  );
}
