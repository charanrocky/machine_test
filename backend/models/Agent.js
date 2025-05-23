const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to Admin
});

module.exports = mongoose.model("Agent", AgentSchema);
