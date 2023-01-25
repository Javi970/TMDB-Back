const { validateToken } = require("../config/token");
const validateUser = (req, res, next) => {
  const { token } = req.body;
  if (!token) return res.send(400);
  const { user } = validateToken(token);
  if (!user) return res.send(400);

  req.user = user;
  next();
};

module.exports = validateUser;