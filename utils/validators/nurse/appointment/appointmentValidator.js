const { check } = require('express-validator');
const {
  validationMiddleWare,
} = require('../../../../middlewares/is-validator');

exports.getAppointmentValidator = [
  check('id').isInt().withMessage('ID must be an integer.'),
  validationMiddleWare,
];

exports.addAppointmentValidator = [
  check('status')
    .notEmpty()
    .withMessage('Status must not be empty.')
    .isInt({ min: 0, max: 2 })
    .withMessage('Status must be 0, 1 or 2.')
    .trim(),
  validationMiddleWare,
];

exports.updateAppointmentValidator = [
  check('id').isInt().withMessage('Appointment ID must be an integer.'),
  check('status')
    .isInt({ min: 0, max: 2 })
    .withMessage('Status must be 0, 1 or 2.')
    .optional()
    .trim(),
  validationMiddleWare,
];
