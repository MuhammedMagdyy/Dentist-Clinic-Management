const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({
      message: 'error',
      status: 401,
    });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    return res.status(500).json({
      message: 'error',
      status: 500,
    });
  }
  if (!decodedToken) {
    return res.status(401).json({
      message: 'error',
      status: 401,
    });
  }
  req.userId = decodedToken.userId;
  req.roleId = decodedToken.roleId;
  next();
};
