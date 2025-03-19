import Hero from '../sections/Hero'
import Filter from '../components/Filter'
import '../App.css'
import '../css/Hero.css'

function Home() {

  return (
      <>
      <div className="home-pg">
        <Hero/>
        <Filter/>

      </div>
      </>
  )
}

export default Home
