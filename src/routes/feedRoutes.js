const express = require("express");
const router = express.Router();
const apiMiddleWare = require("../middleware/apiMiddleWare");
const { getFeed } = require("../lib/services/feedServices");

router.get("/feed", apiMiddleWare(getFeed));

module.exports = router;
