import React from "react";
import HeaderImg from '../assets/temp_prptHeader.png'
import "../css/Properties.css"; // Import styles

const FAQHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="faq-container">
      {/* Right Section - Text */}
      <div className="faq-text-section">
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default FAQHeader;
