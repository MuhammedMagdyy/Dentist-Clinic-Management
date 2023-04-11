const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nurse');
const { body } = require('express-validator');

// GET
router.get('/all-patients', nurseController.getAllPatients);
router.get('/patient/:id', nurseController.getPatient);

// POST
router.post(
  '/add-patient',
  [
    body('name').trim().not().isEmpty(),
    body('age').trim().not().isEmpty().isNumeric(),
    body('phone').trim().not().isEmpty().isNumeric(),
    body('gender').trim().not().isEmpty(),
    body('address').trim().not().isEmpty(),
    body('city').trim().not().isEmpty(),
    body('national_id').trim().not().isEmpty(),
    body('nationality').trim().not().isEmpty(),
    body('marital_status').trim().not().isEmpty(),
    body('occupation').trim().not().isEmpty(),
  ],
  nurseController.addPatient
);

// PUT
router.put('/patient/:id', nurseController.editPatient);

// DELETE
router.delete('/patient/:id', nurseController.deletePatient);
module.exports = router;
