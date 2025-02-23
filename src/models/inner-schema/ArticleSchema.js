const { default: mongoose } = require("mongoose");

const articleSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },

  content: {
    type: String,
    required: true,
  },
});

module.exports = articleSchema;
