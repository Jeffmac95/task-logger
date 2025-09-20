import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import db from "./connectDB.js"
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"]
}));
app.use(express.json());

app.get("/timeblocks", (req, res) => {
    let { search } = req.query;
    let sql = "SELECT * FROM timeblock";
    let params = [];

    if (search) {
        search = search.toLowerCase().trim();
        sql += " WHERE activity LIKE ?";
        params.push(`${search}`);
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json(rows);
    });
});

app.post("/timeblocks", (req, res) => {
    let { activity, time_spent } = req.body;

    if (!activity || activity.trim() === "") {
        return res.status(400).json({error: "Activity required."});
    }

    activity = activity.toLowerCase().trim();

    if (time_spent <=0) {
        return res.status(400).json({error: "Time must be greater than zero."});
    }

    db.run(
      "INSERT INTO timeblock (activity, time_spent) VALUES (?,?)", [activity, time_spent],
      function (err) {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(201).json({ id: this.lastID, activity, time_spent });
      }
    );
});

app.delete("/timeblocks/:id", (req, res) => {
    const { id } = req.params;

    db.run(
        "DELETE FROM timeblock WHERE id = ?", [id],
        function (err) {
            if (err) {
                return res.status(500).json({error: err.message});
            }
            res.status(200).json({deletedID: id});
        }
    );
});

app.put("/timeblocks/:id", (req, res) => {
    const { id } = req.params;
    let { activity } = req.body;

    if (!activity || activity.trim() === "") {
        return res.status(400).json({error: "Activity required."});
    }

    activity = activity.toLowerCase().trim();

    db.run(
        "UPDATE timeblock SET activity = ? WHERE id = ?", [activity, id],
        function (err) {
            if (err) {
                return res.status(500).json({error: err.message});
            }
            res.status(200).json({updatedActivity: activity, updatedID: id});
        }
    );
});

app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});