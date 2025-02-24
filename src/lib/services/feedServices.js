const apiRoutes = require("../../api-routes/apiRoutes");
const userRepository = require("../repository/userRepository");
const axios = require("axios");

const getFeed = async (req, res) => {
  const { id } = req.user;
  const { subscribedCategories } =
    await userRepository.findSubscribedCategoriesWithDetails(id);

  let articles = [];
  try {
    for (category of subscribedCategories) {
      const result = await apiRoutes.getContentFromNewsApi(category.name);
      const { data } = result;
      articles.push(...data.data);
    }
  } catch (error) {
    articles = [];
    for (category of subscribedCategories) {
      articles.push(...category.articles);
    }
  }
  return {
    totalCount: articles.length,
    articles,
  };
};

module.exports = {
  getFeed,
};
