const { validationResult } = require('express-validator');

function validationMiddleWare(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ errors: errors.array().map(error => error.msg) });
  }
  next();
}

module.exports = { validationMiddleWare };
