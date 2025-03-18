import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/NavBar'
import Home from './pages/Home'
import Properties from './pages/Properties'
import AboutMe from './pages/About Me'
import Articles from './pages/Articles'
import Faqs from './pages/Faqs'
import Inquire from './pages/Inquire'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/properties" element={<Properties/>}/>
            <Route path="/aboutme" element={<AboutMe/>}/>
            <Route path="/articles" element={<Articles/>}/>
            <Route path="/faqs" element={<Faqs/>}/>
            <Route path="/inquirenow" element={<Inquire/>}/>
          </Routes>
        </main>
      </div>
  )
}

export default App
