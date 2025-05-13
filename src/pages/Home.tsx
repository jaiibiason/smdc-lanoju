import Hero from '../sections/Hero'
import Filter from '../components/Filter'
import FeaturedProperties from '../sections/FeaturedProperties'
import ClientStories from '../sections/ClientSuccessStories'
import LatestNews from '../sections/LatestNews'
import '../App.css'


function Home() {

  return (
      <>
      <div className="home-pg">
        <Hero/>
        <Filter/>
        <FeaturedProperties/>
        <ClientStories/>
        <LatestNews/>

      </div>
      </>
  )
}

export default Home
