const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { body } = require('express-validator');

// GET [/admin/]
router.get('/all-clinics', adminController.getAllClinics);
router.get('/clinic/:id', adminController.getClinic);

router.get('/all-roles', adminController.getAllRoles);
router.get('/role/:id', adminController.getRole);

router.get('/all-users', adminController.getAllUsers);
router.get('/user/:id', adminController.getUser);

router.get('/all-dentists', adminController.getAllDentists);
router.get('/dentist/:id', adminController.getDentist);

// POST [/admin/]
router.post(
  '/add-clinic',
  [body('name').trim().not().isEmpty()],
  adminController.addClinic
);

router.post(
  '/add-role',
  [body('name').trim().not().isEmpty()],
  adminController.addRole
);

router.post(
  '/add-user',
  [
    body('name').trim().not().isEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
  ],
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
  adminController.addDentist
);

// PUT [/admin/]
router.put('/clinic/:id', adminController.editClinic);

router.put('/role/:id', adminController.editRole);

router.put('/user/:id', adminController.editUser);

router.put('/dentist/:id', adminController.editDentist);

// DELETE [/admin/]
router.delete('/clinic/:id', adminController.deleteClinic);

router.delete('/role/:id', adminController.deleteRole);

router.delete('/user/:id', adminController.deleteUser);

router.delete('/dentist/:id', adminController.deleteDentist);

module.exports = router;
