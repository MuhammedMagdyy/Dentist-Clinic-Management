const Sequelize = require('sequelize');
const sequelize = require('../util/database');

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
    validate: {
      isIn: [[0, 1, 2]],
      notEmpty: true,
    },
  },
});

module.exports = Appointment;
