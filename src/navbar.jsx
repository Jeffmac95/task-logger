import { useState } from "react"
import "./navbar.css"

function Navbar() {
    const [isThemeToggled, setIsThemeToggled] = useState(false);

    return (
        <>
        <header>
            <nav>
                <button onClick={() => {
                    setIsThemeToggled((prevState) => {
                        const newState = !prevState;
                        if (newState) {
                            document.documentElement.setAttribute("data-theme", "dark-theme");
                        } else {
                            document.documentElement.removeAttribute("data-theme");
                        }
                        return newState;
                    });
                    }}>Toggle Theme</button>
            </nav>
        </header>
        </>
    )
}

export default Navbar;