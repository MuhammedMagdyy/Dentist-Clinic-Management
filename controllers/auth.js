const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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
      'dentist-clinic-secret',
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
