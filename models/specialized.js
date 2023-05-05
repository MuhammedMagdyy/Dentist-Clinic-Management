const Sequelize = require('sequelize');
const sequelize = require('../util/database');

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
  radiographic_exam: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  treatment: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  treatment_plant: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Specialized;
