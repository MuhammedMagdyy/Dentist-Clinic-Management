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
  phone: Sequelize.STRING,
  national_id: Sequelize.STRING,
  works_in: Sequelize.STRING,
});

module.exports = Dentist;
