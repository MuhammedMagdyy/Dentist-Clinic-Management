const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Patient = sequelize.define('patient', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  age: Sequelize.INTEGER,
  phone: Sequelize.STRING,
  gender: Sequelize.STRING,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  national_id: Sequelize.STRING,
  nationality: Sequelize.STRING,
  marital_status: Sequelize.STRING,
  occupation: Sequelize.STRING,
});

module.exports = Patient;
