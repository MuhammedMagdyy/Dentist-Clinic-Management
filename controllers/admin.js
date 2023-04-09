const bcrypt = require('bcryptjs');

const Clinic = require('../models/clinic');
const Role = require('../models/role');
const Users = require('../models/user');

// GET Logic
/* Clinics */
exports.getAllClinics = async (req, res, next) => {
  try {
    const clinics = await Clinic.findAll();
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
  try {
    const clinic = await Clinic.findByPk(clinicId);
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
  try {
    const role = await Role.findByPk(roleId);
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

/* Users */
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.findAll();
    if (!users.length) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    res.status(200).json({
      message: 'success',
      data: users,
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    res.status(200).json({
      message: 'success',
      data: user,
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
  try {
    const clinic = await Clinic.create({
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

/* Users */
exports.addUser = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const roleId = req.body.roleId;
  try {
    const hashedPawwrod = await bcrypt.hash(password, 12);
    const user = await Users.create({
      name: name,
      email: email,
      password: hashedPawwrod,
      roleId: roleId,
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
  try {
    const clinic = await Clinic.findByPk(clinicId);
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
  try {
    const role = await Role.findByPk(roleId);
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

/* Users */
exports.editUser = async (req, res, next) => {
  const userId = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const roleId = req.body.roleId;
  try {
    const user = await Users.findByPk(userId);
    user.name = name;
    user.email = email;
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.roleId = roleId;
    res.status(200).json({
      message: 'success',
      data: user,
      status: 200,
    });
    await user.save();
  } catch (err) {
    console.log(err);
  }
};

// DELETE Logic
/* Clinics */
exports.deleteClinic = async (req, res, next) => {
  const clinicId = req.params.id;
  try {
    const clinic = await Clinic.findByPk(clinicId);
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
  try {
    const role = await Role.findByPk(roleId);
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

/* Users */
exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    await user.destroy();
    res.status(200).json({
      message: 'success',
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};
