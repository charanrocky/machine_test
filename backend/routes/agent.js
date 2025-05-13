const express = require("express");
const Agent = require("../models/Agent");
const auth = require("../middleware/auth"); // Import auth middleware

const router = express.Router();

// Add Agent - Associate with adminId
router.post("/add", auth, async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const adminId = req.user; // Get adminId from JWT token

  try {
    const agent = new Agent({ name, email, mobile, password, adminId });
    await agent.save();

    res.status(201).json(agent);
  } catch (err) {
    res.status(500).json({ msg: "Error creating agent" });
  }
});

// Get Agents - Filter by adminId
router.get("/", auth, async (req, res) => {
  try {
    const adminId = req.user;
    const agents = await Agent.find({ adminId }); // Filter by adminId
    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
