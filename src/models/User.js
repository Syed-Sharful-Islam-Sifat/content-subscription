const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
  },

  subscribedCategories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
