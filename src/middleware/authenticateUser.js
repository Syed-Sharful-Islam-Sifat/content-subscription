const { default: mongoose } = require("mongoose");
const HttpError = require("../lib/helpers/HttpError");
const userRepository = require("../lib/repository/userRepository");
const { verifyToken } = require("../lib/services/tokenServices");

const authenticateUser = async (req) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    throw new HttpError({ statusCode: 401, message: "Access denied!" });
  }

  const user = verifyToken(token);

  if (!user) {
    throw new HttpError({
      statusCode: 401,
      message: "Invalid token or session has been expired",
    });
  }

  const isUserExists = await userRepository.findById({
    id: user.id,
    select: "name _id",
  });

  if (!isUserExists || isUserExists._id != user.id) {
    throw new HttpError({ statusCode: 401, message: "User does not exist." });
  }
  req.user = user;
  return true;
};

module.exports = authenticateUser;
