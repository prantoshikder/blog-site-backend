const { createPost } = require("../controllers/postController");
const { authMiddleware } = require("../middlewares/auth");
const postRoute = require("express").Router();

postRoute.post("/", authMiddleware, createPost);

module.exports = postRoute;
