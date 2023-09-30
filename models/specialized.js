const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Specialized = sequelize.define('specialized', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  examination: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  diagnosis: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  radiographicExam: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  treatment: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  treatmentPlan: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Specialized;
