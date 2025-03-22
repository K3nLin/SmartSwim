const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.log("MongoDB Failed to Connect", err);
  }
};

module.exports = connectDB;
