const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Outpatient = sequelize.define('outpatient', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  chief_complaint: Sequelize.STRING,
  medical_history: Sequelize.STRING,
  diagnosis: Sequelize.STRING,
  extra_oral: Sequelize.STRING,
  intra_oral: Sequelize.STRING,
  upper_right: Sequelize.INTEGER,
  upper_left: Sequelize.INTEGER,
  down_right: Sequelize.INTEGER,
  down_left: Sequelize.INTEGER,
});

module.exports = Outpatient;
