const User = require('../models/user');
const Role = require('../models/role');

module.exports = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const admin = await Role.findOne({
    where: { name: 'admin' },
  });
  if (user.roleId === admin.id) {
    next();
  } else {
    return res.status(403).json({ message: 'forbidden' });
  }
};
