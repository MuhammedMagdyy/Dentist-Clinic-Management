const { check } = require('express-validator');
const {
  validationMiddleWare,
} = require('../../../../middlewares/is-validator');

exports.getPatientValidator = [
  check('id').isInt().withMessage('Patient ID must be an integer.'),
  validationMiddleWare,
];

exports.addPatientValidator = [
  check('name')
    .notEmpty()
    .withMessage('Patient name must not be empty.')
    .isLength({ min: 3 })
    .withMessage('Patient name must be at least 3 characters long.')
    .isLength({ max: 50 })
    .withMessage('Patient name must not exceed 50 characters.')
    .matches(/^[a-zA-Z ]*$/)
    .withMessage('Patient name must contain only letters and spaces.')
    .trim(),
  check('age')
    .notEmpty()
    .withMessage('Patient age must not be empty.')
    .isInt({ min: 1 })
    .withMessage('Patient age must be at least 1 year old.')
    .isInt({ max: 120 })
    .withMessage('Patient age must not exceed 120 years old.')
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
  check('gender').notEmpty().withMessage('gender must not be empty.').trim(),
  check('address')
    .notEmpty()
    .withMessage('Address must not be empty.')
    .isLength({ min: 2 })
    .withMessage('Address must be at least 2 characters long.')
    .isLength({ max: 70 })
    .withMessage('Address must not exceed 50 characters.')
    .trim(),
  check('city')
    .notEmpty()
    .withMessage('City must not be empty.')
    .isLength({ min: 2 })
    .withMessage('City must be at least 2 characters long.')
    .isLength({ max: 50 })
    .withMessage('City must not exceed 50 characters.')
    .trim(),
  check('nationalId')
    .notEmpty()
    .withMessage('National ID must not be empty.')
    .isLength({ min: 14 })
    .withMessage('National ID must be at least 14 characters long.')
    .isLength({ max: 14 })
    .withMessage('National ID must be at most 14 characters long.')
    .trim(),
  check('nationality')
    .notEmpty()
    .withMessage('Nationality must not be empty.')
    .isLength({ min: 2 })
    .withMessage('Nationality must be at least 2 characters long.')
    .isLength({ max: 50 })
    .withMessage('Nationality must not exceed 50 characters.')
    .trim(),
  check('maritalStatus')
    .notEmpty()
    .withMessage('Marital status must not be empty.')
    .trim(),
  check('occupation')
    .notEmpty()
    .withMessage('Occupation must not be empty.')
    .isLength({ min: 2 })
    .withMessage('Occupation must be at least 2 characters long.')
    .isLength({ max: 50 })
    .withMessage('Occupation must not exceed 50 characters.')
    .trim(),
  validationMiddleWare,
];

exports.updatePatientValidator = [
  check('id').isInt().withMessage('Patient ID must be an integer.'),
  check('name')
    .isLength({ min: 3 })
    .withMessage('Patient name must be at least 3 characters long.')
    .isLength({ max: 50 })
    .withMessage('Patient name must not exceed 50 characters.')
    .matches(/^[a-zA-Z ]*$/)
    .withMessage('Patient name must contain only letters and spaces.')
    .optional()
    .trim(),
  check('age')
    .isInt({ min: 1 })
    .withMessage('Patient age must be at least 1 year old.')
    .isInt({ max: 120 })
    .withMessage('Patient age must not exceed 120 years old.')
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
  check('address')
    .isLength({ min: 2 })
    .withMessage('Address must be at least 2 characters long.')
    .isLength({ max: 70 })
    .withMessage('Address must not exceed 50 characters.')
    .optional()
    .trim(),
  check('city')
    .isLength({ min: 2 })
    .withMessage('City must be at least 2 characters long.')
    .isLength({ max: 50 })
    .withMessage('City must not exceed 50 characters.')
    .optional()
    .trim(),
  check('nationalId')
    .isLength({ min: 14 })
    .withMessage('National ID must be at least 14 characters long.')
    .isLength({ max: 14 })
    .withMessage('National ID must be at most 14 characters long.')
    .optional()
    .trim(),
  check('nationality')
    .isLength({ min: 2 })
    .withMessage('Nationality must be at least 2 characters long.')
    .isLength({ max: 50 })
    .withMessage('Nationality must not exceed 50 characters.')
    .optional()
    .trim(),
  check('occupation')
    .isLength({ min: 2 })
    .withMessage('Occupation must be at least 2 characters long.')
    .isLength({ max: 50 })
    .withMessage('Occupation must not exceed 50 characters.')
    .optional()
    .trim(),
  validationMiddleWare,
];

exports.deletePatientValidator = [
  check('id').isInt().withMessage('Patient ID must be an integer.'),
  validationMiddleWare,
];
