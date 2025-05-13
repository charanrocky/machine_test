const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  firstName: String,
  phone: String,
  notes: String,
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
