const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');
const { loginValidator } = require('../utils/validators/auth/loginValidator');
const {
  forgotPasswordValidator,
} = require('../utils/validators/auth/forgotPasswordValidator');
const {
  verifyCodeValidator,
} = require('../utils/validators/auth/verifyCodeValidator');
const {
  resetPasswordValidator,
} = require('../utils/validators/auth/resetPasswordValidator');

router.post('/login', loginValidator, authController.login);
router.post(
  '/forgot-password',
  forgotPasswordValidator,
  authController.forgetPassword
);
router.post('/verify-code', verifyCodeValidator, authController.verifyCode);
router.post(
  '/reset-password',
  resetPasswordValidator,
  authController.resetPassword
);

module.exports = router;
