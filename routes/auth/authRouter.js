// const express = require("express");
// const signUp = express.Router()

const {
  signup,
  login
} = require("../../controllers/authControllers/loginSignUp");

const authRouter = require("express").Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);

module.exports = authRouter;
