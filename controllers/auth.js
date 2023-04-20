const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

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
        expiresIn: '1h',
      }
    );
    res.status(200).json({
      message: 'success',
      status: 200,
      token: token,
      userId: user.id,
      roleId: user.roleId,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.resetPassword = (req, res, next) => {
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
          subject: 'Password Reset',
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
          `,
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    where: {
      resetToken: token,
      resetTokenExpiration: {
        [Op.gt]: Date.now(),
      },
    },
  })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'error',
          status: 404,
        });
      }
      res.status(200).json({
        message: 'success',
        status: 200,
        userId: user.id,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.newPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  let resetUser;
  User.findOne({
    where: {
      id: userId,
    },
  })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = null;
      resetUser.resetTokenExpiration = null;
      return resetUser.save();
    })
    .then(result => {
      res.status(200).json({
        message: 'success',
        status: 200,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
