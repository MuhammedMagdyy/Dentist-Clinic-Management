const Sequelize = require('sequelize');
const sequelize = require('../util/database');

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
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: Sequelize.STRING,
  national_id: Sequelize.STRING,
});

module.exports = Dentist;
