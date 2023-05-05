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
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  national_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  works_in: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Dentist;
