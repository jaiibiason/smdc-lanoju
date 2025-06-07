import '.././App.css';
import '../css/AwardsRecognition.css';

function AwardsRecognition() {

  return (
      <section className='awards-recognition'>
        <h1>Awards & Recognition</h1>
        <p>Proud moments that reflect my dedication to helping clients find the right investment with confidence.</p>
        <div className="awards-grid">
          {/* 2025 Awards */}
          <div className="award-item">
            <h2>2025</h2>
            <p>SMDC Top Performing Agent</p>
            <div className="award-img" aria-label="Award 2025 - SMDC Top Performing Agent"></div>
            {/* <img src="/images/award-2025.jpg" alt="Award 2025" /> */}
          </div>
          <div className="award-item">
            <h2>2025</h2>
            <p>SMDC Top Performing Agent</p>
            <div className="award-img" aria-label="Award 2025 - SMDC Top Performing Agent"></div>
          </div>
          {/* 2024 Awards */}
          <div className="award-item">
            <h2>2024</h2>
            <p>SMDC Top Performing Agent</p>
            <div className="award-img" aria-label="Award 2024 - SMDC Top Performing Agent"></div>
          </div>
          <div className="award-item">
            <h2>2024</h2>
            <p>SMDC Top Performing Agent</p>
            <div className="award-img" aria-label="Award 2024 - SMDC Top Performing Agent"></div>
          </div>
        </div>
      </section>
  );
}

export default AwardsRecognition;
