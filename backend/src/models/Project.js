const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  requiredSkills: [String],
  budget: Number
});

module.exports = mongoose.model("Project", projectSchema);