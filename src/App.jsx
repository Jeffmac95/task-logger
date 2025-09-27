import Timer from "./timer.jsx"
import TimeblockFetcher from "./timeblocksfetcher.jsx"
import Navbar from "./navbar.jsx"
import './index.css'
import './app.css'

function App() {
  return (
    <>
      <Navbar/>
      <h1 className="main-title">Task Logger</h1>
      <Timer/>
      <TimeblockFetcher/>
    </>
  )
}

export default App
