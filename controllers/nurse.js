const Patient = require('../models/patient');

// GET Logic
/* Patients */
exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.findAll();
    if (!patients.length) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    res.status(200).json({
      message: 'success',
      data: patients,
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getPatient = async (req, res, next) => {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    res.status(200).json({
      message: 'success',
      data: patient,
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

// POST Logic
/* Patients */
exports.addPatient = async (req, res, next) => {
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
  const created_by = req.body.created_by;
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
      created_by: created_by,
    });
    res.status(201).json({
      message: 'success',
      status: 201,
    });
  } catch (err) {
    console.log(err);
  }
};

// PUT Logic
/* Patients */
exports.editPatient = async (req, res, next) => {
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
  const created_by = req.body.created_by;
  try {
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
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
    res.status(200).json({
      message: 'success',
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

// DELETE Logic
/* Patients */
exports.deletePatient = async (req, res, next) => {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    await patient.destroy();
    res.status(200).json({
      message: 'success',
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};
