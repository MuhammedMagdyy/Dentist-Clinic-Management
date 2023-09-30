const express = require('express');

const router = express.Router();
const nurseController = require('../controllers/nurse');
const isAuth = require('../middlewares/is-auth');
const {
  getPatientValidator,
  addPatientValidator,
  updatePatientValidator,
  deletePatientValidator,
} = require('../utils/validators/nurse/patient/patientValidator');
const {
  getOutPatientValidator,
  addOutPatientValidator,
  updateOutPatientValidator,
  deleteOutPatientValidator,
} = require('../utils/validators/nurse/outpatient/outpatientValidator');
const {
  getSpecializedValidator,
  addSpecializedValidator,
  updateSpecializedValidator,
  deleteSpecializedValidator,
} = require('../utils/validators/nurse/specialized/specializedValidator');
const {
  getAppointmentValidator,
  addAppointmentValidator,
  updateAppointmentValidator,
} = require('../utils/validators/nurse/appointment/appointmentValidator');

// GET
router.get('/patients', isAuth, nurseController.getAllPatients);
router.get(
  '/patients/:id',
  isAuth,
  getPatientValidator,
  nurseController.getPatient
);
router.get('/patientId/:id', isAuth, nurseController.getPatientId);

router.get('/outpatients', isAuth, nurseController.getAllOutPatients);
router.get(
  '/outpatients/:id',
  isAuth,
  getOutPatientValidator,
  nurseController.getOutPatient
);

router.get('/specializes', isAuth, nurseController.getAllSpecialized);
router.get(
  '/specializes/:id',
  isAuth,
  getSpecializedValidator,
  nurseController.getSpecialized
);

router.get('/medical-history/:id', isAuth, nurseController.getAllPatientData);

router.get(
  '/appoitments/patient/:id',
  isAuth,
  getAppointmentValidator,
  nurseController.getAppointment
);
router.get(
  '/appoitments/clinic/:id',
  isAuth,
  getAppointmentValidator,
  nurseController.getAppointmentClinic
);

router.get('/summary', isAuth, nurseController.getSummary);

// POST
router.post(
  '/patients',
  isAuth,
  addPatientValidator,
  nurseController.addPatient
);

router.post(
  '/outpatients',
  isAuth,
  addOutPatientValidator,
  nurseController.addOutPatient
);

router.post(
  '/specializes',
  isAuth,
  addSpecializedValidator,
  nurseController.addSpecialized
);

router.post(
  '/appointments',
  isAuth,
  addAppointmentValidator,
  nurseController.addAppointment
);

// PUT
router.put(
  '/patients/:id',
  isAuth,
  updatePatientValidator,
  nurseController.editPatient
);

router.put(
  '/outpatients/:id',
  isAuth,
  updateOutPatientValidator,
  nurseController.editOutPatient
);

router.put(
  '/specializes/:id',
  isAuth,
  updateSpecializedValidator,
  nurseController.editSpecialized
);

router.put(
  '/appointments/transferedTo/:id',
  isAuth,
  nurseController.editAppointment
);
router.put(
  '/appointments/status/:id',
  isAuth,
  updateAppointmentValidator,
  nurseController.editStatus
);

// DELETE
router.delete(
  '/patients/:id',
  isAuth,
  deletePatientValidator,
  nurseController.deletePatient
);

router.delete(
  '/outpatients/:id',
  isAuth,
  deleteOutPatientValidator,
  nurseController.deleteOutPatient
);

router.delete(
  '/specializes/:id',
  isAuth,
  deleteSpecializedValidator,
  nurseController.deleteSpecialized
);

module.exports = router;
