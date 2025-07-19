import React from "react";
import ".././App.css";
import "../css/AmenitiesList.css";

interface Amenity {
  label: string;
  icon?: string;
}

interface AmenitiesListProps {
  amenities: Amenity[];
}

const AmenitiesList: React.FC<AmenitiesListProps> = ({ amenities }) => {
  return (
    <div className="amenities-list-bg">
      <div className="amenities-list">
        {amenities.map((amenity, index) => (
          <div key={index} className="amenity-item">
            <img
              src={
                amenity.icon && amenity.icon.trim() !== ""
                  ? amenity.icon
                  : "https://firebasestorage.googleapis.com/v0/b/dmdc-freelance.firebasestorage.app/o/amenities_icons%2Fdefault-icon.svg?alt=media&token=57e0af54-c470-4f03-850f-e7f26c50f016"
              }
              alt={amenity.label}
              className="amenity-icon"
              onError={e => {
                (e.target as HTMLImageElement).src =
                  "https://firebasestorage.googleapis.com/v0/b/dmdc-freelance.firebasestorage.app/o/amenities_icons%2Fdefault-icon.svg?alt=media&token=57e0af54-c470-4f03-850f-e7f26c50f016";
              }}
            />
            <p className="amenity-label">{amenity.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesList;
