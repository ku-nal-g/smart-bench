const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  hourlyRate: Number,
  status: {
    type: String,
    enum: ["Bench", "Assigned"],
    default: "Bench"
  }
});

module.exports = mongoose.model("Employee", employeeSchema);