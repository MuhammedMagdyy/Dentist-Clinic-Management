const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nurse');
const { body } = require('express-validator');
const isAuth = require('../middlewares/is-auth');

// GET
router.get('/all-patients', isAuth, nurseController.getAllPatients);
router.get('/patient/:id', isAuth, nurseController.getPatient);

router.get('/all-outpatients', isAuth, nurseController.getAllOutPatients);
router.get('/outpatient/:id', isAuth, nurseController.getOutPatient);

router.get('/all-specialized', isAuth, nurseController.getAllSpecialized);
router.get('/specialized/:id', isAuth, nurseController.getSpecialized);

router.get('/patient-data/:id', isAuth, nurseController.getAllPatientData);

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
  isAuth,
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
    body('upper_right').trim().not().isEmpty().isNumeric(),
    body('upper_left').trim().not().isEmpty().isNumeric(),
    body('down_right').trim().not().isEmpty().isNumeric(),
    body('down_left').trim().not().isEmpty().isNumeric(),
    body('patientId').trim().not().isEmpty().isNumeric(),
    body('created_by').trim().not().isEmpty(),
    body('dentistId').trim().not().isEmpty().isNumeric(),
    body('transferedId').trim().not().isEmpty().isNumeric(),
  ],
  isAuth,
  nurseController.addOutPatient
);

router.post(
  '/add-specialized',
  [
    body('examination').trim().not().isEmpty(),
    body('treatment').trim().not().isEmpty(),
    body('created_by').trim().not().isEmpty(),
    body('patientId').trim().not().isEmpty().isNumeric(),
    body('dentistId').trim().not().isEmpty().isNumeric(),
    body('clinicId').trim().not().isEmpty().isNumeric(),
    body('diagnosis').trim().not().isEmpty(),
    body('radiographic_exam').trim().not().isEmpty(),
    body('treatment_plant').trim().not().isEmpty(),
  ],
  isAuth,
  nurseController.addSpecialized
);

// PUT
router.put('/patient/:id', isAuth, nurseController.editPatient);

router.put('/outpatient/:id', isAuth, nurseController.editOutPatient);

router.put('/specialized/:id', isAuth, nurseController.editSpecialized);

// DELETE
router.delete('/patient/:id', isAuth, nurseController.deletePatient);

router.delete('/outpatient/:id', isAuth, nurseController.deleteOutPatient);

router.delete('/specialized/:id', isAuth, nurseController.deleteSpecialized);

module.exports = router;
