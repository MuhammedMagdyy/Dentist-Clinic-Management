const Patient = require('../models/patient');
const Outpatient = require('../models/outpatient');
const Specialized = require('../models/specialized');
const Dentist = require('../models/dentist');
const User = require('../models/user');
const Role = require('../models/role');
const Clinic = require('../models/clinic');
const Appointment = require('../models/appointments');
const { Sequelize, Op } = require('sequelize');

// GET Logic
/* Patients */
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'created_by'] },
      include: [
        {
          model: User,
          attributes: ['name'],
          include: [{ model: Role, attributes: ['name'] }],
        },
      ],
    });
    if (!patients.length) {
      return res.status(404).json({ message: 'Not found' });
    }
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
      where: { national_id: patientId },
      attributes: { exclude: ['createdAt', 'updatedAt', 'created_by'] },
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
              'created_by',
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
              'created_by',
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
      where: { national_id: patientId },
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
          'created_by',
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
    if (!outpatients.length) {
      return res.status(404).json({ message: 'Not found' });
    }
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
          'created_by',
          'patientId',
          'dentistId',
          'transferedId',
        ],
      },
      include: [
        {
          model: Patient,
          attributes: { exclude: ['createdAt', 'updatedAt', 'created_by'] },
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
          'created_by',
          'patientId',
          'dentistId',
          'clinicId',
        ],
      },
      include: [
        {
          model: Patient,
          attributes: { exclude: ['createdAt', 'updatedAt', 'created_by'] },
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
    if (!specialized.length) {
      return res.status(404).json({ message: 'Not found' });
    }
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
          'created_by',
          'patientId',
          'dentistId',
          'clinicId',
        ],
      },
      include: [
        {
          model: Patient,
          attributes: { exclude: ['createdAt', 'updatedAt', 'created_by'] },
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
      where: { national_id: patientId },
      attributes: { exclude: ['createdAt', 'updatedAt', 'created_by'] },
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
              'created_by',
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
              'created_by',
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
    if (!patientData) {
      return res.status(404).json({ message: 'Not found' });
    }
    res
      .status(200)
      .json({ message: 'success', data: { patient: patientData } });
  } catch (err) {
    throw new Error(err);
  }
};

