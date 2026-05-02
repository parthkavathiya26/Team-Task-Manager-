const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Create Task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo, project } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status: "To Do",
      assignedTo: assignedTo || req.user.id,
      project
    });

    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get tasks
router.get("/", authMiddleware, async (req, res) => {
  try {
    let query = {};

    if (req.user.role !== "Admin") {
      query.assignedTo = req.user.id;
    }

    const tasks = await Task.find(query)
      .populate("assignedTo project");

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update Task
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Member restriction
    if (req.user.role !== "Admin" && task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete Task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role !== "Admin" && task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;