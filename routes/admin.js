const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middlewares/is-auth');
const isAdmin = require('../middlewares/is-admin');
const isNurse = require('../middlewares/is-nurse');
const { body } = require('express-validator');
const { validationMiddleWare } = require('../middlewares/is-validator');

// GET [/admin/]
router.get('/all-clinics', isAuth, isNurse, adminController.getAllClinics);
router.get('/clinic/:id', isAuth, isNurse, adminController.getClinic);

router.get('/all-roles', isAuth, isAdmin, adminController.getAllRoles);
router.get('/role/:id', isAuth, isAdmin, adminController.getRole);

router.get('/all-users', isAuth, isAdmin, adminController.getAllUsers);
router.get('/user/:id', isAuth, isAdmin, adminController.getUser);

router.get('/all-dentists', isAuth, isNurse, adminController.getAllDentists);
router.get('/dentist/:id', isAuth, isNurse, adminController.getDentist);
router.get('/dentistId/:id', isAuth, isNurse, adminController.getDentistId);

router.get('/clinicId/:id', isAuth, isNurse, adminController.getClinicId);

// POST [/admin/]
router.post(
  '/add-clinic',
  [body('name').trim().notEmpty().isAlpha()],
  validationMiddleWare,
  isAuth,
  isAdmin,
  adminController.addClinic
);

router.post(
  '/add-role',
  [body('name').trim().notEmpty().isAlpha()],
  validationMiddleWare,
  isAuth,
  isAdmin,
  adminController.addRole
);

router.post(
  '/add-user',
  [
    body('name').trim().notEmpty().isAlpha(),
    body('email').isEmail().normalizeEmail().trim().notEmpty(),
    body('password').trim().isLength({ min: 5 }).notEmpty(),
  ],
  validationMiddleWare,
  isAuth,
  isAdmin,
  adminController.addUser
);

router.post(
  '/add-dentist',
  [
    body('name').trim().notEmpty().isAlpha(),
    body('email').isEmail().normalizeEmail().trim().notEmpty(),
    body('national_id').trim().notEmpty().isNumeric().isLength({ min: 14 }),
    body('phone').trim().notEmpty().isNumeric(),
    body('works_in').trim().notEmpty(),
  ],
  validationMiddleWare,
  isAuth,
  isAdmin,
  adminController.addDentist
);

// PUT [/admin/]
router.put('/clinic/:id', isAuth, isAdmin, adminController.editClinic);

router.put('/role/:id', isAuth, isAdmin, adminController.editRole);

router.put('/user/:id', isAuth, isAdmin, adminController.editUser);

router.put('/dentist/:id', isAuth, isAdmin, adminController.editDentist);

// DELETE [/admin/]
router.delete('/clinic/:id', isAuth, isAdmin, adminController.deleteClinic);

router.delete('/role/:id', isAuth, isAdmin, adminController.deleteRole);

router.delete('/user/:id', isAuth, isAdmin, adminController.deleteUser);

router.delete('/dentist/:id', isAuth, isAdmin, adminController.deleteDentist);

module.exports = router;
