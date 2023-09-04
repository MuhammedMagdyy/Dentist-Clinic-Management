const User = require('../models/user');
const Role = require('../models/role');

module.exports = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const nurse = await Role.findOne({
    where: { name: 'nurse' },
  });
  const admin = await Role.findOne({
    where: { name: 'admin' },
  });
  if (user.roleId === nurse.id || user.roleId === admin.id) {
    next();
  } else {
    return res.status(403).json({ message: 'forbidden' });
  }
};
