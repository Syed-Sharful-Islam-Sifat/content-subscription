const { validator, Validator } = require("node-input-validator");
const HttpError = require("../helpers/HttpError");

const validateUserRegister = async (body) => {
  const rules = {
    userName: "required|string|minLength:3|maxLength:20",
    email: "required|email",
    password: "required|string|minLength:8|maxLength:100",
  };

  const validator = new Validator(body, rules);

  if (!(await validator.check())) {
    throw new HttpError({
      statusCode: 400,
      message: Object.values(validator.errors)[0].message,
    });
  }

  return true;
};

const validateUserLogin = async (body) => {
  const rules = {
    email: "required|email",
    password: "required|string|minLength:8|maxLength:100",
  };

  if (Object.values(body).length != Object.values(rules).length) {
    throw new HttpError({
      statusCode: 400,
      message: "Invalid request",
    });
  }
  const validator = new Validator(body, rules);

  if (!(await validator.check())) {
    throw new HttpError({
      statusCode: 400,
      message: Object.values(validator.errors)[0].message,
    });
  }

  return true;
};

module.exports = {
  validateUserRegister,
  validateUserLogin,
};
