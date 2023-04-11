const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nurse');
const { body } = require('express-validator');

// GET
router.get('/all-patients', nurseController.getAllPatients);
router.get('/patient/:id', nurseController.getPatient);

router.get('/all-outpatients', nurseController.getAllOutPatients);
router.get('/outpatient/:id', nurseController.getOutPatient);

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
    body('created_by').trim().not().isEmpty(),
  ],
  nurseController.addPatient
);

router.post(
  '/add-outpatient',
  [
    body('chief_complaint').trim().not().isEmpty(),
    body('medical_history').trim().not().isEmpty(),
    body('diagnosis').trim().not().isEmpty(),
    body('extra_oral').trim().not().isEmpty(),
    body('intra_oral').trim().not().isEmpty(),
    // body('transfered_to').trim().not().isEmpty(),
    body('upper_right').trim().not().isEmpty().isNumeric(),
    body('upper_left').trim().not().isEmpty().isNumeric(),
    body('down_right').trim().not().isEmpty().isNumeric(),
    body('down_left').trim().not().isEmpty().isNumeric(),
    body('patientId').trim().not().isEmpty().isNumeric(),
    body('created_by').trim().not().isEmpty(),
    body('dentistId').trim().not().isEmpty().isNumeric(),
    body('transferedId').trim().not().isEmpty().isNumeric(),
  ],
  nurseController.addOutPatient
);
// PUT
router.put('/patient/:id', nurseController.editPatient);

router.put('/outpatient/:id', nurseController.editOutPatient);

// DELETE
router.delete('/patient/:id', nurseController.deletePatient);

router.delete('/outpatient/:id', nurseController.deleteOutPatient);
module.exports = router;
