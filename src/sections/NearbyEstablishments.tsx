import React from "react";
import "../css/NearbyEstablishments.css";

interface NearbyEstablishmentsProps {
  property: any;
  nearbyestTable: { [key: string]: { category: string; name: string } };
}

const NearbyEstablishments: React.FC<NearbyEstablishmentsProps> = ({ property, nearbyestTable }) => {
  // Early return if no property or nearby data
  if (!property || !property.nearby || !nearbyestTable) {
    return (
      <section className="nearby-establishments">
        <div className="establishment-details">
          <h2>Nearby Establishments</h2>
          <p>No nearby establishment data available.</p>
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
  }

  // Group nearby places by category
  const nearbyByCategory: { [category: string]: Array<{ name: string, distance: number }> } = {};
  
  Object.keys(property.nearby).forEach(key => {
    if (nearbyestTable[key] && property.nearby[key] && typeof property.nearby[key].distance === 'number') {
      const category = nearbyestTable[key].category || 'Other';
      const name = nearbyestTable[key].name;
      const distance = property.nearby[key].distance;
      
      if (!nearbyByCategory[category]) {
        nearbyByCategory[category] = [];
      }
      
      nearbyByCategory[category].push({ name, distance });
    }
  });

  // Default map link (used if property.map_link is not available)
  const defaultMapLink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1930.1234567890123!2d120.9822!3d14.6042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7b123456789%3A0x123456789abcdef!2sManila!5e0!3m2!1sen!2sph!4v1234567890123";
  
  // Use property.map_link if available, otherwise use default map link
  const mapSrc = property.map_link && property.map_link.trim() !== "" ? property.map_link : defaultMapLink;

  return (
    <section className="nearby-establishments">
      <div className="establishment-details">
        <h2>Nearby Establishments</h2>
        
        {/* Render each category that has entries */}
        {Object.keys(nearbyByCategory).map((category, index) => (
          <div key={index} className={`establishment-category ${category.toLowerCase().replace(/\s+/g, '-')}`}>
            <h3>{category}</h3>
            <ul>
              {nearbyByCategory[category].map((item, idx) => (
                <li key={idx}>
                  <span>{item.name}</span>
                  <span>{item.distance}km</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="establishment-map">
        <iframe
          title="Nearby Establishments Map"
          src={mapSrc}
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
