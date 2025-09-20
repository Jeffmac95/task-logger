import { useState, useRef } from "react"
import "./timer.css"

function Timer() {

    const [time, setTime] = useState(0);
    const [activity, setActivity] = useState("");
    const [inputError, setInputError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const intervalRef = useRef(null);

    function start() {
        if (intervalRef.current !== null) return;

        intervalRef.current = setInterval(() => {
            setTime((previousTime) => previousTime + 1);
        }, 1000);
    }

    function reset() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTime(0);
    }

    function pause() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }

    async function post() {
        if (activity.trim() === "") {
            setInputError("Enter an activity before logging it.");
            return;
        }

        if (time <= 0) {
            setInputError("Time must be greater than zero.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/timeblocks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ activity: activity.toLowerCase(), time_spent: time }),
            });

            let data = {};
            const text = await response.text();
            if (text) data = JSON.parse(text);

            setTime(0);
            setActivity("");
            setInputError("");
            setSuccessMsg("Timeblock saved.");
            console.log("Timeblock saved:", data);
        } catch (err) {
            console.error("Error saving timeblock:", err);
            setInputError("Error POSTING. try again.");
        }
    }

    return(
        <>
        <div id="timer-container">
            <h2 className="timer-title">Timer</h2>
            <input 
                type="text"
                id="activity-input"
                placeholder="Enter activity to log"
                value={activity}
                onChange={(e) => {
                    setActivity(e.target.value);
                    setSuccessMsg("");
                    setInputError("");
                }}
            />
            <div id="time-container">
                <h2 id="time">{time}</h2>
            </div>

            <div id="timer-button-container">
                <button className="timer-buttons start-button" onClick={start}>Start</button>
                <button className="timer-buttons reset-button" onClick={reset}>Reset</button>
                <button className="timer-buttons pause-button" onClick={pause}>Pause</button>
                <button className="timer-buttons post-button" onClick={post}>Post</button>
            </div>
            {successMsg && <div className="success-msg"> {successMsg} </div>}
            {inputError && <div className="error-msg"> {inputError} </div>}
        </div>
        </>
    )
}

export default Timer;