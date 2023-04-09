const Clinic = require('../models/clinic');

// GET Logic
exports.getAllClinics = (req, res, next) => {
  Clinic.findAll()
    .then(clinics => {
      if (!clinics.length) {
        return res.status(404).json({
          message: `There're no clinics in database!`,
          status: 404,
        });
      }
      res.status(200).json({
        message: 'Clinics fetched successfully!',
        clinics: clinics,
        status: 200,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getClinic = (req, res, next) => {
  const clinicId = req.params.id;
  Clinic.findByPk(clinicId)
    .then(clinic => {
      if (!clinic) {
        return res.status(404).json({
          message: 'Clinic not found!',
          status: 404,
        });
      }
      res.status(200).json({
        message: 'Clinic fetched!',
        clinic: clinic,
        status: 200,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// POST Logic
exports.addClinic = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: 'Name can not be empty!',
    });
  }
  const name = req.body.name;
  Clinic.create({
    name: name,
  })
    .then(result => {
      res.status(201).json({
        message: 'Clinic created successfully!',
        status: 201,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// PUT Logic
exports.editClinic = (req, res, next) => {
  const clinicId = req.params.id;
  const name = req.body.name;
  Clinic.findByPk(clinicId)
    .then(clinic => {
      clinic.name = name;
      return clinic.save();
    })
    .then(result => {
      res.status(200).json({
        message: 'Clinic updated!',
        clinic: result,
        status: 200,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// DELETE Logic
exports.deleteClinic = (req, res, next) => {
  const clinicId = req.params.id;
  Clinic.findByPk(clinicId)
    .then(clinic => {
      if (!clinic) {
        return res.status(404).json({
          message: 'Clinic not found!',
          status: 404,
        });
      }
      return clinic.destroy();
    })
    .then(result => {
      res.status(200).json({
        message: 'Clinic deleted!',
        status: 200,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
