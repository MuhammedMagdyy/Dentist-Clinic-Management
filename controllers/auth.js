const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const { Op } = require('sequelize');
const resetPasswordPage = require('../views/html-reset-password');

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id,
        roleId: user.roleId,
      },
      process.env.JWT_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.status(200).json({
      message: 'success',
      status: 200,
      token: token,
      userId: user.id,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.forgetPassword = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return res.status(404).json({
        message: 'error',
        status: 404,
      });
    }
    const token = buffer.toString('hex');
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then(user => {
        if (!user) {
          return res.status(404).json({
            message: 'error',
            status: 404,
          });
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        res.status(200).json({
          message: 'success',
          status: 200,
        });
        transporter.sendMail({
          to: req.body.email,
          from: process.env.SENDGRID_EMAIL,
          subject: 'Reset Password',
          html: resetPasswordPage.getEmail(token),
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

exports.resetPassword = (req, res, next) => {
  const token = req.params.token;
  const password = req.body.password;
  User.findOne({
    where: {
      resetToken: token,
      resetTokenExpiration: {
        [Op.gt]: Date.now(),
      },
    },
  })
    .then(async user => {
      console.log(user);
      if (!user) {
        return res.status(404).json({
          message: 'error',
          status: 404,
        });
      }
      let hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpiration = null;
      user.save();
      return res.status(200).json({
        message: 'success',
        status: 200,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.changePassword = (req, res, next) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.password;
  const userId = req.userId;
  User.findOne({
    where: {
      id: userId,
    },
  })
    .then(async user => {
      const isEqual = await bcrypt.compare(currentPassword, user.password);
      if (!isEqual) {
        return res.status(401).json({
          message: 'error',
          status: 401,
        });
      }
      let hashedPassword = await bcrypt.hash(newPassword, 12);
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpiration = null;
      user.save();
      return res.status(200).json({
        message: 'success',
        status: 200,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
