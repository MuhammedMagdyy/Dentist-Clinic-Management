const { check } = require('express-validator');
const {
  validationMiddleWare,
} = require('../../../../middlewares/is-validator');

exports.getUserValidator = [
  check('id').isInt().withMessage('User ID must be an integer.'),
  validationMiddleWare,
];

exports.addUserValidator = [
  check('name')
    .notEmpty()
    .withMessage('Name must not be empty.')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long.')
    .isLength({ max: 32 })
    .withMessage('Nser name must be at most 32 characters long.')
    .trim(),
  check('email')
    .notEmpty()
    .withMessage('Email must not be empty.')
    .isEmail()
    .normalizeEmail()
    .withMessage('Enter a valid email.')
    .trim(),
  check('password')
    .notEmpty()
    .withMessage('Password must not be empty.')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .isLength({ max: 32 })
    .withMessage('Password must be at most 32 characters long.')
    .trim(),
  validationMiddleWare,
];

exports.updateUserValidator = [
  check('id').isInt().withMessage('User ID must be an integer.'),
  check('name')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long.')
    .isLength({ max: 32 })
    .withMessage('Name must be at most 32 characters long.')
    .optional()
    .trim(),
  check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Enter a valid email.')
    .optional()
    .trim(),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .isLength({ max: 32 })
    .withMessage('Password must be at most 32 characters long.')
    .optional()
    .trim(),
  validationMiddleWare,
];

exports.deleteUserValidator = [
  check('id').isInt().withMessage('User ID must be an integer.'),
  validationMiddleWare,
];