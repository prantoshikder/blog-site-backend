const {
  getAllUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/auth");
const userRoute = require("express").Router();

userRoute.get("/", authMiddleware, getAllUser);
userRoute.put("/:userId", authMiddleware, updateUser);
userRoute.delete("/:userId", authMiddleware, deleteUser);

module.exports = userRoute;
