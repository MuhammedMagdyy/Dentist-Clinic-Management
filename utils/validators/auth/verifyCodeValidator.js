const { check } = require('express-validator');
const { validationMiddleWare } = require('../../../middlewares/is-validator');

exports.verifyCodeValidator = [
  check('email').isEmail().normalizeEmail().toLowerCase().trim(),
  check('verificationCode').trim(),
  validationMiddleWare,
];
