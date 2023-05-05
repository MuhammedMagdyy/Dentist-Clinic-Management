const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const isAuth = require('../middlewares/is-auth');
const { body } = require('express-validator');
const { validationMiddleWare } = require('../middlewares/is-validator');

router.post('/reset/:token', authController.resetPassword);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().trim().notEmpty(),
    body('password').trim().isLength({ min: 5 }).notEmpty(),
  ],
  validationMiddleWare,
  authController.login
);

router.post('/reset', authController.forgetPassword);

router.post('/change-password', isAuth, authController.changePassword);

module.exports = router;
