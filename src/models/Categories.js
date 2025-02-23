const { default: mongoose } = require("mongoose");
const articleSchema = require("./inner-schema/ArticleSchema")
categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  articles: [articleSchema],
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

module.exports = Category;
