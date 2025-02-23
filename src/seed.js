const { default: mongoose } = require("mongoose");
const Category = require("./models/Categories");
const data = require("./lib/stubData/category");
const ensureDBConnection = require("./config/db");

const seedData = async () => {
  try {
    await ensureDBConnection();
    await Category.insertMany(data);

    console.log("data imported");
  } catch (error) {
    console.log(error);
  }
};

seedData();
