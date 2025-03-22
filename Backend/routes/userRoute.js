const express = require("express");
const router = express.Router();

const { userSignUp, userLogin } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signUp", userSignUp);
router.post("/signIn", userLogin);

router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the dashboard!", userId: req.userId });
});

module.exports = router;
