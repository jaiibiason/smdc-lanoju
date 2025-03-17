import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Navbar from './components/NavBar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <Navbar />
        <main>
          <h1>Welcome to MyApp</h1>
          <p>This is the main content of the app.</p>
        </main>
      </div>
  )
}

export default App
