const Patient = require('../models/patient');
const Outpatient = require('../models/outpatient');
const Specialized = require('../models/specialized');
const Dentist = require('../models/dentist');
const User = require('../models/user');
const Role = require('../models/role');
const Clinic = require('../models/clinic');

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

/* Outpatients */
exports.getAllOutPatients = async (req, res, next) => {
  try {
    const outpatients = await Outpatient.findAll();
    if (!outpatients.length) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    res.status(200).json({
      message: 'success',
      data: outpatients,
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getOutPatient = async (req, res, next) => {
  const outpatientId = req.params.id;
  try {
    const outpatient = await Outpatient.findByPk(outpatientId);
    if (!outpatient) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    res.status(200).json({
      message: 'success',
      data: outpatient,
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

/* Specialized */
exports.getAllSpecialized = async (req, res, next) => {
  try {
    const specialized = await Specialized.findAll();
    if (!specialized.length) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    res.status(200).json({
      message: 'success',
      data: specialized,
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getSpecialized = async (req, res, next) => {
  const specializedId = req.params.id;
  try {
    const specialized = await Specialized.findByPk(specializedId);
    if (!specialized) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    res.status(200).json({
      message: 'success',
      data: specialized,
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

/* All Data */
exports.getAllPatientData = async (req, res, next) => {
  const patientId = req.params.id;
  try {
    const patientData = await Patient.findOne({
      where: { national_id: patientId },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'created_by'],
      },
      include: [
        {
          model: User,
          attributes: ['name'],
          include: [
            {
              model: Role,
              attributes: ['name'],
            },
          ],
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
          include: [
            {
              model: Dentist,
              attributes: ['name'],
            },
          ],
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
            {
              model: Dentist,
              attributes: ['name'],
            },
            {
              model: Clinic,
              attributes: ['name'],
            },
          ],
        },
      ],
    });
    if (!patientData) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    res.status(200).json({
      message: 'success',
      data: {
        patient: patientData,
      },
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
  // const created_by = req.body.created_by;
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
    res.status(201).json({
      message: 'success',
      status: 201,
    });
  } catch (err) {
    console.log(err);
  }
};

/* Outpatients */
exports.addOutPatient = async (req, res, next) => {
  const chief_complaint = req.body.chief_complaint;
  const medical_history = req.body.medical_history;
  const diagnosis = req.body.diagnosis;
  const extra_oral = req.body.extra_oral;
  const intra_oral = req.body.intra_oral;
  const transfered_to = req.body.transfered_to;
  const upper_right = req.body.upper_right;
  const upper_left = req.body.upper_left;
  const down_right = req.body.down_right;
  const down_left = req.body.down_left;
  // const created_by = req.body.created_by;
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
      transfered_to: transfered_to,
      upper_right: upper_right,
      upper_left: upper_left,
      down_right: down_right,
      down_left: down_left,
      created_by: req.userId,
      patientId: patientId,
      dentistId: dentistId,
      transferedId: transferedId,
    });
    res.status(201).json({
      message: 'success',
      status: 201,
    });
  } catch (err) {
    console.log(err);
  }
};

/* Specialized */
exports.addSpecialized = async (req, res, next) => {
  const examination = req.body.examination;
  const diagnosis = req.body.diagnosis;
  const treatment = req.body.treatment;
  // const created_by = req.body.created_by;
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

/* Outpatients */
exports.editOutPatient = async (req, res, next) => {
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
  const created_by = req.body.created_by;
  const patientId = req.body.patientId;
  const dentistId = req.body.dentistId;
  const transferedId = req.body.transferedId;
  try {
    const outpatient = await Outpatient.findByPk(outpatientId);
    if (!outpatient) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
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
    res.status(200).json({
      message: 'success',
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

/* Specialized */
exports.editSpecialized = async (req, res, next) => {
  const specializedId = req.params.id;
  const examination = req.body.examination;
  const diagnosis = req.body.diagnosis;
  const treatment = req.body.treatment;
  const created_by = req.body.created_by;
  const patientId = req.body.patientId;
  const dentistId = req.body.dentistId;
  const clinicId = req.body.clinicId;
  const treatment_plant = req.body.treatment_plant;
  const radiographic_exam = req.body.radiographic_exam;
  try {
    const specialized = await Specialized.findByPk(specializedId);
    if (!specialized) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
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

/* Outpatients */
exports.deleteOutPatient = async (req, res, next) => {
  const outpatientId = req.params.id;
  try {
    const outpatient = await Outpatient.findByPk(outpatientId);
    if (!outpatient) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    await outpatient.destroy();
    res.status(200).json({
      message: 'success',
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

/* Specialized */
exports.deleteSpecialized = async (req, res, next) => {
  const specializedId = req.params.id;
  try {
    const specialized = await Specialized.findByPk(specializedId);
    if (!specialized) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    await specialized.destroy();
    res.status(200).json({
      message: 'success',
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};
