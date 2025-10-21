import { useState, useEffect, useRef } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { useNavigate, useLocation } from 'react-router-dom';
import { rtdb } from '../firebase';
import { ref, onValue } from "firebase/database";
import '../css/Filter.css'
import '../App.css'

interface SearchFilters {
  unitType: string[];
  location: string[];
  propertyType: string[];
  priceRange: [number, number];
}

function Filter() {
  // State for filter options from DB
  const [unitTypeOptions, setUnitTypeOptions] = useState<string[]>([]);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [propertyTypeOptions, setPropertyTypeOptions] = useState<string[]>([]);

  // State for filters
  const [filters, setFilters] = useState<SearchFilters>({
    unitType: [],
    location: [],
    propertyType: [],
    priceRange: [1000000, 30000000],
  });

  const [isUnitTypeOpen, setIsUnitTypeOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false);

  // Refs for dropdowns
  const unitTypeRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside or opening another dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        unitTypeRef.current &&
        !unitTypeRef.current.contains(event.target as Node) &&
        isUnitTypeOpen
      ) {
        setIsUnitTypeOpen(false);
      }
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node) &&
        isLocationOpen
      ) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUnitTypeOpen, isLocationOpen]);

  // Add state for dynamic price range
  const [dynamicPrices, setDynamicPrices] = useState<number[]>([1000000, 3000000, 5000000, 10000000, 15000000, 30000000]);

  // Fetch options from DB (like PropertiesBody)
  useEffect(() => {
    // Fetch units for unit types
    const unitsRef = ref(rtdb, "units");
    const unsubscribeUnits = onValue(unitsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const names = Object.values(data)
          .map((unit: any) => unit.name)
          .filter((name): name is string => typeof name === 'string');
        setUnitTypeOptions(Array.from(new Set(names)));
      }
    });

    // Fetch properties for location and property type
    const propertiesRef = ref(rtdb, "properties");
    const unsubscribeProps = onValue(propertiesRef, (snapshot) => {
      const data = snapshot.val();
      const props = data
        ? Object.entries(data).map(([id, value]) =>
            typeof value === 'object' && value !== null
              ? { id, ...value }
              : { id, value }
          )
        : [];

      // Locations (province)
      const locSet = new Set<string>();
      props.forEach((prop: any) => {
        if (prop.location) {
          const parts = prop.location.split(',');
          const province = parts.length > 1
            ? parts[parts.length - 1].trim()
            : prop.location.trim();
          if (province) locSet.add(province);
        }
      });
      setLocationOptions(Array.from(locSet));

      // Property types
      const typeSet = new Set<string>();
      props.forEach((prop: any) => {
        if (prop.type) {
          prop.type.split(',').forEach((typeStr: string) => {
            const t = typeStr.trim();
            if (t) typeSet.add(t);
          });
        }
      });
      setPropertyTypeOptions(Array.from(typeSet));

      // Dynamic price range
      const allPrices: number[] = [];
      props.forEach((property: any) => {
        if (property.unit) {
          Object.values(property.unit).forEach((unit: any) => {
            if (unit && typeof unit.price === 'number') {
              allPrices.push(unit.price);
            }
          });
        }
      });
      if (allPrices.length > 0) {
        const minPrice = Math.min(...allPrices);
        const maxPrice = Math.max(...allPrices);
        const roundBase = minPrice < 2000000 ? 100000 : 1000000;
        const roundedMin = Math.floor(minPrice / roundBase) * roundBase;
        const roundedMax = Math.ceil(maxPrice / roundBase) * roundBase;
        let steps = 5;
        let stepSize = Math.max(Math.round((roundedMax - roundedMin) / steps / roundBase) * roundBase, roundBase);
        if (stepSize === 0) stepSize = roundBase;
        const priceArr: number[] = [];
        for (let p = roundedMin; p < roundedMax; p += stepSize) {
          priceArr.push(p);
        }
        priceArr.push(roundedMax);
        setDynamicPrices(priceArr);
        setFilters((prev) => ({
          ...prev,
          priceRange: [priceArr[0], priceArr[priceArr.length - 1]],
        }));
      }
    });

    return () => {
      unsubscribeUnits();
      unsubscribeProps();
    };
  }, []);

  const fixedPrices = [1000000, 3000000, 5000000, 10000000, 15000000, 30000000];

  const findClosestValue = (value: number) => {
    return dynamicPrices.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
  };

  const handleMultiSelectChange = (
    field: keyof SearchFilters,
    selected: string,
    options: string[]
  ) => {
    setFilters((prev) => {
      const currentValue = prev[field];
      if (Array.isArray(currentValue)) {
        const isAlreadySelected = (currentValue as string[]).includes(selected);
        if (selected === "All Options") {
          return {
            ...prev,
            [field]: currentValue.length === options.length ? [] : options,
          };
        }
        const updatedValues = isAlreadySelected
          ? currentValue.filter((item) => item !== selected)
          : [...currentValue, selected];
        const allOptionsSelected = updatedValues.length === options.length;
        return {
          ...prev,
          [field]: allOptionsSelected ? options : updatedValues,
        };
      }
      return prev;
    });
  };

  const getPlaceholderText = (selectedOptions: string[]) => {
    if (selectedOptions.length === 0) return "Select options";
    if (selectedOptions.length > 2) {
      return `${selectedOptions.slice(0, 2).join(", ")}...`;
    }
    return selectedOptions.join(", ");
  };

  const handleCheckboxChange = (field: keyof SearchFilters) => {
    setFilters((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSliderChange = (values: number[]) => {
    const snappedValues: [number, number] = [
      findClosestValue(values[0]),
      findClosestValue(values[1]),
    ];
    setFilters((prev) => ({
      ...prev,
      priceRange: snappedValues,
    }));
  };

  // --- REDIRECT ON SEARCH ---
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    // Build query string from filters
    const params = new URLSearchParams();
    if (filters.unitType.length > 0) params.set('unitType', filters.unitType.join(','));
    if (filters.location.length > 0) params.set('location', filters.location.join(','));
    if (filters.propertyType.length > 0) params.set('propertyType', filters.propertyType.join(','));
    if (filters.priceRange.length === 2) {
      params.set('minPrice', String(filters.priceRange[0]));
      params.set('maxPrice', String(filters.priceRange[1]));
    }
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <>
      <div className="filter-cont">
        <div className="filter-card">
          <div className="dropdowns">
            {/* Multi-Select Dropdown for Unit Type */}
            <div className="multi-select-dropdown" ref={unitTypeRef}>
              <label>Unit Type</label>
              <div
                className={`dropdown-placeholder ${isUnitTypeOpen ? 'selected' : ''}`} 
                onClick={() => {
                  setIsUnitTypeOpen((open) => {
                    if (!open) {
                      setIsLocationOpen(false);
                      setIsPropertyTypeOpen(false);
                    }
                    return !open;
                  });
                }}
              >
                {getPlaceholderText(filters.unitType)}
                <span className="dropdown-arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="7"
                    fill="currentColor"
                    viewBox="0 0 12 7"
                  >
                    <path
                      d={
                        isUnitTypeOpen
                          ? "M0.147077 6.35435C-0.0485327 6.15944 -0.0490966 5.84285 0.145817 5.64724L5.6108 0.162761C5.82574 -0.0529522 6.17505 -0.0529512 6.39 0.162761L11.855 5.64724C12.0499 5.84285 12.0493 6.15944 11.8537 6.35435C11.6581 6.54926 11.3415 6.5487 11.1466 6.35309L6.0004 1.18851L0.854183 6.35309C0.659269 6.5487 0.342687 6.54926 0.147077 6.35435Z"
                          : "M11.8527 0.645818C12.0484 0.840732 12.0489 1.15731 11.854 1.35292L6.38902 6.83741C6.17408 7.05312 5.82477 7.05312 5.60982 6.83741L0.14484 1.35292C-0.0500734 1.15731 -0.0495088 0.840731 0.1461 0.645817C0.34171 0.450903 0.658292 0.451467 0.853206 0.647077L5.99942 5.81166L11.1456 0.647077C11.3406 0.451468 11.6571 0.450904 11.8527 0.645818Z"
                      }
                      fill="#616161"
                    />
                  </svg>
                </span>
              </div>
              {isUnitTypeOpen && (
                <div className="dropdown-menu">
                  <label className="dropdown-option">
                    <input
                      type="checkbox"
                      checked={filters.unitType.length === unitTypeOptions.length}
                      onChange={() =>
                        handleMultiSelectChange(
                          "unitType",
                          "All Options",
                          unitTypeOptions
                        )
                      }
                    />
                    All Options
                  </label>
                  {unitTypeOptions.map((type, index) => (
                    <label key={index} className="dropdown-option">
                      <input
                        type="checkbox"
                        checked={filters.unitType.includes(type)}
                        onChange={() =>
                          handleMultiSelectChange("unitType", type, unitTypeOptions)
                        }
                      />
                      {type}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Multi-Select Dropdown for Location */}
            <div className="multi-select-dropdown" ref={locationRef}>
              <label>Location</label>
              <div
                className="dropdown-placeholder"
                onClick={() => {
                  setIsLocationOpen((open) => {
                    if (!open) {
                      setIsUnitTypeOpen(false);
                      setIsPropertyTypeOpen(false);
                    }
                    return !open;
                  });
                }}
              >
                {getPlaceholderText(filters.location)}
                <span className="dropdown-arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="7"
                    fill="currentColor"
                    viewBox="0 0 12 7"
                  >
                    <path
                      d={isLocationOpen ? 
                        "M0.147077 6.35435C-0.0485327 6.15944 -0.0490966 5.84285 0.145817 5.64724L5.6108 0.162761C5.82574 -0.0529522 6.17505 -0.0529512 6.39 0.162761L11.855 5.64724C12.0499 5.84285 12.0493 6.15944 11.8537 6.35435C11.6581 6.54926 11.3415 6.5487 11.1466 6.35309L6.0004 1.18851L0.854183 6.35309C0.659269 6.5487 0.342687 6.54926 0.147077 6.35435Z"
                        : 
                        "M11.8527 0.645818C12.0484 0.840732 12.0489 1.15731 11.854 1.35292L6.38902 6.83741C6.17408 7.05312 5.82477 7.05312 5.60982 6.83741L0.14484 1.35292C-0.0500734 1.15731 -0.0495088 0.840731 0.1461 0.645817C0.34171 0.450903 0.658292 0.451467 0.853206 0.647077L5.99942 5.81166L11.1456 0.647077C11.3406 0.451468 11.6571 0.450904 11.8527 0.645818Z" 
                      }
                      fill="#616161"
                    />
                  </svg>
                </span>
              </div>
              {isLocationOpen && (
                <div className="dropdown-menu">
                  <label className="dropdown-option">
                    <input
                      type="checkbox"
                      checked={filters.location.length === locationOptions.length}
                      onChange={() =>
                        handleMultiSelectChange(
                          "location",
                          "All Options",
                          locationOptions
                        )
                      }
                    />
                    All Options
                  </label>
                  {locationOptions.map((loc, index) => (
                    <label key={index} className="dropdown-option">
                      <input
                        type="checkbox"
                        checked={filters.location.includes(loc)}
                        onChange={() =>
                          handleMultiSelectChange("location", loc, locationOptions)
                        }
                      />
                      {loc}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Property Type Checkboxes */}
          <div className="checkboxes" style={{ margin: "16px 0" }}>
            {propertyTypeOptions.map((type, idx) => (
              <div key={idx} className="checkb-wrapper">
                <input
                  type="checkbox"
                  id={`propertyType-${type}`}
                  checked={filters.propertyType.includes(type)}
                  onChange={() => {
                    setFilters((prev) => {
                      const already = prev.propertyType.includes(type);
                      return {
                        ...prev,
                        propertyType: already
                          ? prev.propertyType.filter((t) => t !== type)
                          : [...prev.propertyType, type],
                      };
                    });
                  }}
                />
                <label htmlFor={`propertyType-${type}`}>{type}</label>
              </div>
            ))}
          </div>

          {/* Price Range Slider */}
          <div className="slider-container">
            <label>Budget</label>
            <div className="slider-wrapper">
              <Range
                min={0}
                max={dynamicPrices.length - 1}
                values={[
                  dynamicPrices.indexOf(filters.priceRange[0]),
                  dynamicPrices.indexOf(filters.priceRange[1]),
                ]}
                onChange={(indices) => {
                  const snappedValues: [number, number] = [
                    dynamicPrices[indices[0]],
                    dynamicPrices[indices[1]],
                  ];
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: snappedValues,
                  }));
                }}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '2px',
                      width: '100%',
                      background: getTrackBackground({
                        values: [
                          filters.priceRange.map((value) =>
                            dynamicPrices.indexOf(value)
                          )[0],
                          filters.priceRange.map((value) =>
                            dynamicPrices.indexOf(value)
                          )[1],
                        ],
                        colors: ['#ddd', '#1A3D8F', '#ddd'],
                        min: 0,
                        max: dynamicPrices.length - 1,
                      }),
                      borderRadius: '4px',
                      position: 'relative',
                    }}
                  >
                    {dynamicPrices.map((value, index) => (
                      <div
                        key={index}
                        style={{
                          position: 'absolute',
                          left: `${(index / (dynamicPrices.length - 1)) * 100}%`,
                          top: '0',
                          height: '18px',
                          width: '0.5px',
                          backgroundColor: '#8B8B8B',
                          transform: 'translateX(-50%)',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '20px',
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
                            {value >= 1000000 ? `${Math.round(value / 1000000)}M` : `${Math.round(value / 1000)}K`}
                          </span>
                        </div>
                      </div>
                    ))}
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
                  </div>
                )}
              />
            </div>
          </div>

          {/* Search Button */}
          <div>
            <button className='search-btn' onClick={handleSearch}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.5018 26.0931L20.8519 19.4445C22.7793 17.1305 23.7404 14.1625 23.5352 11.1579C23.3301 8.15339 21.9745 5.34358 19.7505 3.31303C17.5265 1.28248 14.6052 0.187529 11.5944 0.255954C8.58366 0.324379 5.71517 1.55091 3.58568 3.6804C1.45618 5.80989 0.229652 8.67838 0.161227 11.6892C0.0928024 14.6999 1.18775 17.6212 3.2183 19.8452C5.24885 22.0693 8.05866 23.4248 11.0632 23.63C14.0678 23.8351 17.0358 22.874 19.3497 20.9466L25.9983 27.5965C26.0971 27.6952 26.2143 27.7735 26.3432 27.827C26.4722 27.8804 26.6105 27.9079 26.7501 27.9079C26.8897 27.9079 27.0279 27.8804 27.1569 27.827C27.2859 27.7735 27.4031 27.6952 27.5018 27.5965C27.6005 27.4978 27.6788 27.3806 27.7322 27.2516C27.7857 27.1226 27.8132 26.9844 27.8132 26.8448C27.8132 26.7052 27.7857 26.5669 27.7322 26.438C27.6788 26.309 27.6005 26.1918 27.5018 26.0931ZM2.31256 11.9698C2.31256 10.0785 2.87339 8.22969 3.92413 6.65714C4.97487 5.0846 6.46833 3.85895 8.21565 3.13519C9.96297 2.41142 11.8857 2.22206 13.7406 2.59103C15.5956 2.96 17.2994 3.87074 18.6368 5.20808C19.9741 6.54542 20.8848 8.24929 21.2538 10.1042C21.6228 11.9592 21.4334 13.8819 20.7097 15.6292C19.9859 17.3765 18.7602 18.87 17.1877 19.9207C15.6152 20.9715 13.7663 21.5323 11.8751 21.5323C9.33979 21.5295 6.90916 20.5211 5.11646 18.7284C3.32375 16.9357 2.31537 14.5051 2.31256 11.9698Z" fill="white" />
              </svg>
              <p>Search</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;