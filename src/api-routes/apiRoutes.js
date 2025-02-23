require("dotenv").config();
const axios = require("axios");
const apiRoutes = {
  getContentFromNewsApi: async (category) =>
    await axios.get(
      `https://newsapi.org/v2/everything?q=${category}&from=2025-01-23&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
    ),
};

module.exports = apiRoutes;
