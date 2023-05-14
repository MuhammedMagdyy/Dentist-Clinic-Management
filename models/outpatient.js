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
    validate: {
      notEmpty: true,
    },
  },
  medical_history: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  diagnosis: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  extra_oral: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  intra_oral: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
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
