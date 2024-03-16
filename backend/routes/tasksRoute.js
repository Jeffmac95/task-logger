import express from "express";
import { Task } from "../models/taskModel.js";

const router = express.Router();

// Post a new task-block
router.post("/", async (req, res) => {
    try {
        if (!req.body.subject || !req.body.timeSpent) {
            return res.status(400).send({
                message: "Requires subject and timeSpent."
            });
        }

        const newTask = {
            subject: req.body.subject,
            timeSpent: req.body.timeSpent
        };

        const task = await Task.create(newTask);

        return res.status(201).send(task);
    }catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

// Get all task-blocks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find({});

        return res.status(200).json({
            totalTasks: tasks.length,
            data: tasks
        })
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

// Get task-block by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        return res.status(200).json(task);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.essage });
    }
});

// Delete a task-block by id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Task.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({ message: "Error deleting task-block." });
        }

        return res.status(200).send({ message: "Task-block deleted successfully." });
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

export default router;