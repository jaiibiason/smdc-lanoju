import AwardsRecognition from '../sections/AwardsRecognition';
import ClientSucccessStories from '../sections/ClientSuccessStories';
import Youtube from '../sections/Youtube';
import '.././App.css'
import '../css/AboutMe.css';

function AboutMe() {

  return (
      <>
        <div className='about-me-pg'>
        <section className="hero-cont pad-40">
          <div className="left-cont">
            <h1>13 Years in Real Estate Expertise</h1>
            <p>I am dedicated to helping clients navigate property investments with confidence. Whether you're a first-time buyer or a seasoned investor, my approach is built on trust, knowledge, and an unwavering focus on your goals.</p>
            <button className='blue'>Start Your Investment Today</button>
          </div>
          <div className="right-cont">
            {/* <img src={tempprof} alt="Agent Headshot Picture" /> */}
          </div>
        </section>

        <AwardsRecognition />
        <ClientSucccessStories />
        <Youtube />
        </div>
      </>
  )
}

export default AboutMe
