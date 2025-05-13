const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");

exports.addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const adminId = req.user; // Get adminId from JWT token

  const hashedPassword = await bcrypt.hash(password, 10);
  const agent = new Agent({
    name,
    email,
    mobile,
    password: hashedPassword,
    adminId,
  });

  await agent.save();
  res.status(201).json({ message: "Agent added successfully" });
};
