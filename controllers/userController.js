const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.find();
    // console.log("all user", user);

    const response = {
      totalCount: user?.length,
      data: user
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(401).json({
      message: "Something went wrong"
    });
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "Wrong user!"
      });
    }

    req.body.password = await bcrypt.hash(req.body.password, 11);

    const updateUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true
    });

    updateUser.password = undefined;

    res.status(200).json({
      message: "Profile updated successfully",
      updateUser
    });
  } catch (error) {
    res.status(401).json({
      message: "You can update only your account!"
    });
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser
    });
  } catch (error) {
    res.status(401).json({
      message: "You can delete only your account!"
    });
  }
};
