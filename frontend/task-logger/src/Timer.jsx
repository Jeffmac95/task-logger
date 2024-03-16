import { useState, useEffect } from "react";

function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [mins, setMins] = useState(0);
    const [hours, setHours] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    let timer;

    useEffect(() => {
        if (isRunning) {
            timer = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds === 59) {
                        setSeconds(0);
                        setMins(prevMins => {
                            if (prevMins === 59) {
                                setMins(0);
                                setHours(prevHours => prevHours + 1);
                            } else {
                                setMins(prevMins + 1);
                            }
                        });
                    } else {
                        return prevSeconds + 1;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    const startTimer = () => {
        setIsRunning(true);
        
    }

    const stopTimer = () => {
        setIsRunning(false);
        clearInterval(timer);
    }

    const resetTimer = () => {
        setIsRunning(false);
        clearInterval(timer);
        setSeconds(0);
        setMins(0);
        setHours(0);
    }

    return (
        <>
            <div className="timer-container">
                <div className="timer"><span className="numbers">{hours}:{mins < 10 ? '0' + mins : mins}:{seconds < 10 ? '0' + seconds : seconds}</span></div>
                <div className="timer-btns">
                    <button className="start" onClick={startTimer} disabled={isRunning}>Start</button>
                    <button className="stop" onClick={stopTimer}>Stop</button>
                    <button className="reset" onClick={resetTimer}>Reset</button>
                </div>
            </div>
        </>
    )
}

export default Timer;
