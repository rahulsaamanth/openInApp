import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    window.history.scrollRestoration = "manual"
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route
            path="/dashboard"
            element={<Dashboard user={user} setUser={setUser} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
