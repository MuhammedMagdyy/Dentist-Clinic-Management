const Clinic = require('../models/clinic');
const Role = require('../models/role');

// GET Logic
/* Clinics */
exports.getAllClinics = async (req, res, next) => {
  const clinics = await Clinic.findAll();
  try {
    if (!clinics.length) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    res.status(200).json({
      message: 'success',
      data: clinics,
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getClinic = async (req, res, next) => {
  const clinicId = req.params.id;
  const clinic = await Clinic.findByPk(clinicId);
  try {
    if (!clinic) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    res.status(200).json({
      message: 'success',
      data: clinic,
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

/* Roles */
exports.getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.findAll();
    if (!roles.length) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    res.status(200).json({
      message: 'success',
      data: roles,
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getRole = async (req, res, next) => {
  const roleId = req.params.id;
  const role = await Role.findByPk(roleId);
  try {
    if (!role) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    res.status(200).json({
      message: 'success',
      data: role,
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

// POST Logic
/* Clinics */
exports.addClinic = async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: 'error',
      status: 400,
    });
  }
  const name = req.body.name;
  const clinic = await Clinic.create({
    name: name,
  });
  try {
    res.status(201).json({
      message: 'success',
      status: 201,
    });
  } catch (err) {
    console.log(err);
  }
};

/* Roles */
exports.addRole = async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: 'error',
      status: 400,
    });
  }
  const name = req.body.name;
  try {
    const result = await Role.create({
      name: name,
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
/* Clinics */
exports.editClinic = async (req, res, next) => {
  const clinicId = req.params.id;
  const name = req.body.name;
  const clinic = await Clinic.findByPk(clinicId);
  try {
    clinic.name = name;
    res.status(200).json({
      message: 'success',
      data: clinic,
      status: 200,
    });
    await clinic.save();
  } catch (err) {
    console.log(err);
  }
};

/* Roles */
exports.editRole = async (req, res, next) => {
  const roleId = req.params.id;
  const name = req.body.name;
  const role = await Role.findByPk(roleId);
  try {
    role.name = name;
    res.status(200).json({
      message: 'success',
      data: role,
      status: 200,
    });
    await role.save();
  } catch (err) {
    console.log(err);
  }
};

// DELETE Logic
/* Clinics */
exports.deleteClinic = async (req, res, next) => {
  const clinicId = req.params.id;
  const clinic = await Clinic.findByPk(clinicId);
  try {
    if (!clinic) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    await clinic.destroy();
    res.status(200).json({
      message: 'success',
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

/* Roles */
exports.deleteRole = async (req, res, next) => {
  const roleId = req.params.id;
  const role = await Role.findByPk(roleId);
  try {
    if (!role) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    await role.destroy();
    res.status(200).json({
      message: 'success',
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};
