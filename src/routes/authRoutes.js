const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../lib/services/userServices");
const apiMiddleWare = require("../middleware/apiMiddleWare");

router.post("/auth/register", apiMiddleWare(registerUser));

router.post("/auth/login", apiMiddleWare(loginUser));

module.exports = router;
