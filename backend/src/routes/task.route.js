const express = require("express");

const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    searchTasks,
    updateTaskStatus
} = require("../controllers/task.controllers");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Create Task
router.post("/createtask", authMiddleware, createTask);

// Get All Tasks
router.get("/alltasks", authMiddleware, getAllTasks);

// Get Task By ID
router.get("/gettask/:id", authMiddleware, getTaskById);

// Search Tasks
router.get("/search", authMiddleware, searchTasks);

// Update Task
router.put("/edittask/:id", authMiddleware, updateTask);

// Update Task Status
router.patch("/status/:id", authMiddleware, updateTaskStatus);

// Delete Task
router.delete("/deletetask/:id", authMiddleware, deleteTask);

module.exports = router