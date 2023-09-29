const express = require('express');

const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middlewares/is-auth');
const isAdmin = require('../middlewares/is-admin');
const isNurse = require('../middlewares/is-nurse');
const {
  getClinicValidator,
  addClinicValidator,
  updateClinicValidator,
  deleteClinicValidator,
} = require('../utils/validators/admin/clinic/clinicValidator');
const {
  getRoleValidator,
  addRoleValidator,
  updateRoleValidator,
  deleteRoleValidator,
} = require('../utils/validators/admin/role/roleValidator');
const {
  getUserValidator,
  addUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require('../utils/validators/admin/user/userValidator');
const {
  getDentistValidator,
  addDentistValidator,
  updateDentistValidator,
  deleteDentistValidator,
} = require('../utils/validators/admin/dentist/dentistValidator');

// GET [/admin/]
router.get('/clinics', isAuth, isNurse, adminController.getAllClinics);
router.get(
  '/clinics/:id',
  isAuth,
  isNurse,
  getClinicValidator,
  adminController.getClinic
);

router.get('/roles', isAuth, isAdmin, adminController.getAllRoles);
router.get(
  '/roles/:id',
  isAuth,
  isAdmin,
  getRoleValidator,
  adminController.getRole
);

router.get('/users', isAuth, isAdmin, adminController.getAllUsers);
router.get(
  '/users/:id',
  isAuth,
  isAdmin,
  getUserValidator,
  adminController.getUser
);

router.get('/dentists', isAuth, isNurse, adminController.getAllDentists);
router.get(
  '/dentists/:id',
  isAuth,
  isNurse,
  getDentistValidator,
  adminController.getDentist
);
router.get('/dentistId/:id', isAuth, isNurse, adminController.getDentistId);
router.get('/in-doctor', isAuth, isNurse, adminController.getInDoctor);
router.get('/out-doctor', isAuth, isNurse, adminController.getOutDoctor);

router.get('/clinicId/:id', isAuth, isNurse, adminController.getClinicId);

// POST [/admin/]
router.post(
  '/clinics',
  isAuth,
  isAdmin,
  addClinicValidator,
  adminController.addClinic
);

router.post(
  '/roles',
  isAuth,
  isAdmin,
  addRoleValidator,
  adminController.addRole
);

router.post(
  '/users',
  isAuth,
  isAdmin,
  addUserValidator,
  adminController.addUser
);

router.post(
  '/dentists',
  isAuth,
  isAdmin,
  addDentistValidator,
  adminController.addDentist
);

// PUT [/admin/]
router.put(
  '/clinics/:id',
  isAuth,
  isAdmin,
  updateClinicValidator,
  adminController.editClinic
);

router.put(
  '/roles/:id',
  isAuth,
  isAdmin,
  updateRoleValidator,
  adminController.editRole
);

router.put(
  '/users/:id',
  isAuth,
  isAdmin,
  updateUserValidator,
  adminController.editUser
);

router.put(
  '/dentists/:id',
  isAuth,
  isAdmin,
  updateDentistValidator,
  adminController.editDentist
);

// DELETE [/admin/]
router.delete(
  '/clinics/:id',
  isAuth,
  isAdmin,
  deleteClinicValidator,
  adminController.deleteClinic
);

router.delete(
  '/roles/:id',
  isAuth,
  isAdmin,
  deleteRoleValidator,
  adminController.deleteRole
);

router.delete(
  '/users/:id',
  isAuth,
  isAdmin,
  deleteUserValidator,
  adminController.deleteUser
);

router.delete(
  '/dentists/:id',
  isAuth,
  isAdmin,
  deleteDentistValidator,
  adminController.deleteDentist
);

module.exports = router;
