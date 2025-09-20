import Timer from "./timer.jsx"
import TimeblockFetcher from "./timeblocksfetcher.jsx"
import ThemeToggle from "./themetoggle.jsx"
import './index.css'
import './app.css'

function App() {
  return (
    <>
      <ThemeToggle/>
      <h1 className="main-title">Task Logger</h1>
      <Timer/>
      <TimeblockFetcher/>
    </>
  )
}

export default App
