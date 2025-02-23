const { Validator } = require("node-input-validator");
const HttpError = require("../helpers/HttpError");

const validateId = async (id) => {
  const rules = {
    id: "required|mongoId",
  };

  const validator = new Validator({ id }, rules);

  if (!(await validator.check())) {
    throw new HttpError({
      statusCode: 400,
      message: Object.values(validator.errors)[0].message,
    });
  }

  return true;
};

module.exports = {
  validateId,
};
