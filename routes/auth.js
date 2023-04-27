const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const isAuth = require('../middlewares/is-auth');

router.post('/reset/:token', authController.resetPassword);

router.post('/login', authController.login);

router.post('/reset', authController.forgetPassword);

router.post('/change-password', isAuth, authController.changePassword);

module.exports = router;
