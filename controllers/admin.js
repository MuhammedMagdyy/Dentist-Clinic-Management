const bcrypt = require('bcryptjs');

const Clinic = require('../models/clinic');
const Role = require('../models/role');
const Users = require('../models/user');
const Dentist = require('../models/dentist');
const Patient = require('../models/patient');
const Outpatient = require('../models/outpatient');
const Specialized = require('../models/specialized');

// GET Logic
/* Clinics */
exports.getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.status(200).json({ message: 'success', data: clinics });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getClinic = async (req, res) => {
  const clinicId = req.params.id;
  try {
    const clinic = await Clinic.findByPk(clinicId, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Specialized,
          // Dont forget to convert plant to plan
          attributes: ['id', 'examination', 'treatment_plant'],
          include: [
            {
              model: Patient,
              attributes: ['name'],
            },
            {
              model: Dentist,
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
          ],
        },
      ],
    });
    res.status(200).json({ message: 'success', data: clinic });
  } catch (err) {
    throw new Error(err);
  }
};

/* Roles */
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.status(200).json({ message: 'success', data: roles });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getRole = async (req, res) => {
  const roleId = req.params.id;
  try {
    const role = await Role.findByPk(roleId, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.status(200).json({ message: 'success', data: role });
  } catch (err) {
    throw new Error(err);
  }
};

/* Users */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: {
        exclude: [
          'password',
          'resetToken',
          'resetTokenExpiration',
          'roleId',
          'createdAt',
          'updatedAt',
        ],
      },
      include: [{ model: Role, attributes: ['id', 'name'] }],
    });
    res.status(200).json({ message: 'success', data: users });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Users.findByPk(userId, {
      attributes: {
        exclude: [
          'password',
          'resetToken',
          'resetTokenExpiration',
          'roleId',
          'createdAt',
          'updatedAt',
        ],
      },
      include: [
        { model: Role, attributes: ['name'] },
        {
          model: Patient,
          attributes: { exclude: ['createdAt', 'updatedAt', 'created_by'] },
        },
      ],
    });
    res.status(200).json({ message: 'success', data: user });
  } catch (err) {
    throw new Error(err);
  }
};

/* Dentists */
exports.getAllDentists = async (req, res) => {
  try {
    const dentists = await Dentist.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.status(200).json({ message: 'success', data: dentists });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getDentist = async (req, res) => {
  const dentistId = req.params.id;
  try {
    const dentist = await Dentist.findOne({
      where: { national_id: dentistId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
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
              model: Patient,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'created_by'],
              },
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
              model: Patient,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'created_by'],
              },
            },
          ],
        },
      ],
    });
    res.status(200).json({ message: 'success', data: dentist });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getDentistId = async (req, res) => {
  const dentistId = req.params.id;
  try {
    const dentist = await Dentist.findOne({
      where: { national_id: dentistId },
      attributes: ['id'],
    });
    res.status(200).json({ message: 'success', data: dentist });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getInDoctor = async (req, res) => {
  try {
    const dentist = await Dentist.findAll({
      where: { works_in: 'Specialized Clinics' },
      attributes: ['id', 'name'],
    });
    res.status(200).json({ message: 'success', data: dentist });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getOutDoctor = async (req, res) => {
  try {
    const dentist = await Dentist.findAll({
      where: { works_in: 'Outpatient Clinics' },
      attributes: ['id', 'name'],
    });
    res.status(200).json({ message: 'success', data: dentist });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getClinicId = async (req, res) => {
  const clinicId = req.params.id;
  try {
    const clinic = await Clinic.findOne({
      where: { id: clinicId },
      attributes: ['id'],
    });
    res.status(200).json({ message: 'success', data: clinic });
  } catch (err) {
    throw new Error(err);
  }
};

// POST Logic
/* Clinics */
exports.addClinic = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  const name = req.body.name;
  try {
    const clinic = await Clinic.create({
      name: name,
    });
    res.status(201).json({ message: 'Added Successfully', data: clinic });
  } catch (err) {
    throw new Error(err);
  }
};

/* Roles */
exports.addRole = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  const name = req.body.name;
  const nameToLower = name.toLowerCase();
  try {
    const role = await Role.create({ name: nameToLower });
    res.status(201).json({ message: 'Added Successfully', data: role });
  } catch (err) {
    throw new Error(err);
  }
};

/* Users */
exports.addUser = async (req, res) => {
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
    res.status(201).json({ message: 'Added Successfully', data: user });
  } catch (err) {
    throw new Error(err);
  }
};

/* Dentists */
exports.addDentist = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const national_id = req.body.national_id;
  const works_in = req.body.works_in;
  try {
    const dentist = await Dentist.create({
      name: name,
      email: email,
      phone: phone,
      national_id: national_id,
      works_in: works_in,
    });
    res.status(201).json({ message: 'Added Successfully', data: dentist });
  } catch (err) {
    throw new Error(err);
  }
};

// PUT Logic
/* Clinics */
exports.editClinic = async (req, res) => {
  const clinicId = req.params.id;
  const name = req.body.name;
  try {
    const clinic = await Clinic.findByPk(clinicId);
    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }
    clinic.name = name;
    res.status(200).json({ message: 'Updated Successfully', data: clinic });
    await clinic.save();
  } catch (err) {
    throw new Error(err);
  }
};

/* Roles */
exports.editRole = async (req, res) => {
  const roleId = req.params.id;
  const name = req.body.name;
  try {
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    role.name = name.toLowerCase();
    res.status(200).json({ message: 'Updated Successfully', data: role });
    await role.save();
  } catch (err) {
    throw new Error(err);
  }
};

/* Users */
exports.editUser = async (req, res) => {
  const userId = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const roleId = req.body.roleId;
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = name;
    user.email = email;
    user.roleId = roleId;
    res.status(200).json({ message: 'Updated Successfully', data: user });
    await user.save();
  } catch (err) {
    throw new Error(err);
  }
};

/* Dentists */
exports.editDentist = async (req, res) => {
  const dentistId = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const national_id = req.body.national_id;
  const works_in = req.body.works_in;
  try {
    const dentist = await Dentist.findByPk(dentistId);
    if (!dentist) {
      return res.status(404).json({ message: 'Dentist not found' });
    }
    dentist.name = name;
    dentist.email = email;
    dentist.phone = phone;
    dentist.national_id = national_id;
    dentist.works_in = works_in;
    res.status(200).json({ message: 'Updated Successfully', data: dentist });
    await dentist.save();
  } catch (err) {
    throw new Error(err);
  }
};

// DELETE Logic
/* Clinics */
exports.deleteClinic = async (req, res) => {
  const clinicId = req.params.id;
  try {
    const clinic = await Clinic.findByPk(clinicId);
    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }
    await clinic.destroy();
    res.status(200).json({ message: 'Deleted Successfully' });
  } catch (err) {
    throw new Error(err);
  }
};

/* Roles */
exports.deleteRole = async (req, res) => {
  const roleId = req.params.id;
  try {
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    await role.destroy();
    res.status(200).json({ message: 'Deleted Successfully' });
  } catch (err) {
    throw new Error(err);
  }
};

/* Users */
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Deleted Successfully' });
  } catch (err) {
    throw new Error(err);
  }
};

/* Dentists */
exports.deleteDentist = async (req, res) => {
  const dentistId = req.params.id;
  try {
    const dentist = await Dentist.findByPk(dentistId);
    if (!dentist) {
      return res.status(404).json({ message: 'Dentist not found' });
    }
    await dentist.destroy();
    res.status(200).json({ message: 'Deleted Successfully' });
  } catch (err) {
    throw new Error(err);
  }
};
