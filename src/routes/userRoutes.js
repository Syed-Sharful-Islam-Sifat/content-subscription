const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../lib/services/userServices");
const apiMiddleWare = require("../middleware/apiMiddleWare");

router.post("/register", apiMiddleWare(registerUser));

router.post("/login", apiMiddleWare(loginUser));

module.exports = router;
