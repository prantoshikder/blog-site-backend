const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);

    console.log("Database connection success");
  } catch (error) {
    console.log("Database connection error");
  }
};

module.exports = connectDB;
