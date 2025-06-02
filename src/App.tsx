import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Properties from './pages/Properties'
import AboutMe from './pages/About Me'
import Articles from './pages/Articles'
import Faqs from './pages/Faqs'
import Inquire from './pages/Inquire'
import InnerProperties from './pages/Inner Properties'
import InnerFAQS from './pages/InnerFAQS'
import SampleComputation from './pages/Sample Computation'
import InnerArticle from './pages/InnerArticle'

function App() {

  return (
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/properties" element={<Properties/>}/>
            <Route path="/inner-prop" element={<InnerProperties/>}/>
            <Route path="/aboutme" element={<AboutMe/>}/>
            <Route path="/articles" element={<Articles/>}/>
            <Route path="/faqs" element={<Faqs/>}/>
            <Route path="/faqs/inner" element={<InnerFAQS/>}/>
            <Route path="/inquire" element={<Inquire/>}/>
            <Route path="/sample-computation" element={<SampleComputation/>}/>
            <Route path="/articles/:id" element={<InnerArticle />} />
            <Route path="/articles/horizontal/:id" element={<InnerArticle />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
  )
}

export default App
