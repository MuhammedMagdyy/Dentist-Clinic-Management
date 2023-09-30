const { check } = require('express-validator');
const { validationMiddleWare } = require('../../../middlewares/is-validator');

exports.forgotPasswordValidator = [
  check('email').isEmail().normalizeEmail().toLowerCase().trim(),
  validationMiddleWare,
];
