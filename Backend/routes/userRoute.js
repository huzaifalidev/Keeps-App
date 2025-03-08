const express = require("express");
const router = express.Router();
const { userSignIn, userSignUp } = require("../controllers/User");

// Sign In Route
router.post("/signIn", userSignIn);
router.post("/signUp", userSignUp);

module.exports = router;
