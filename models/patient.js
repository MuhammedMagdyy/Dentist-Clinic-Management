const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Patient = sequelize.define('patient', {
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
  age: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    },
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
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
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
    },
    unique: true,
  },
  nationality: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  marital_status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  occupation: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Patient;
