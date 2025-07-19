import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/UnitType.css"; 

interface Unit {
  name: string;
  area: number;
  price: number;
  image?: string; // Add image property
}

interface UnitTypeProps {
  units: Unit[];
}

const UnitType: React.FC<UnitTypeProps> = ({ units }) => {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(units && units.length > 0 ? units[0] : null);

  // Ensure the first unit is selected if units prop changes or is loaded later
  React.useEffect(() => {
    if (units.length > 0 && (!selectedUnit || !units.some(u => u.name === selectedUnit.name))) {
      setSelectedUnit(units[0]);
    }
  }, [units]);

  if (!units || units.length === 0) {
    return (
      <section className="unit-type">
        <div className="unit-type-details">
          <p>No unit types available for this property.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="unit-type">
      <div
        className="unit-type-img"
        style={{
          backgroundImage: `url(${selectedUnit?.image})`,
        }}
      ></div>
      <div className="unit-type-details">
        <p className="unit-type-instruction">
          <i>*Select a unit type to view its details</i>
        </p>
        <table className="unit-type-table">
          <thead>
            <tr>
              <th>Unit Name</th>
              <th>Area</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit, index) => (
              <tr
                key={index}
                className={`unit-type-row ${
                  selectedUnit && selectedUnit.name === unit.name ? "active" : ""
                }`}
                onClick={() => setSelectedUnit(unit)}
              >
                <td>
                  {selectedUnit && selectedUnit.name === unit.name && (
                    <span className="arrow-icon">
                      {/* ...existing SVG arrow... */}
                      <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.953953 7.54811L9.62062 13.5481C9.72063 13.6173 9.83768 13.6578 9.95907 13.6653C10.0805 13.6728 10.2016 13.6469 10.3093 13.5904C10.4171 13.534 10.5073 13.4491 10.5703 13.3451C10.6333 13.241 10.6666 13.1217 10.6666 13.0001V1.00012C10.6667 0.878434 10.6335 0.759051 10.5705 0.654904C10.5076 0.550757 10.4174 0.46582 10.3096 0.409297C10.2019 0.352774 10.0807 0.326822 9.95924 0.334252C9.83779 0.341683 9.72068 0.382213 9.62062 0.45145L0.953953 6.45145C0.865659 6.51307 0.793551 6.5951 0.74376 6.69057C0.69397 6.78603 0.667969 6.89211 0.667969 6.99978C0.667969 7.10745 0.69397 7.21353 0.74376 7.309C0.793551 7.40446 0.865659 7.48649 0.953953 7.54811Z" fill="#E1A000"/>
                      </svg>
                    </span>
                  )}
                  {unit.name}
                </td>
                <td>{unit.area} sqm</td>
                <td>₱{unit.price.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="inquire-sample-computation">
          <NavLink to="/inquire">
            <button className="inquire-btn yellow">Inquire Now</button>
          </NavLink>
          <NavLink className={"sample-computation-link"} to="/sample-computation">
            view sample computation
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.451987 1.58023L1.51299 0.520235L7.29199 6.29723C7.38514 6.3898 7.45907 6.49988 7.50952 6.62113C7.55997 6.74238 7.58594 6.87241 7.58594 7.00373C7.58594 7.13506 7.55997 7.26509 7.50952 7.38634C7.45907 7.50759 7.38514 7.61767 7.29199 7.71023L1.51299 13.4902L0.452987 12.4302L5.87699 7.00523L0.451987 1.58023Z" fill="#1A3D8F"/>
            </svg>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default UnitType;
