const Role = require('../models/role');
const User = require('../models/user');

exports.initDB = async () => {
  const roleCount = await Role.count();
  const userCount = await User.count();
  if (roleCount > 0 || userCount > 0) {
    return;
  }
  const role = await Role.create({ name: process.env.ADMIN_ROLE });
  await User.create({
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    roleId: role.id,
  });
};
