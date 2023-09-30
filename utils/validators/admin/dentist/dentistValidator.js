const { check } = require('express-validator');
const {
  validationMiddleWare,
} = require('../../../../middlewares/is-validator');

exports.getDentistValidator = [
  check('id').isInt().withMessage('Dentist ID must be an integer.'),
  validationMiddleWare,
];

exports.addDentistValidator = [
  check('name')
    .notEmpty()
    .withMessage('Clinic name must not be empty.')
    .isLength({ min: 3 })
    .withMessage('Dentist name must be at least 3 characters long.')
    .trim(),
  check('email')
    .notEmpty()
    .withMessage('Email must not be empty.')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email.')
    .trim(),
  check('phone')
    .notEmpty()
    .withMessage('Phone number must not be empty.')
    .isLength({ min: 11 })
    .withMessage('Phone number must be at least 11 characters long.')
    .isLength({ max: 11 })
    .withMessage('Phone number must be at most 11 characters long.')
    .matches(/^01[0-2,5]{1}[0-9]{8}$/)
    .withMessage('Please enter a valid phone number.')
    .trim(),
  check('nationalId')
    .notEmpty()
    .withMessage('National ID must not be empty.')
    .isLength({ min: 14 })
    .withMessage('National ID must be at least 14 characters long.')
    .isLength({ max: 14 })
    .withMessage('National ID must be at most 14 characters long.')
    .trim(),
  check('worksIn').notEmpty().withMessage('Works in must not be empty.').trim(),
  validationMiddleWare,
];

exports.updateDentistValidator = [
  check('id').isInt().withMessage('Dentist ID must be an integer.'),
  check('name')
    .isLength({ min: 3 })
    .withMessage('Dentist name must be at least 3 characters long.')
    .optional()
    .trim(),
  check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email.')
    .optional()
    .trim(),
  check('phone')
    .isLength({ min: 11 })
    .withMessage('Phone number must be at least 11 characters long.')
    .isLength({ max: 11 })
    .withMessage('Phone number must be at most 11 characters long.')
    .matches(/^01[0-2,5]{1}[0-9]{8}$/)
    .withMessage('Please enter a valid phone number.')
    .optional()
    .trim(),
  check('nationalId')
    .isLength({ min: 14 })
    .withMessage('National ID must be at least 14 characters long.')
    .isLength({ max: 14 })
    .withMessage('National ID must be at most 14 characters long.')
    .optional()
    .trim(),
  check('worksIn')
    .notEmpty()
    .withMessage('Works in must not be empty.')
    .optional()
    .trim(),
  validationMiddleWare,
];

exports.deleteDentistValidator = [
  check('id').isInt().withMessage('Dentist ID must be an integer.'),
  validationMiddleWare,
];
