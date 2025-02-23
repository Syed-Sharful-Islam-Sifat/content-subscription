const HttpError = require("../helpers/HttpError");
const userRepository = require("../repository/userRepository");
const {
  validateUserRegister,
  validateUserLogin,
} = require("../validators/UserValidator");
const bcrypt = require("bcryptjs");
const { generateToken } = require("./tokenServices");
exports.registerUser = async (req, res) => {
  await validateUserRegister(req.body);

  const { userName, email, password } = req.body;

  const [isEmailExists, isUserNameExists] = await Promise.all([
    userRepository.findOne({
      query: { email },
      select: {
        email,
      },
    }),
    userRepository.findOne({
      query: {
        userName,
      },
      select: {
        userName,
      },
    }),
  ]);

  if (isEmailExists) {
    throw new HttpError({
      statusCode: 400,
      message: "Please use a different email. This email already exists",
    });
  }

  if (isUserNameExists) {
    throw new HttpError({
      statusCode: 400,
      message: "This username has already been taken",
    });
  }

  res.message = "User has been created successfully";
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = userRepository.createUser({
    userName,
    email,
    hashedPassword,
  });

  if (!newUser) {
    throw new HttpError({
      statusCode: 500,
      message: "Internal server error",
    });
  }
  res.message = "User has been created successfully";
  return;
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  await validateUserLogin(req.body);

  user = await userRepository.findOne({
    query: {
      email,
    },
  });

  const matchedPassword = await bcrypt.compare(password, user?.password);

  if (!user || !matchedPassword) {
    throw new HttpError({
      statusCode: 401,
      message: "Invalid credentials",
    });
  }

  const token = generateToken({
    user: {
      id: user._id,
      email: user.email,
    },
  });

  res.message = "User has logged in successfully";
  return {
    accessToken: token,
  };
};
