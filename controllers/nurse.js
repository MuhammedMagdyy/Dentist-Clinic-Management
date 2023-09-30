const { Sequelize, Op } = require('sequelize');
const Patient = require('../models/patient');
const Outpatient = require('../models/outpatient');
const Specialized = require('../models/specialized');
const Dentist = require('../models/dentist');
const User = require('../models/user');
const Role = require('../models/role');
const Clinic = require('../models/clinic');
const Appointment = require('../models/appointments');

// GET Logic
/* Patients */
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'createdBy'] },
      include: [
        {
          model: User,
          attributes: ['name'],
          include: [{ model: Role, attributes: ['name'] }],
        },
      ],
    });
    res
      .status(200)
      .json({ message: 'success', count: patients.length, data: patients });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getPatient = async (req, res) => {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findOne({
      where: { nationalId: patientId },
      attributes: { exclude: ['createdAt', 'updatedAt', 'createdBy'] },
      include: [
        {
          model: User,
          attributes: ['name'],
          include: [{ model: Role, attributes: ['name'] }],
        },
        {
          model: Outpatient,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'createdBy',
              'patientId',
              'dentistId',
              'transferedId',
            ],
          },
          include: [{ model: Dentist, attributes: ['name'] }],
        },
        {
          model: Specialized,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'createdBy',
              'patientId',
              'dentistId',
              'clinicId',
            ],
          },
          include: [
            { model: Dentist, attributes: ['name'] },
            { model: Clinic, attributes: ['name'] },
          ],
        },
      ],
    });
    if (!patient) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({ message: 'success', data: patient });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getPatientId = async (req, res) => {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findOne({
      where: { nationalId: patientId },
      attributes: ['id'],
    });
    if (!patient) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({ message: 'success', data: patient });
  } catch (err) {
    throw new Error(err);
  }
};

/* Outpatients */
exports.getAllOutPatients = async (req, res) => {
  try {
    const outpatients = await Outpatient.findAll({
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'createdBy',
          'patientId',
          'dentistId',
          'transferedId',
        ],
      },
      include: [
        {
          model: User,
          attributes: ['name'],
          include: [{ model: Role, attributes: ['name'] }],
        },
        { model: Dentist, attributes: ['name'] },
      ],
    });
    res.status(200).json({ message: 'success', data: outpatients });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getOutPatient = async (req, res) => {
  const outpatientId = req.params.id;
  try {
    const outpatient = await Outpatient.findByPk(outpatientId, {
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'createdBy',
          'patientId',
          'dentistId',
          'transferedId',
        ],
      },
      include: [
        {
          model: Patient,
          attributes: { exclude: ['createdAt', 'updatedAt', 'createdBy'] },
        },
        { model: Dentist, attributes: ['name'] },
        { model: Clinic, attributes: ['name'] },
        {
          model: User,
          attributes: ['name'],
          include: [{ model: Role, attributes: ['name'] }],
        },
      ],
    });
    if (!outpatient) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({ message: 'success', data: outpatient });
  } catch (err) {
    throw new Error(err);
  }
};

/* Specialized */
exports.getAllSpecialized = async (req, res) => {
  try {
    const specialized = await Specialized.findAll({
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'createdBy',
          'patientId',
          'dentistId',
          'clinicId',
        ],
      },
      include: [
        {
          model: Patient,
          attributes: { exclude: ['createdAt', 'updatedAt', 'createdBy'] },
        },
        { model: Dentist, attributes: ['name'] },
        { model: Clinic, attributes: ['name'] },
        {
          model: User,
          attributes: ['name'],
          include: [{ model: Role, attributes: ['name'] }],
        },
      ],
    });
    res.status(200).json({ message: 'success', data: specialized });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getSpecialized = async (req, res) => {
  const specializedId = req.params.id;
  try {
    const specialized = await Specialized.findByPk(specializedId, {
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'createdBy',
          'patientId',
          'dentistId',
          'clinicId',
        ],
      },
      include: [
        {
          model: Patient,
          attributes: { exclude: ['createdAt', 'updatedAt', 'createdBy'] },
        },
        { model: Dentist, attributes: ['name'] },
        { model: Clinic, attributes: ['name'] },
        {
          model: User,
          attributes: ['name'],
          include: [{ model: Role, attributes: ['name'] }],
        },
      ],
    });
    if (!specialized) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({ message: 'success', data: specialized });
  } catch (err) {
    throw new Error(err);
  }
};

/* All Data */
exports.getAllPatientData = async (req, res) => {
  const patientId = req.params.id;
  try {
    const patientData = await Patient.findOne({
      where: { nationalId: patientId },
      attributes: { exclude: ['createdAt', 'updatedAt', 'createdBy'] },
      include: [
        {
          model: User,
          attributes: ['name'],
          include: [{ model: Role, attributes: ['name'] }],
        },
        {
          model: Outpatient,
          attributes: {
            exclude: [
              'updatedAt',
              'createdBy',
              'patientId',
              'dentistId',
              'transferedId',
            ],
          },
          include: [{ model: Dentist, attributes: ['name'] }],
        },
        {
          model: Specialized,
          attributes: {
            exclude: [
              'updatedAt',
              'createdBy',
              'patientId',
              'dentistId',
              'clinicId',
            ],
          },
          include: [
            { model: Dentist, attributes: ['name'] },
            { model: Clinic, attributes: ['name'] },
          ],
        },
      ],
    });
    res
      .status(200)
      .json({ message: 'success', data: { patient: patientData } });
  } catch (err) {
    throw new Error(err);
  }
};

