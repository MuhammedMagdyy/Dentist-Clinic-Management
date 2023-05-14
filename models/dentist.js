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
    validate: {
      notEmpty: true,
      isAlpha: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
    unique: true,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    },
    unique: true,
  },
  national_id: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
      len: [14],
      checkNationalId(value) {
        if (value.length !== 14) {
          throw new Error('National ID must be 14 digits');
        }
      },
      unique: true,
    },
  },
  works_in: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Dentist;
