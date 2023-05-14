const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nurse');
const { body } = require('express-validator');
const isAuth = require('../middlewares/is-auth');
const { validationMiddleWare } = require('../middlewares/is-validator');

// GET
router.get('/all-patients', isAuth, nurseController.getAllPatients);
router.get('/patient/:id', isAuth, nurseController.getPatient);
router.get('/patientId/:id', isAuth, nurseController.getPatientId);

router.get('/all-outpatients', isAuth, nurseController.getAllOutPatients);
router.get('/outpatient/:id', isAuth, nurseController.getOutPatient);

router.get('/all-specialized', isAuth, nurseController.getAllSpecialized);
router.get('/specialized/:id', isAuth, nurseController.getSpecialized);

router.get('/patient-data/:id', isAuth, nurseController.getAllPatientData);

router.get('/appoitment/patient/:id', isAuth, nurseController.getAppointment);
router.get(
  '/appoitment/clinic/:id',
  isAuth,
  nurseController.getAppointmentClinic
);

// POST
router.post(
  '/add-patient',
  [
    body('name').trim().notEmpty(),
    body('age').trim().notEmpty().isNumeric(),
    body('phone').trim().notEmpty().isNumeric(),
    body('gender').trim().notEmpty(),
    body('address').trim().notEmpty(),
    body('city').trim().notEmpty(),
    body('national_id').trim().notEmpty().isNumeric().isLength({ min: 14 }),
    body('nationality').trim().notEmpty(),
    body('marital_status').trim().notEmpty(),
    body('occupation').trim().notEmpty(),
  ],
  validationMiddleWare,
  isAuth,
  nurseController.addPatient
);

router.post(
  '/add-outpatient',
  [
    body('chief_complaint').trim().notEmpty(),
    body('medical_history').trim().notEmpty(),
    body('diagnosis').trim().notEmpty(),
    body('extra_oral').trim().notEmpty(),
    body('intra_oral').trim().notEmpty(),
    body('upper_right').trim().notEmpty().isNumeric(),
    body('upper_left').trim().notEmpty().isNumeric(),
    body('down_right').trim().notEmpty().isNumeric(),
    body('down_left').trim().notEmpty().isNumeric(),
    body('patientId').trim().notEmpty().isNumeric(),
    body('dentistId').trim().notEmpty().isNumeric(),
    body('transferedId').trim().notEmpty().isNumeric(),
  ],
  validationMiddleWare,
  isAuth,
  nurseController.addOutPatient
);

router.post(
  '/add-specialized',
  [
    body('examination').trim().notEmpty(),
    body('treatment').trim().notEmpty(),
    body('patientId').trim().notEmpty().isNumeric(),
    body('dentistId').trim().notEmpty().isNumeric(),
    body('clinicId').trim().notEmpty().isNumeric(),
    body('diagnosis').trim().notEmpty(),
    body('radiographic_exam').trim().notEmpty(),
    body('treatment_plant').trim().notEmpty(),
  ],
  validationMiddleWare,
  isAuth,
  nurseController.addSpecialized
);

router.post('/add-appointment', isAuth, nurseController.addAppointment);

// PUT
router.put('/patient/:id', isAuth, nurseController.editPatient);

router.put('/outpatient/:id', isAuth, nurseController.editOutPatient);

router.put('/specialized/:id', isAuth, nurseController.editSpecialized);

router.put(
  '/appointment/transferedTo/:id',
  isAuth,
  nurseController.editAppointment
);
router.put('/appointment/status/:id', isAuth, nurseController.editStatus);

// DELETE
router.delete('/patient/:id', isAuth, nurseController.deletePatient);

router.delete('/outpatient/:id', isAuth, nurseController.deleteOutPatient);

router.delete('/specialized/:id', isAuth, nurseController.deleteSpecialized);

module.exports = router;