/* Appointment */
exports.getAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findOne({
      where: { nationalId: id },
      attributes: ['id', 'name'],
      include: [
        {
          model: Appointment,
          attributes: ['id', 'status', 'createdAt'],
          include: [{ model: Clinic, attributes: ['name'] }],
        },
      ],
    });
    if (!Patient) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({ message: 'success', data: patient });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getAppointmentClinic = async (req, res) => {
  const { id } = req.params;
  const TODAY_START = new Date().setHours(0, 0, 0, 0);
  const NOW = new Date();
  try {
    const appointment = await Appointment.findAll({
      where: {
        [Op.and]: [
          { clinicId: id },
          { createdAt: { [Op.gt]: TODAY_START, [Op.lt]: NOW } },
        ],
      },
      attributes: ['id', 'status', 'createdAt'],
      include: [{ model: Patient, attributes: ['id', 'name'] }],
    });
    if (!appointment) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({ message: 'success', data: appointment });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getSummary = async (req, res) => {
  try {
    const clinicCounts = await Appointment.findAll({
      attributes: [
        'clinicId',
        [Sequelize.fn('COUNT', Sequelize.col('patientId')), 'count'],
        [Sequelize.col('clinic.name'), 'clinicName'],
      ],
      include: [{ model: Clinic, attributes: [] }],
      group: ['clinicId', 'clinic.name'],
      raw: true,
    });
    res
      .status(200)
      .json({ message: 'success', data: { overall: clinicCounts } });
  } catch (error) {
    throw new Error(error);
  }
};

// POST Logic
/* Patients */
exports.addPatient = async (req, res) => {
  const {
    name,
    age,
    phone,
    gender,
    address,
    city,
    nationalId,
    nationality,
    maritalStatus,
    occupation,
  } = req.body;
  try {
    const patient = await Patient.create({
      name,
      age,
      phone,
      gender,
      address,
      city,
      nationalId,
      nationality,
      maritalStatus,
      occupation,
      createdBy: req.userId,
    });
    res.status(201).json({ message: 'success', data: patient });
  } catch (err) {
    throw new Error(err);
  }
};

/* Outpatients */
exports.addOutPatient = async (req, res) => {
  const {
    chiefComplaint,
    medicalHistory,
    diagnosis,
    extraOral,
    intraOral,
    upperRight,
    upperLeft,
    downRight,
    downLeft,
    patientId,
    dentistId,
    transferedId,
  } = req.body;
  try {
    const outpatient = await Outpatient.create({
      chiefComplaint,
      medicalHistory,
      diagnosis,
      extraOral,
      intraOral,
      upperRight,
      upperLeft,
      downRight,
      downLeft,
      patientId,
      dentistId,
      transferedId,
      createdBy: req.userId,
    });
    await Appointment.create({ patientId: patientId, clinicId: transferedId });
    res.status(201).json({ message: 'success', data: outpatient });
  } catch (err) {
    throw new Error(err);
  }
};

/* Specialized */
exports.addSpecialized = async (req, res) => {
  const {
    examination,
    diagnosis,
    treatment,
    patientId,
    dentistId,
    clinicId,
    treatmentPlan,
    radiographicExam,
  } = req.body;
  try {
    const specialized = await Specialized.create({
      examination,
      diagnosis,
      treatment,
      patientId,
      dentistId,
      clinicId,
      treatmentPlan,
      radiographicExam,
      createdBy: req.userId,
    });
    const appointment = await Appointment.findOne({
      where: {
        [Op.and]: [
          { patientId: patientId },
          { clinicId: clinicId },
          { status: 0 },
        ],
      },
    });
    if (!appointment) {
      return res.status(404).json({ message: 'Not found' });
    }
    if (req.body.isTransfered === false) {
      appointment.status = 1;
    } else {
      await Appointment.create({
        patientId: appointment.patientId,
        clinicId: req.body.transferedTo,
      });
      appointment.status = 2;
    }
    await appointment.save();
    res.status(201).json({ message: 'success', data: specialized });
  } catch (err) {
    throw new Error(err);
  }
};

/* Appointment */
exports.addAppointment = async (req, res) => {
  // add validation to check the patient is in outpatients or not
  const nationalId = req.body.patientId;
  const { clinicId } = req.body;

  try {
    const patient = await Patient.findOne({
      where: { nationalId: nationalId },
    });
    const isHere = await Appointment.findOne({
      where: { patientId: patient.id },
    });
    if (isHere !== null) {
      const appointment = await Appointment.create({
        patientId: patient.id,
        clinicId: clinicId,
      });
      return res.status(201).json({ message: 'success', data: appointment });
    }
    return res
      .status(404)
      .json({ message: 'Patient must be in outpatients first' });
  } catch (err) {
    throw new Error(err);
  }
};

// PUT Logic
/* Patients */
exports.editPatient = async (req, res) => {
  const patientId = req.params.id;
  const {
    name,
    age,
    phone,
    gender,
    address,
    city,
    nationalId,
    nationality,
    maritalStatus,
    occupation,
  } = req.body;
  const createdBy = req.userId;
  try {
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    patient.name = name;
    patient.age = age;
    patient.phone = phone;
    patient.gender = gender;
    patient.address = address;
    patient.city = city;
    patient.nationalId = nationalId;
    patient.nationality = nationality;
    patient.maritalStatus = maritalStatus;
    patient.occupation = occupation;
    patient.createdBy = createdBy;
    await patient.save();
    res.status(200).json({ message: 'Updated successfully' });
  } catch (err) {
    throw new Error(err);
  }
};

/* Outpatients */
exports.editOutPatient = async (req, res) => {
  const outpatientId = req.params.id;
  const createdBy = req.userId;
  const {
    chiefComplaint,
    medicalHistory,
    diagnosis,
    extraOral,
    intraOral,
    upperRight,
    upperLeft,
    downRight,
    downLeft,
    patientId,
    dentistId,
    transferedId,
  } = req.body;
  try {
    const outpatient = await Outpatient.findByPk(outpatientId);
    if (!outpatient) {
      return res.status(404).json({ message: 'Outpatient clinic not found' });
    }
    outpatient.chiefComplaint = chiefComplaint;
    outpatient.medicalHistory = medicalHistory;
    outpatient.diagnosis = diagnosis;
    outpatient.extraOral = extraOral;
    outpatient.intraOral = intraOral;
    outpatient.upperRight = upperRight;
    outpatient.upperLeft = upperLeft;
    outpatient.downRight = downRight;
    outpatient.downLeft = downLeft;
    outpatient.createdBy = createdBy;
    outpatient.patientId = patientId;
    outpatient.dentistId = dentistId;
    outpatient.transferedId = transferedId;
    await outpatient.save();
    res.status(200).json({ message: 'Updated successfully' });
  } catch (err) {
    throw new Error(err);
  }
};

/* Specialized */
exports.editSpecialized = async (req, res) => {
  const specializedId = req.params.id;
  const createdBy = req.userId;
  const {
    examination,
    diagnosis,
    treatment,
    patientId,
    dentistId,
    clinicId,
    treatmentPlan,
    radiographicExam,
  } = req.body;
  try {
    const specialized = await Specialized.findByPk(specializedId);
    if (!specialized) {
      return res.status(404).json({ message: 'Specialized clinic not found' });
    }
    specialized.examination = examination;
    specialized.diagnosis = diagnosis;
    specialized.treatment = treatment;
    specialized.createdBy = createdBy;
    specialized.patientId = patientId;
    specialized.dentistId = dentistId;
    specialized.clinicId = clinicId;
    specialized.treatmentPlan = treatmentPlan;
    specialized.radiographicExam = radiographicExam;
    await specialized.save();
    res.status(200).json({ message: 'Updated successfully' });
  } catch (err) {
    throw new Error(err);
  }
};

exports.editAppointment = async (req, res) => {
  /*
    Status: [0: pending, 1: done, 2: transfered]
  */
  const { id } = req.params;
  const { transferedTo } = req.body;

  try {
    const oldAppointment = await Appointment.findByPk(id);
    if (!oldAppointment) {
      return res.status(404).json({ message: 'Patient has no appointments' });
    }
    const newAppointment = await Appointment.create({
      patientId: oldAppointment.patientId,
      clinicId: transferedTo,
    });
    oldAppointment.transferedTo = newAppointment.id;
    oldAppointment.status = 2;
    await oldAppointment.save();
    await newAppointment.save();

    res.status(200).json({ message: 'Updated successfully' });
  } catch (err) {
    throw new Error(err);
  }
};

exports.editStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    appointment.status = 1;
    await appointment.save();
    res.status(200).json({ message: 'Updated successfully' });
  } catch (err) {
    throw new Error(err);
  }
};

// DELETE Logic
/* Patients */
exports.deletePatient = async (req, res) => {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    await patient.destroy();
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    throw new Error(err);
  }
};

/* Outpatients */
exports.deleteOutPatient = async (req, res) => {
  const outpatientId = req.params.id;
  try {
    const outpatient = await Outpatient.findByPk(outpatientId);
    if (!outpatient) {
      return res.status(404).json({ message: 'Outpatient clinic not found' });
    }
    await outpatient.destroy();
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    throw new Error(err);
  }
};

/* Specialized */
exports.deleteSpecialized = async (req, res) => {
  const specializedId = req.params.id;
  try {
    const specialized = await Specialized.findByPk(specializedId);
    if (!specialized) {
      return res.status(404).json({ message: 'Specialized clinic not found' });
    }
    await specialized.destroy();
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    throw new Error(err);
  }
};
