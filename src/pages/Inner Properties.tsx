import Hero from '../sections/InnerProperties_Hero'
import '.././App.css'

interface PropertyData {
  image: string;
  title: string;
  description: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
}

function Articles() {

  return (
      <>
        <div className="inner-properties-pg">
          <Hero/>
        </div>
      </>
  )
}

export default Articles
