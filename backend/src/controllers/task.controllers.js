const taskModel = require("../models/task.model");

// Create Task
exports.createTask = async (req, res) => {
    console.log("Body:", req.body);
    const { title, content } = req.body;
    const userId = req.userId;

    try {
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        const newTask = await taskModel.create({
            title,
            content,
            user: userId
        });

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: newTask
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Tasks
exports.getAllTasks = async (req, res) => {
    const userId = req.userId;

    try {
        const tasks = await taskModel.find({ user: userId });

        return res.status(200).json({
            success: true,
            message: "All tasks fetched successfully",
            data: tasks
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Task By ID
exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Task ID is required!"
        });
    }

    try {
        const task = await taskModel.findOne({
            _id: id,
            user: userId
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task fetched successfully",
            data: task
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    const { title, content } = req.body;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Task ID is required"
        });
    }

    if (!title || !content) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const updatedTask = await taskModel.findOneAndUpdate(
            {
                _id: id,
                user: userId
            },
            {
                title,
                content
            },
            {
                returnDocument: "after"
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: updatedTask
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Task ID is required!"
        });
    }

    try {
        const deletedTask = await taskModel.findOneAndDelete({
            _id: id,
            user: userId
        });

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: deletedTask
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Search Tasks
exports.searchTasks = async (req, res) => {
    const userId = req.userId;
    const { keyword } = req.query;

    try {
        const tasks = await taskModel.find({
            user: userId,
            title: {
                $regex: keyword || "",
                $options: "i"
            }
        });

        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            data: tasks
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Task Status
exports.updateTaskStatus = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    const { status } = req.body;

    try {
        const updatedTask = await taskModel.findOneAndUpdate(
            {
                _id: id,
                user: userId
            },
            {
                status: status
            },
            {
                new: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            data: updatedTask
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};