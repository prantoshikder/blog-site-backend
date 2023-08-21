const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  try {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) {
      return res.status(401).json({
        message: "Invalid authorization"
      });
    }

    const token = jwtToken.split(" ")[1];
    const decode = jwt.verify(token, process.env.PRIVATE_KEY);
    const id = decode.id;

    const user = await User.findById(id);

    res.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed"
    });
  }
};
