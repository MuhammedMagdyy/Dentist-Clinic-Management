const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const User = require('../models/user');
const Role = require('../models/role');
const resetPasswordPage = require('../views/html-reset-password');
const { generateCode } = require('../helpers/generateCode');

const transporter = nodemailer.createTransport(
  sendGridTransport({ auth: { api_key: process.env.SENDGRID_API_KEY } })
);

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, attributes: ['name'] }],
    });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id,
        roleId: user.roleId,
        roleName: user.role.name,
      },
      process.env.JWT_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(200).json({
      message: 'Logged in successfully',
      token: token,
      userId: user.id,
      roleId: user.roleId,
      roleName: user.role.name,
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const code = generateCode();
    user.verificationCode = code;
    await user.save();
    transporter.sendMail({
      to: email,
      from: process.env.SENDGRID_EMAIL,
      subject: 'Reset Password',
      html: resetPasswordPage.getEmail(code),
    });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    throw new Error(err);
  }
};

exports.verifyCode = async (req, res) => {
  const { email, verificationCode } = req.body;
  try {
    const user = await User.findOne({ where: { email, verificationCode } });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.status(200).json({
      message: 'Code verified successfully, please reset your password',
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.verificationCode = null;
    await user.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    throw new Error(err);
  }
};
