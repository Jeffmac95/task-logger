import { useState, useEffect, useRef } from "react";

function Timer() {

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        return () => clearInterval(id.current);
    }, []);

    let id = useRef();
    
    function handleTime() {
        if (!running) {
            console.log("Running");
            id.current = setInterval(() => {
                setTime((prev) => prev+1);
            }, 1000);
            setRunning(true);
        } else {
            console.log("couldnt start")
        }
    }


    return (
        <>
        <div className="timer">
            <h2>{time}</h2>
            <button onClick={()=> {
                handleTime();
            }}>Start</button>
            <button onClick={()=> {
                clearInterval(id.current);
                setRunning(false);
            }}>Pause</button>
            <button onClick={()=> {
                clearInterval(id.current);
                setTime(0);
                setRunning(false);
            }}>Reset</button>
        </div>
        </>
    );
}


export default Timer;