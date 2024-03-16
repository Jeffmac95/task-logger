import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        subject: {
            type: String,
            required: true
        },
        timeSpent: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Task = mongoose.model("Task", taskSchema);