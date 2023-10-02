/* Required Models */
const Clinic = require('../models/clinic');
const Dentist = require('../models/dentist');
const Outpatient = require('../models/outpatient');
const Patient = require('../models/patient');
const Role = require('../models/role');
const Specialized = require('../models/specialized');
const User = require('../models/user');
const Appointment = require('../models/appointments');

exports.relations = () => {
  User.hasMany(Patient, {
    foreignKey: 'createdBy',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Patient.belongsTo(User, {
    foreignKey: 'createdBy',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Role.hasOne(User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  User.belongsTo(Role, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Patient.hasOne(Outpatient, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Outpatient.belongsTo(Patient, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(Outpatient, {
    foreignKey: 'createdBy',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Outpatient.belongsTo(User, {
    foreignKey: 'createdBy',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Dentist.hasMany(Outpatient, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Outpatient.belongsTo(Dentist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Clinic.hasMany(Outpatient, {
    foreignKey: 'transferedId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Outpatient.belongsTo(Clinic, {
    foreignKey: 'transferedId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Dentist.hasMany(Specialized, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Specialized.belongsTo(Dentist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Patient.hasMany(Specialized, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Specialized.belongsTo(Patient, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Clinic.hasMany(Specialized, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Specialized.belongsTo(Clinic, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(Specialized, {
    foreignKey: 'createdBy',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Specialized.belongsTo(User, {
    foreignKey: 'createdBy',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Clinic.hasMany(Appointment, {
    foreignKey: { name: 'clinicId' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Appointment.belongsTo(Clinic, {
    foreignKey: { name: 'clinicId' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Patient.hasMany(Appointment, {
    foreignKey: { name: 'patientId' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Appointment.belongsTo(Patient, {
    foreignKey: { name: 'patientId' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Appointment.hasOne(Appointment, {
    foreignKey: { name: 'transferedTo', allowNull: true },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};
