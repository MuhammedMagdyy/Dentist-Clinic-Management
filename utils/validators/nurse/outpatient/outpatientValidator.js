const { check } = require('express-validator');
const {
  validationMiddleWare,
} = require('../../../../middlewares/is-validator');

exports.getOutPatientValidator = [
  check('id').isInt().withMessage('Outpatient ID must be an integer.'),
  validationMiddleWare,
];

exports.addOutPatientValidator = [
  check('chiefComplaint')
    .notEmpty()
    .withMessage('Chief Complaint must not be empty.')
    .trim(),
  check('medicalHistory')
    .notEmpty()
    .withMessage('Medical History must not be empty.')
    .trim(),
  check('diagnosis')
    .notEmpty()
    .withMessage('Diagnosis must not be empty.')
    .trim(),
  check('extraOral')
    .notEmpty()
    .withMessage('Extra Oral must not be empty.')
    .trim(),
  check('intraOral')
    .notEmpty()
    .withMessage('Intra Oral must not be empty.')
    .trim(),
  check('upperRight')
    .notEmpty()
    .withMessage('Upper Right must not be empty.')
    .trim(),
  check('upperLeft')
    .notEmpty()
    .withMessage('Upper Left must not be empty.')
    .trim(),
  check('downRight')
    .notEmpty()
    .withMessage('Down Right must not be empty.')
    .trim(),
  check('downLeft')
    .notEmpty()
    .withMessage('Down Left must not be empty.')
    .trim(),
  validationMiddleWare,
];

exports.updateOutPatientValidator = [
  check('id').isInt().withMessage('Outpatient ID must be an integer.'),
  check('chiefComplaint')
    .optional()
    .trim(),
  check('medicalHistory')
    .optional()
    .trim(),
  check('diagnosis')
    .optional()
    .trim(),
  check('extraOral')
    .optional()
    .trim(),
  check('intraOral')
    .optional()
    .trim(),
  check('upperRight')
    .optional()
    .trim(),
  check('upperLeft')
    .optional()
    .trim(),
  check('downRight')
    .optional()
    .trim(),
  check('downLeft')
    .optional()
    .trim(),
  validationMiddleWare,
];

exports.deleteOutPatientValidator = [
  check('id').isInt().withMessage('Outpatient ID must be an integer.'),
  validationMiddleWare,
];
