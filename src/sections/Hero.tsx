import tempprof from '../assets/temp profile landing.png'
import '../App.css'

function Hero() {

  return (
    <>
      <section className='hero'>
        <div className="hero-cont">
          <div className="left-cont">
            <h1>Invest with Confidence</h1>
            <p>Trusted expertise. Prime properties. Smart investments.</p>
            <button className='inquire-btn'>Inquire Now</button>
          </div>
          <div className="right-cont">
            {/* <img src={tempprof} alt="Agent Headshot Picture" /> */}
          </div>
        </div>

      </section>
    
    </>
  )
}

export default Hero
