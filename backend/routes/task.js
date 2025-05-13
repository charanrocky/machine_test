const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const Task = require("../models/Task");
const Agent = require("../models/Agent");
const auth = require("../middleware/auth");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const allowedMimeTypes = [
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV, XLSX, and XLS files are allowed"));
    }
  },
});

// ✅ Upload CSV and assign adminId and agentId
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

  const adminId = req.user;
  const agents = await Agent.find({ adminId }); // ✅ Filter agents by adminId

  const tasks = [];

  // Read and parse CSV file
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      const { FirstName, Phone, Notes } = row;
      if (FirstName && Phone && Notes) {
        tasks.push({ firstName: FirstName, phone: Phone, notes: Notes });
      }
    })
    .on("end", async () => {
      if (tasks.length === 0) {
        return res
          .status(400)
          .json({ msg: "Invalid CSV format or empty file" });
      }

      let taskIndex = 0;
      const tasksPerAgent = Math.floor(tasks.length / agents.length);
      const remainder = tasks.length % agents.length;

      for (let i = 0; i < agents.length; i++) {
        for (let j = 0; j < tasksPerAgent; j++) {
          await Task.create({
            ...tasks[taskIndex],
            agentId: agents[i]._id,
            adminId, // ✅ Assign adminId
          });
          taskIndex++;
        }
      }

      for (let i = 0; i < remainder; i++) {
        await Task.create({
          ...tasks[taskIndex],
          agentId: agents[i]._id,
          adminId, // ✅ Assign adminId
        });
        taskIndex++;
      }

      res.status(201).json({ msg: "Tasks distributed successfully" });
    });
});

// ✅ Get tasks for logged-in admin only
router.get("/", auth, async (req, res) => {
  try {
    const adminId = req.user;
    const tasks = await Task.find({ adminId }).populate(
      "agentId",
      "name email"
    );
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
