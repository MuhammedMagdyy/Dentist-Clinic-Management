const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('appointment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Appointment;
