const { check } = require('express-validator');
const { validationMiddleWare } = require('../../../middlewares/is-validator');

exports.resetPasswordValidator = [
  check('email').isEmail().normalizeEmail().toLowerCase().trim(),
  check('password').trim(),
  validationMiddleWare,
];
