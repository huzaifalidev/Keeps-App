const Users = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (!name || !email || !password) {
      return res.status(404).json({ message: "please fill all the details" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new Users({
      name,
      email,
      password: hashPassword,
    });
    const savedUser = await user.save();
    res.status(201).json({
      message: "User Created Successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await Users.findOne({ email });
    if (!userFound) {
      return res.status(404).json({ message: "user nof found" });
    }
    await bcrypt.compare(password, userFound.password);
    const token = jwt.sign(
      { id: userFound.id, email: userFound.email },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );
    res.status(200).json({
      message: "Login successful",
      user: userFound,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
module.exports = { userSignUp, userSignIn };
