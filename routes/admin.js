const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middlewares/is-auth');
const isAdmin = require('../middlewares/is-admin');
const { body } = require('express-validator');

// GET [/admin/]
router.get('/all-clinics', isAuth, isAdmin, adminController.getAllClinics);
router.get('/clinic/:id', isAuth, isAdmin, adminController.getClinic);

router.get('/all-roles', isAuth, isAdmin, adminController.getAllRoles);
router.get('/role/:id', isAuth, isAdmin, adminController.getRole);

router.get('/all-users', isAuth, isAdmin, adminController.getAllUsers);
router.get('/user/:id', isAuth, isAdmin, adminController.getUser);

router.get('/all-dentists', isAuth, isAdmin, adminController.getAllDentists);
router.get('/dentist/:id', isAuth, isAdmin, adminController.getDentist);

// POST [/admin/]
router.post(
  '/add-clinic',
  [body('name').trim().not().isEmpty()],
  isAuth,
  isAdmin,
  adminController.addClinic
);

router.post(
  '/add-role',
  [body('name').trim().not().isEmpty()],
  isAuth,
  isAdmin,
  adminController.addRole
);

router.post(
  '/add-user',
  [
    body('name').trim().not().isEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
  ],
  isAuth,
  isAdmin,
  adminController.addUser
);

router.post(
  '/add-dentist',
  [
    body('name').trim().not().isEmpty(),
    body('email').isEmail().normalizeEmail(),
    // body('password').trim().isLength({ min: 5 }),
    body('national_id').trim().not().isEmpty(),
    body('phone').trim().not().isEmpty(),
    body('works_in').trim().not().isEmpty(),
  ],
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
