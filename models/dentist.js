const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Dentist = sequelize.define('dentist', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nationalId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  worksIn: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Dentist;
