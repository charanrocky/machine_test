const csv = require("csv-parser");
const fs = require("fs");
const Task = require("../models/Task");
const Agent = require("../models/Agent");

router.post("/upload", auth, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

  try {
    const adminId = req.user; // ✅ Get adminId from token
    const agents = await Agent.find({ adminId });
    if (agents.length === 0) {
      return res.status(400).json({ msg: "No agents linked to this admin" });
    }

    let tasks = [];

    // ✅ Read CSV and store tasks
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        if (row.FirstName && row.Phone && row.Notes) {
          tasks.push({
            firstName: row.FirstName,
            phone: row.Phone,
            notes: row.Notes,
          });
        }
      })
      .on("end", async () => {
        if (tasks.length === 0) {
          return res
            .status(400)
            .json({ msg: "Invalid CSV format or empty file" });
        }

        let taskIndex = 0;
        for (const task of tasks) {
          const agent = agents[taskIndex % agents.length];
          await new Task({
            ...task,
            agentId: agent._id,
            adminId, // ✅ Pass adminId
          }).save();
          taskIndex++;
        }

        res.status(201).json({ msg: "Tasks uploaded and distributed" });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});
