import express from "express";
import mongoose from "mongoose";
import { PORT, MONGODBURL } from "./config.js";
import { Task } from "./models/taskModel.js";
import tasksRoute from "./routes/tasksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:8000",
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

app.get("/", (req, res) => {
    return res.status(234);
});

app.use("/tasks", tasksRoute);

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
});

mongoose.connect(MONGODBURL)
.then(() => {
    console.log("Connected to the database.");
})
.catch((error) => {
    console.log(error);
});