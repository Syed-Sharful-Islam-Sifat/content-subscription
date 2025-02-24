require("dotenv").config();
const axios = require("axios");
const apiRoutes = {
  getContentFromNewsApi: async (category) =>
    await axios.get(
      `https://api.thenewsapi.com/v1/news/all?api_token=${
        process.env.API_TOKEN
      }&limit=10&categories=${category.toLowerCase()}`
    ),
};

module.exports = apiRoutes;
