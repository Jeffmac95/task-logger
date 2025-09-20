import { useState } from "react"
import './themetoggle.css'

function ThemeToggle() {

    const [isThemeToggled, setIsThemeToggled] = useState(false);

    function changeStyle() {
        if (isThemeToggled) {
            // Timer component
            document.querySelector("#timer-container").style.backgroundColor = "#1b263b";
            document.querySelector(".timer-title").style.color = "#e0e1dd";
            document.querySelector("#activity-input").style.backgroundColor = "#778da9";
            document.querySelector("#time").style.color = "#e0e1dd";

            // Timeblockfetcher component
            document.querySelector("#data-container").style.backgroundColor = "#324a5f";
            document.querySelector(".timeblockfetcher-title").style.color = "#e0e1dd";
            document.querySelector("#get-activity-input").style.backgroundColor = "#778da9";
            document.querySelector("#table-caption").style.color = "#e0e1dd";
            document.querySelector("table").style.backgroundColor = "#1b2a41";
            document.querySelectorAll(".timeblock-buttons").forEach(btn => {
                btn.style.backgroundColor = "#0c1821";
                btn.style.color = "#324a5f";
            });

        } else {
            // Timer component
            document.querySelector("#timer-container").style.backgroundColor = "#007EA7";
            document.querySelector(".timer-title").style.color = "#000000";
            document.querySelector("#activity-input").style.backgroundColor = "#CCDBDC";
            document.querySelector("#time").style.color = "#000000";

            // Timeblockfetcher component
            document.querySelector("#data-container").style.backgroundColor = "#80CED7";
            document.querySelector(".timeblockfetcher-title").style.color = "#000000";
            document.querySelector("#get-activity-input").style.backgroundColor = "#CCDBDC";
            document.querySelector("#table-caption").style.color = "#000000";
            document.querySelector("table").style.backgroundColor = "#9AD1D4";
            document.querySelectorAll(".timeblock-buttons").forEach(btn => {
                btn.style.backgroundColor = "#003249";
                btn.style.color = "#CCDBDC";
            });
        }
        
    }

    return(
        <>
        <div id="toggle-theme-container">
            <nav id="nav-bar">
                <button 
                    id="toggle-theme-button"
                    onClick={() => {
                        setIsThemeToggled(!isThemeToggled);
                        changeStyle();
                    }}    
                >Toggle Theme</button>
            </nav>
        </div>
        </>
    )
}

export default ThemeToggle;