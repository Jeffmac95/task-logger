import sqlite3 from "sqlite3"

sqlite3.verbose();

const db = new sqlite3.Database("./tasklogger.db", (err) => {
    if (err) {
        console.error("Could not connec to DB.", err);
    }

    console.log("Connected to the DB.");
    db.run(
        `CREATE TABLE IF NOT EXISTS timeblock (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            activity TEXT,
            time_spent INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
                if (err) {
                    console.error("Failed to create table.", err);
                } else {
                    console.log("Table 'timeblock' created/already exists.");
                }
            }
        );
});

export default db;