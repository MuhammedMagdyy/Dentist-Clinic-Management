const { validationResult } = require('express-validator');

function validationMiddleWare(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error('Validation failed, entered data is incorrect.');
  }
  next();
}

module.exports = {
  validationMiddleWare,
};
