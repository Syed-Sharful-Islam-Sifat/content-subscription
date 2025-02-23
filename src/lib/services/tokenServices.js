require("dotenv").config();

const jwt = require("jsonwebtoken");
const generateToken = ({ user }) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = {
  generateToken,
  verifyToken,
};
