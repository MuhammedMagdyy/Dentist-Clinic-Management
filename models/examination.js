const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Examination = sequelize.define('examination', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  administered_by: Sequelize.STRING,
});

module.exports = Examination;
