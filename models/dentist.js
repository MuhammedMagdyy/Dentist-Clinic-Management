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
    unique: true,
    validate: { isEmail: true },
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  nationalId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  worksIn: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Dentist;