/* Appointment */
exports.getAppointment = async (req, res) => {
  const id = req.params.id;
  try {
    const patient = await Patient.findOne({
      where: { national_id: id },
      attributes: ['id', 'name'],
      include: [
        {
          model: Clinic,
          attributes: ['id', 'name'],
          through: { attributes: ['id', 'status'] },
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
  const id = req.params.id;
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
  const name = req.body.name;
  const age = req.body.age;
  const phone = req.body.phone;
  const gender = req.body.gender;
  const address = req.body.address;
  const city = req.body.city;
  const national_id = req.body.national_id;
  const nationality = req.body.nationality;
  const marital_status = req.body.marital_status;
  const occupation = req.body.occupation;
  try {
    const patient = await Patient.create({
      name: name,
      age: age,
      phone: phone,
      gender: gender,
      address: address,
      city: city,
      national_id: national_id,
      nationality: nationality,
      marital_status: marital_status,
      occupation: occupation,
      created_by: req.userId,
    });
    res.status(201).json({ message: 'success', data: patient });
  } catch (err) {
    throw new Error(err);
  }
};

/* Outpatients */
exports.addOutPatient = async (req, res) => {
  const chief_complaint = req.body.chief_complaint;
  const medical_history = req.body.medical_history;
  const diagnosis = req.body.diagnosis;
  const extra_oral = req.body.extra_oral;
  const intra_oral = req.body.intra_oral;
  const upper_right = req.body.upper_right;
  const upper_left = req.body.upper_left;
  const down_right = req.body.down_right;
  const down_left = req.body.down_left;
  const patientId = req.body.patientId;
  const dentistId = req.body.dentistId;
  const transferedId = req.body.transferedId;
  try {
    const outpatient = await Outpatient.create({
      chief_complaint: chief_complaint,
      medical_history: medical_history,
      diagnosis: diagnosis,
      extra_oral: extra_oral,
      intra_oral: intra_oral,
      upper_right: upper_right,
      upper_left: upper_left,
      down_right: down_right,
      down_left: down_left,
      created_by: req.userId,
      patientId: patientId,
      dentistId: dentistId,
      transferedId: transferedId,
    });
    await Appointment.create({ patientId: patientId, clinicId: transferedId });
    res.status(201).json({ message: 'success', data: outpatient });
  } catch (err) {
    throw new Error(err);
  }
};

/* Specialized */
exports.addSpecialized = async (req, res) => {
  const examination = req.body.examination;
  const diagnosis = req.body.diagnosis;
  const treatment = req.body.treatment;
  const patientId = req.body.patientId;
  const dentistId = req.body.dentistId;
  const clinicId = req.body.clinicId;
  const treatment_plant = req.body.treatment_plant;
  const radiographic_exam = req.body.radiographic_exam;
  try {
    const specialized = await Specialized.create({
      examination: examination,
      diagnosis: diagnosis,
      treatment: treatment,
      created_by: req.userId,
      patientId: patientId,
      dentistId: dentistId,
      clinicId: clinicId,
      treatment_plant: treatment_plant,
      radiographic_exam: radiographic_exam,
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
  const national_id = req.body.patientId;
  const clinicId = req.body.clinicId;

  try {
    const patient = await Patient.findOne({
      where: { national_id: national_id },
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
    } else {
      return res
        .status(404)
        .json({ message: 'Patient must be in outpatients first' });
    }
  } catch (err) {
    throw new Error(err);
  }
};

// PUT Logic
/* Patients */
exports.editPatient = async (req, res) => {
  const patientId = req.params.id;
  const name = req.body.name;
  const age = req.body.age;
  const phone = req.body.phone;
  const gender = req.body.gender;
  const address = req.body.address;
  const city = req.body.city;
  const national_id = req.body.national_id;
  const nationality = req.body.nationality;
  const marital_status = req.body.marital_status;
  const occupation = req.body.occupation;
  const created_by = req.userId;
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
    patient.national_id = national_id;
    patient.nationality = nationality;
    patient.marital_status = marital_status;
    patient.occupation = occupation;
    patient.created_by = created_by;
    await patient.save();
    res.status(200).json({ message: 'Updated successfully' });
  } catch (err) {
    throw new Error(err);
  }
};

/* Outpatients */
exports.editOutPatient = async (req, res) => {
  const outpatientId = req.params.id;
  const chief_complaint = req.body.chief_complaint;
  const medical_history = req.body.medical_history;
  const diagnosis = req.body.diagnosis;
  const extra_oral = req.body.extra_oral;
  const intra_oral = req.body.intra_oral;
  const upper_right = req.body.upper_right;
  const upper_left = req.body.upper_left;
  const down_right = req.body.down_right;
  const down_left = req.body.down_left;
  const created_by = req.userId;
  const patientId = req.body.patientId;
  const dentistId = req.body.dentistId;
  const transferedId = req.body.transferedId;
  try {
    const outpatient = await Outpatient.findByPk(outpatientId);
    if (!outpatient) {
      return res.status(404).json({ message: 'Outpatient clinic not found' });
    }
    outpatient.chief_complaint = chief_complaint;
    outpatient.medical_history = medical_history;
    outpatient.diagnosis = diagnosis;
    outpatient.extra_oral = extra_oral;
    outpatient.intra_oral = intra_oral;
    outpatient.upper_right = upper_right;
    outpatient.upper_left = upper_left;
    outpatient.down_right = down_right;
    outpatient.down_left = down_left;
    outpatient.created_by = created_by;
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
  const examination = req.body.examination;
  const diagnosis = req.body.diagnosis;
  const treatment = req.body.treatment;
  const created_by = req.userId;
  const patientId = req.body.patientId;
  const dentistId = req.body.dentistId;
  const clinicId = req.body.clinicId;
  const treatment_plant = req.body.treatment_plant;
  const radiographic_exam = req.body.radiographic_exam;
  try {
    const specialized = await Specialized.findByPk(specializedId);
    if (!specialized) {
      return res.status(404).json({ message: 'Specialized clinic not found' });
    }
    specialized.examination = examination;
    specialized.diagnosis = diagnosis;
    specialized.treatment = treatment;
    specialized.created_by = created_by;
    specialized.patientId = patientId;
    specialized.dentistId = dentistId;
    specialized.clinicId = clinicId;
    specialized.treatment_plant = treatment_plant;
    specialized.radiographic_exam = radiographic_exam;
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
  const id = req.params.id;
  const transferedTo = req.body.transferedTo;

  try {
    const old_appointment = await Appointment.findByPk(id);
    if (!old_appointment) {
      return res.status(404).json({ message: 'Patient has no appointments' });
    }
    const new_appointment = await Appointment.create({
      patientId: old_appointment.patientId,
      clinicId: transferedTo,
    });
    old_appointment.transferedTo = new_appointment.id;
    old_appointment.status = 2;
    await old_appointment.save();
    await new_appointment.save();

    res.status(200).json({ message: 'Updated successfully' });
  } catch (err) {
    throw new Error(err);
  }
};

exports.editStatus = async (req, res) => {
  const id = req.params.id;
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
