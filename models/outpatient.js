const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Outpatient = sequelize.define('outpatient', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  chiefComplaint: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  medicalHistory: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  diagnosis: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  extraOral: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  intraOral: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  upperRight: {
    type: Sequelize.STRING,
  },
  upperLeft: {
    type: Sequelize.STRING,
  },
  downRight: {
    type: Sequelize.STRING,
  },
  downLeft: {
    type: Sequelize.STRING,
  },
});

module.exports = Outpatient;
