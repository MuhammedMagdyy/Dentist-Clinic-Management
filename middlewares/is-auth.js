const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  if (!decodedToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.userId = decodedToken.userId;
  req.roleId = decodedToken.roleId;
  req.roleName = decodedToken.roleName;
  next();
};
