import React from "react";
import HeaderImg from '../assets/temp_prptHeader.png'
import "../css/Properties.css"; // Import styles

const PropertiesHeader: React.FC = () => {
  return (
    <div className="container">
      {/* Left Section - Image */}
      <div className="image-section">
        <img 
          src={HeaderImg} 
          alt="Example"
        />
      </div>

      {/* Right Section - Text */}
      <div className="text-section">
        <h2>Properties</h2>
        <p>Browse a selection of properties designed for solid returns and long-term value. Find what fits your goals.</p>
      </div>
    </div>
  );
};

export default PropertiesHeader;
