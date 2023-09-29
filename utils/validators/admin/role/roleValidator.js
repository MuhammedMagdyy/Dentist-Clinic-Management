const { check } = require('express-validator');
const {
  validationMiddleWare,
} = require('../../../../middlewares/is-validator');

exports.getRoleValidator = [
  check('id').isInt().withMessage('Role ID must be an integer.'),
  validationMiddleWare,
];

exports.addRoleValidator = [
  check('name')
    .notEmpty()
    .withMessage('Role name must not be empty.')
    .isLength({ min: 3 })
    .withMessage('Role name must be at least 3 characters long.')
    .isLength({ max: 20 })
    .withMessage('Role name must be at most 20 characters long.')
    .trim(),
  validationMiddleWare,
];

exports.updateRoleValidator = [
  check('id').isInt().withMessage('Role ID must be an integer.'),
  check('name')
    .isLength({ min: 3 })
    .withMessage('Role name must be at least 3 characters long.')
    .isLength({ max: 20 })
    .withMessage('Role name must be at most 20 characters long.')
    .optional()
    .trim(),
  validationMiddleWare,
];

exports.deleteRoleValidator = [
  check('id').isInt().withMessage('Role ID must be an integer.'),
  validationMiddleWare,
];
