const express = require("express");
const router = express.Router();
const apiMiddleWare = require("../middleware/apiMiddleWare");
const {
  getCategory,
  subscribeToCategory,
} = require("../lib/services/categoryServices");

router.get("/category", apiMiddleWare(getCategory));

router.post("/category/subscribe", apiMiddleWare(subscribeToCategory));

module.exports = router;
