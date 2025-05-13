import React from "react";
import "../css/NearbyEstablishments.css"; // Import the new CSS file

const NearbyEstablishments: React.FC = () => {
  return (
    <section className="nearby-establishments">
      <div className="establishment-details">
        <h2>Nearby Establishments</h2>
        <div className="establishment-category grocery">
          <h3>Grocery & Daily Essentials</h3>
          <ul>
            <li>
              <span>SM Hypermarket</span>
              <span>400m</span>
            </li>
            <li>
              <span>Landers Superstore</span>
              <span>900m</span>
            </li>
            <li>
              <span>S&R Membership Shopping</span>
              <span>1.2km</span>
            </li>
          </ul>
        </div>
        <div className="establishment-category shopping">
          <h3>Shopping & Leisure Hubs</h3>
          <ul>
            <li>
              <span>SM Mall of Asia</span>
              <span>500m</span>
            </li>
            <li>
              <span>Greenbelt Mall</span>
              <span>1.0km</span>
            </li>
            <li>
              <span>Glorietta Mall</span>
              <span>1.5km</span>
            </li>
          </ul>
        </div>
        <div className="establishment-category hospitals">
          <h3>Hospitals & Medical Centers</h3>
          <ul>
            <li>
              <span>St. Luke's Medical Center</span>
              <span>600m</span>
            </li>
            <li>
              <span>Makati Medical Center</span>
              <span>1.2km</span>
            </li>
          </ul>
        </div>
        <div className="establishment-category transit">
          <h3>Transit & Accessibility Points</h3>
          <ul>
            <li>
              <span>MRT Taft Station</span>
              <span>300m</span>
            </li>
            <li>
              <span>NAIA Airport</span>
              <span>1.5km</span>
            </li>
          </ul>
        </div>
        <div className="establishment-category education">
          <h3>Educational Institutions</h3>
          <ul>
            <li>
              <span>De La Salle University</span>
              <span>800m</span>
            </li>
            <li>
              <span>Ateneo Graduate School of Business</span>
              <span>1.3km</span>
            </li>
            <li>
              <span>University of the Philippines Diliman</span>
              <span>1.7km</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="establishment-map">
        <iframe
          title="Nearby Establishments Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1930.1234567890123!2d120.9822!3d14.6042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7b123456789%3A0x123456789abcdef!2sManila!5e0!3m2!1sen!2sph!4v1234567890123"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default NearbyEstablishments;
