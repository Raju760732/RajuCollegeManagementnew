// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple health
app.get('/', (req, res) => res.send('Backend running'));

// LOGIN ROUTE (Add this part)
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (username === adminUser && password === adminPass) {
    return res.json({ success: true, token: "admin-logged-in" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Try to connect sequelize and set up simple routes:
let Student, sequelize;
try {
  ({ sequelize, Student } = require('./models'));
} catch (err) {
  console.error("Sequelize import failed:", err.message);
}

app.get('/api/students', async (req, res) => {
  if (!Student) return res.status(500).json({ error: 'Database not configured' });
  const list = await Student.findAll();
  res.json(list);
});

app.post('/api/students', async (req, res) => {
  if (!Student) return res.status(500).json({ error: 'Database not configured' });
  const s = await Student.create({ name: req.body.name || 'NoName', roll_no: req.body.roll_no || ''});
  res.status(201).json(s);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, async () => {
  console.log(`Backend running on ${PORT}`);
  if (sequelize) {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('Database connected and synced');
    } catch (err) {
      console.error('DB connect/sync failed:', err.message);
    }
  }
});
