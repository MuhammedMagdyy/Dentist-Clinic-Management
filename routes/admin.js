const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { body } = require('express-validator');

// GET [/admin/]
router.get('/all-clinics', adminController.getAllClinics);
router.get('/clinic/:id', adminController.getClinic);

// POST [/admin/]
router.post('/add-clinic', [body('name').trim()], adminController.addClinic);

// PUT [/admin/]
router.put('/clinic/:id', [body('name').trim()], adminController.editClinic);

// DELETE [/admin/]
router.delete('/clinic/:id', adminController.deleteClinic);

module.exports = router;
