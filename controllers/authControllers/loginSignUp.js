const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup
exports.signup = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 11);
    const { name, username, email, password, profile } = req.body;

    const user = await User.create({
      name,
      username,
      email,
      password,
      profile
    });

    res.status(201).json({
      message: `Hello ${user?.name}! Your account has been created`,
      user
    });
  } catch (error) {
    res.status(401).json({
      message: "Something went wrong!",
      error
    });
  }
};

// Login
exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Wrong credential"
      });
    }

    const validated = await bcrypt.compare(password, user.password);
    if (!validated) {
      return res.status(401).json({
        message: "Incorrect password"
      });
    }

    const token = await jwt.sign(
      { username, _id: user._id },
      process.env.PRIVATE_KEY,
      { expiresIn: "5h" }
    );

    user.password = undefined;
    const response = {
      token,
      user
    };

    res.status(200).json({
      message: "Login successful",
      response
    });
  } catch (error) {
    res.status(401).json({
      message: "User not found!",
      error
    });
  }
};
