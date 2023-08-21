const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth/authRouter");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
dotenv.config();

app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRoute);

// Post routes
app.use("/api/posts", postRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
  connectDB();
});
