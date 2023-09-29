const { check } = require('express-validator');
const {
  validationMiddleWare,
} = require('../../../../middlewares/is-validator');

exports.getClinicValidator = [
  check('id').isInt().withMessage('Clinic ID must be an integer.'),
  validationMiddleWare,
];

exports.addClinicValidator = [
  check('name')
    .notEmpty()
    .withMessage('Clinic name must not be empty.')
    .isLength({ min: 3 })
    .withMessage('Clinic name must be at least 3 characters long.')
    .isLength({ max: 20 })
    .withMessage('Clinic name must be at most 20 characters long.')
    .trim(),
  validationMiddleWare,
];

exports.updateClinicValidator = [
  check('id').isInt().withMessage('Clinic ID must be an integer.'),
  check('name')
    .isLength({ min: 3 })
    .withMessage('Clinic name must be at least 3 characters long.')
    .isLength({ max: 20 })
    .withMessage('Clinic name must be at most 20 characters long.')
    .optional()
    .trim(),
  validationMiddleWare,
];

exports.deleteClinicValidator = [
  check('id').isInt().withMessage('Clinic ID must be an integer.'),
  validationMiddleWare,
];
