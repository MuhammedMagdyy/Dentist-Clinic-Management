const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Specialized = sequelize.define('specialized', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  clinic_name: Sequelize.STRING,
  dentist_name: Sequelize.STRING,
  examination: Sequelize.STRING,
  diagnosis: Sequelize.STRING,
  radiographic_exam: Sequelize.STRING,
  treatment: Sequelize.STRING,
  treatment_plant: Sequelize.STRING,
});

module.exports = Specialized;
