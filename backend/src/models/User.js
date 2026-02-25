const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["PM", "EMPLOYEE"]
  }
});

module.exports = mongoose.model("User", userSchema);