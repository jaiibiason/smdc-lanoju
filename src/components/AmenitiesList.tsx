import React from "react";
import ".././App.css";
import "../css/AmenitiesList.css";

interface Amenity {
  label: string; 
}

interface AmenitiesListProps {
  amenities: Amenity[];
}

const AmenitiesList: React.FC<AmenitiesListProps> = ({ amenities }) => {
  const getIcon = (label: string): string => {
    switch (label) {
      case "Lap Pool":
        return "/assets/amenities-icons/lap-pool.svg";
      case "Kiddie Pool":
        return "/assets/amenities-icons/kiddie-pool.svg";
      case "Fitness Gym":
        return "/assets/amenities-icons/fitness-gym.svg";
      case "Sunset Lounge":
        return "/assets/amenities-icons/sunset-lounge.svg";
      case "Grand Lobby":
        return "/assets/amenities-icons/grand-lobby.svg";
      case "Sunset Lanai":
        return "/assets/amenities-icons/sunset-lanai.svg";
      case "Celebration Hall":
        return "/assets/amenities-icons/celebration-hall.svg";
      default:
        return "/assets/amenities-icons/default.svg"; 
    }
  };

  return (
    <div className="amenities-list">
      {amenities.map((amenity, index) => (
        <div key={index} className="amenity-item">
          <img src={import.meta.env.BASE_URL + getIcon(amenity.label)} alt={amenity.label} className="amenity-icon" />
          <p className="amenity-label">{amenity.label}</p>
        </div>
      ))}
    </div>
  );
};

export default AmenitiesList;
