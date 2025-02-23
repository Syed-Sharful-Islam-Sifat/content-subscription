const Category = require("../../models/Categories");
const getCommonRepository = require("./commonRepository");

const categoryRepositroy = {
  ...getCommonRepository(Category),
};

module.exports = categoryRepositroy;
