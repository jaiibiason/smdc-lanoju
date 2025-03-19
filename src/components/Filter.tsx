import { useState } from 'react';
import '../css/Filter.css'
import '../App.css'

interface SearchFilters {
    propertyType: string;
    location: string;
    hasGarage: boolean;
    hasGarden: boolean;
    priceRange: [number, number];
  }

function Filter(){

    // State for filters
  const [filters, setFilters] = useState<SearchFilters>({
    propertyType: '',
    location: '',
    hasGarage: false,
    hasGarden: false,
    priceRange: [1000000, 3000000], // Example price range
  });

  // Fixed price range values
  const fixedPrices = [1000000, 3000000, 5000000, 10000000, 15000000, 30000000];

  const handleDropdownChange = (field: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field: keyof SearchFilters) => {
    setFilters((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSliderChange = (indexRange: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [fixedPrices[indexRange[0]], fixedPrices[indexRange[1]]],
    }));
  };

  const handleSearch = () => {
    console.log('Searching properties with filters:', filters);
    // Perform search logic here (e.g., API call)
  };

    return(
        <>
        <div className="filter-cont">
            <div className="filter-card">

                {/* Dropdown for property type */}
      <div>
        <label>Location</label>
        <select
          value={filters.propertyType}
          onChange={(e) => handleDropdownChange('propertyType', e.target.value)}
        >
          <option value="">Select</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
        </select>
      </div>

      {/* Dropdown for location */}
      <div>
        <label>Unit Type</label>
        <select
          value={filters.location}
          onChange={(e) => handleDropdownChange('location', e.target.value)}
        >
          <option value="">Select</option>
          <option value="city">City</option>
          <option value="suburb">Suburb</option>
        </select>
      </div>

      {/* Checkboxes */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={filters.hasGarage}
            onChange={() => handleCheckboxChange('hasGarage')}
          />
          Preselling
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.hasGarden}
            onChange={() => handleCheckboxChange('hasGarden')}
          />
          Ready for Occupancy
        </label>
      </div>

      {/* Price Range Slider */}
      <div>
        <label>
            Budget
          Price Range: {`${filters.priceRange[0] / 1000000}M - ${filters.priceRange[1] / 1000000}M`}
        </label>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max={fixedPrices.length - 1}
            step="1"
            value={fixedPrices.indexOf(filters.priceRange[0])}
            onChange={(e) =>
              handleSliderChange([
                parseInt(e.target.value),
                fixedPrices.indexOf(filters.priceRange[1]),
              ])
            }
          />
          <input
            type="range"
            min="0"
            max={fixedPrices.length - 1}
            step="1"
            value={fixedPrices.indexOf(filters.priceRange[1])}
            onChange={(e) =>
              handleSliderChange([
                fixedPrices.indexOf(filters.priceRange[0]),
                parseInt(e.target.value),
              ])
            }
          />
        </div>
      </div>

      {/* Search Button */}
      <button onClick={handleSearch}>Search</button>

            </div>
        </div>
        </>
    )
}

export default Filter