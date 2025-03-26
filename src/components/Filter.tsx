import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import '../css/Filter.css'
import '../App.css'

interface SearchFilters {
  propertyType: string;
  location: string;
  hasGarage: boolean;
  hasGarden: boolean;
  priceRange: [number, number];
}

function Filter() {

  // State for filters
  const [filters, setFilters] = useState<SearchFilters>({
    propertyType: '',
    location: '',
    hasGarage: false,
    hasGarden: false,
    priceRange: [1000000, 30000000], // Example price range
  });

  // Fixed price range values
  const fixedPrices = [1000000, 3000000, 5000000, 10000000, 15000000, 30000000];

  const MIN = -1000000; // Minimum slider value
  const MAX = 32000000; // Maximum slider value

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

  const findClosestValue = (value: number) => {
    return fixedPrices.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
  };

  const handleSliderChange = (values: number[]) => {
    // Snap both thumbs to the nearest fixed price
    const snappedValues: [number, number] = [
      findClosestValue(values[0]),
      findClosestValue(values[1]),
    ];
    setFilters((prev) => ({
      ...prev,
      priceRange: snappedValues,
    }));
  };

  const handleSearch = () => {
    console.log('Searching properties with filters:', filters);
    // Perform search logic here (e.g., API call)
  };

  return (
    <>
      <div className="filter-cont">
        <div className="filter-card">

          <div className="dropdowns">
            {/* Dropdown for property type */}
            <div>
              <label>Location</label>
              <select
                value={filters.propertyType}
                onChange={(e) => handleDropdownChange('propertyType', e.target.value)}
              >
                <option value="">Select a location</option>
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
                <option value="">Select a unit type</option>
                <option value="city">City</option>
                <option value="suburb">Suburb</option>
              </select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className='checkboxes'>
            <div className="checkb-wrapper">
                <input
                  type="checkbox"
                  checked={filters.hasGarage}
                  onChange={() => handleCheckboxChange('hasGarage')}
                  />
                  <label>
                    Preselling
                  </label>
            </div>
            <div className="checkb-wrapper">
                <input
                  type="checkbox"
                  checked={filters.hasGarden}
                  onChange={() => handleCheckboxChange('hasGarden')}
                  />
                  <label>
                    Ready for Occupancy
                  </label>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="slider-container">
            <label>Budget</label>
            <div className="slider-wrapper">
              <Range
                step={1000000}
                min={MIN}
                max={MAX}
                values={filters.priceRange}
                onChange={handleSliderChange}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '2px',
                      width: '100%',
                      background: getTrackBackground({
                        values: filters.priceRange,
                        colors: ['#ddd', '#1A3D8F', '#ddd'],
                        min: MIN,
                        max: MAX,
                      }),
                      borderRadius: '4px',
                      position: 'relative',
                    }}
                  >
                    {/* Render Static Labels (Marks) */}
                    {fixedPrices.map((value, index) => {
                      const position =
                        ((value - MIN) / (MAX - MIN)) * 100; // Proportional position for marks
                      return (

                        <div
                          key={index}
                          style={{
                            position: 'absolute',
                            left: `${position}%`,
                            top: '8px', // Align marks to be above the slider
                            height: '18px', // Height of the thin line
                            width: '0.5px', // Thin vertical line
                            backgroundColor: '#8B8B8B',
                            transform: 'translateX(-50%)',
                          }}
                        >
                          {/* Static Labels Below Marks */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '15px', // Adjust this value for spacing between line and label
                              textAlign: 'center',
                              transform: 'translateX(-50%)',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '10px',
                                color: '#8B8B8B',
                              }}
                            >
                              {value / 1000000}M
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    {children}
                  </div>
                )}
                renderThumb={({ props, index, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '14px',
                      width: '14px',
                      backgroundColor: '#1A3D8F',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      border: isDragged ? '2px solid white' : 'none',
                    }}
                  >
                    {/* Optional: Dynamic label above thumbs */}
                    {/* <div
                      style={{
                        position: 'absolute',
                        top: '-28px',
                        color: '#555',
                        fontWeight: 'bold',
                        fontSize: '12px',
                      }}
                    >
                      {filters.priceRange[index] / 1000000}M
                    </div> */}
                  </div>
                )}
              />
            </div>

            {/* Display Selected Price Range
      <p>
        Selected Price Range: {filters.priceRange[0] / 1000000}M -{' '}
        {filters.priceRange[1] / 1000000}M
      </p> */}
          </div>
          {/* Search Button */}
          <button onClick={handleSearch}>Search</button>

        </div>
      </div>
    </>
  )
}

export default Filter