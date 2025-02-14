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
      return res.status(404).json({ message: "user not found" });
    }
    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: userFound.id, email: userFound.email },
      process.env.SECRET_KEY
    );
    res.status(200).json({
      message: "Login successful",
      _id: userFound._id,
      name: userFound.name,
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
