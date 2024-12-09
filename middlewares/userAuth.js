const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send({
      code: 0,
      message: "Auth token required",
    });
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({
        code: 0,
        message: "Token expired",
      });
    }
    req.user = user.authClaims;
    next();
  });
};

module.exports = { authenticateToken };
