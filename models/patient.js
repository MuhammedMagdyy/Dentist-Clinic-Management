const Sequelize = require('sequelize');
const sequelize = require('../util/database');

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
  national_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nationality: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  marital_status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  occupation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Patient;
