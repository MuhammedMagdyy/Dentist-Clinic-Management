const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Outpatient = sequelize.define('outpatient', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  chief_complaint: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  medical_history: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  diagnosis: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  extra_oral: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  intra_oral: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  upper_right: {
    type: Sequelize.STRING,
  },
  upper_left: {
    type: Sequelize.STRING,
  },
  down_right: {
    type: Sequelize.STRING,
  },
  down_left: {
    type: Sequelize.STRING,
  },
});

module.exports = Outpatient;
