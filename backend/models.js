// backend/models.js
const { DataTypes } = require('sequelize');
const sequelize = require('./config_db');

const Student = sequelize.define('Student', {
  name: { type: DataTypes.STRING, allowNull: false },
  roll_no: { type: DataTypes.STRING, allowNull: false }
});

module.exports = { sequelize, Student };
