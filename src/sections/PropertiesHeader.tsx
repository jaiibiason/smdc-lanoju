import React from "react";
import "../css/Properties.css"; // Import styles

interface PropertiesHeaderProps {
  imageSrc: string;
  heading: string;
  description: string;
}

const PropertiesHeader: React.FC<PropertiesHeaderProps> = ({ imageSrc, heading, description }) => {
  return (
    <div className="container">
      {/* Left Section - Image */}
      <div className="image-section">
        <img 
          src={imageSrc} 
          alt="Example"
        />
      </div>

      {/* Right Section - Text */}
      <div className="text-section">
        <h2>{heading}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PropertiesHeader;
