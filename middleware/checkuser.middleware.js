
const checkUserRole = (role) => {
    return (req, res, next) => {
      if (req.user && req.user.roles && req.user.roles.includes(role)) {
        next();
      } else {
        res.status(403).json({ error: 'Forbidden' });
      }
    };
  };
  
  module.exports = {
    checkUserRole,
  };