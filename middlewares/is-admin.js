module.exports = (req, res, next) => {
  if (req.roleId === 11) {
    next();
  } else {
    return res.status(405).json({
      message: 'error',
      status: 405,
    });
  }
};
