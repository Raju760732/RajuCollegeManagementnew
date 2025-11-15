// backend/config_db.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!connectionString) {
  console.error("No DATABASE_URL / POSTGRES_URL found in environment.");
  // Export a throwing proxy so require still works but informs the user.
  throw new Error("DATABASE_URL / POSTGRES_URL is not set");
}

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
