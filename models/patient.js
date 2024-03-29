const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Patient = sequelize.define('patient', {
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
  age: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nationalId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  nationality: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  maritalStatus: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  occupation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Patient;
