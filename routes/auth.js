const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/reset/:token', authController.getNewPassword);

router.post('/login', authController.login);

router.post('/reset', authController.resetPassword);

router.post('/new-password', authController.newPassword);

module.exports = router;
