const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { body } = require('express-validator');

// GET [/admin/]
router.get('/all-clinics', adminController.getAllClinics);
router.get('/clinic/:id', adminController.getClinic);

router.get('/all-roles', adminController.getAllRoles);
router.get('/role/:id', adminController.getRole);

// POST [/admin/]
router.post('/add-clinic', [body('name').trim()], adminController.addClinic);

router.post('/add-role', [body('name').trim()], adminController.addRole);

// PUT [/admin/]
router.put('/clinic/:id', [body('name').trim()], adminController.editClinic);

router.put('/role/:id', adminController.editRole);

// DELETE [/admin/]
router.delete('/clinic/:id', adminController.deleteClinic);

router.delete('/role/:id', adminController.deleteRole);

module.exports = router;
