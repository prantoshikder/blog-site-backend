const Post = require("../models/postModal");

exports.createPost = async (req, res, next) => {
  const { title, description, username, category, photo } = req.body;

  try {
    const post = await Post.create({
      title,
      description,
      username,
      category,
      photo
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(401).json({
      message: "Something went wrong",
      error
    });
  }
};
