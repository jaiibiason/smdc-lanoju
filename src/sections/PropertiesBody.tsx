import "../css/Properties.css"; // Import styles
import "../css/MainBody.css"; // Import new styles for main body
import magnifyingGlassIcon from "../assets/ph_magnifying-glass-light.svg"; // Import the icon
import arrowUpIcon from "../assets/ep_arrow-up.svg"; // Import the arrow-up icon
import arrowDownIcon from "../assets/ep_arrow-down.svg"; // Import the arrow-down icon
import HeaderImg from '../assets/temp_prptHeader.png'
import locationIcon from "../assets/lsicon_location-outline.svg"; // Import location icon
import { useState, useEffect } from 'react'; // Import useState and useEffect
import { Range, getTrackBackground } from 'react-range'; // Import Range and getTrackBackground
import mageFilterIcon from "../assets/mage_filter-2.svg"; // Import the filter icon
import closeFilterIcon from "../assets/close_filter.svg"; // Import close icon

function PropertiesBody() {
    const propertyCount = 0; // Define propertyCount with a default value

    // Fixed price range values
    const fixedPrices = [1000000, 3000000, 5000000, 10000000, 15000000, 30000000];

    // State for slider values
    const [priceRange, setPriceRange] = useState<[number, number]>([0, fixedPrices.length - 1]);

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
        setPriceRange([fixedPrices.indexOf(snappedValues[0]), fixedPrices.indexOf(snappedValues[1])]);
        console.log('Selected Price Range:', snappedValues);
    };

    // State for location section collapse
    const [isLocationCollapsed, setIsLocationCollapsed] = useState(false);

    // Dynamic location options
    const rawLocations = ["Manila", "Makati", "Cebu", "Albay"];
    const locationOptions =
        rawLocations.length > 1
            ? ["All Locations", ...rawLocations.sort()]
            : rawLocations.sort(); // Hide "All Locations" if only one location exists
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

    const handleLocationChange = (location: string) => {
        if (location === "All Locations") {
            if (selectedLocations.includes("All Locations")) {
                // Deselect "All Locations" and all other locations
                setSelectedLocations([]);
            } else {
                // Select all locations
                setSelectedLocations(locationOptions);
            }
        } else {
            setSelectedLocations((prev) => {
                const updatedLocations = prev.includes(location)
                    ? prev.filter((loc) => loc !== location) // Deselect the location
                    : [...prev, location]; // Select the location

                // Automatically deselect "All Locations" if a single location is deselected
                if (prev.includes("All Locations") && !updatedLocations.includes(location)) {
                    return updatedLocations.filter((loc) => loc !== "All Locations");
                }

                // Automatically select "All Locations" if all other locations are selected
                if (updatedLocations.length === locationOptions.length - 1) {
                    return [...updatedLocations, "All Locations"];
                }

                return updatedLocations;
            });
        }
    };

    // State for unit type section collapse
    const [isUnitTypeCollapsed, setIsUnitTypeCollapsed] = useState(false);
    const unitTypeOptions = ["Studio", "1 Bedroom", "2 Bedrooms", "3+ Bedrooms"];
    const [selectedUnitTypes, setSelectedUnitTypes] = useState<string[]>([]);

    const handleUnitTypeChange = (unitType: string) => {
        if (unitType === "All Unit") {
            if (selectedUnitTypes.includes("All Unit")) {
                // Deselect "All Unit" and all other unit types
                setSelectedUnitTypes([]);
            } else {
                // Select all unit types
                setSelectedUnitTypes(["All Unit", ...unitTypeOptions]);
            }
        } else {
            setSelectedUnitTypes((prev) => {
                const updatedUnitTypes = prev.includes(unitType)
                    ? prev.filter((type) => type !== unitType) // Deselect the unit type
                    : [...prev, unitType]; // Select the unit type

                // Automatically deselect "All Unit" if a single unit type is deselected
                if (prev.includes("All Unit") && !updatedUnitTypes.includes(unitType)) {
                    return updatedUnitTypes.filter((type) => type !== "All Unit");
                }

                // Automatically select "All Unit" if all other unit types are selected
                if (updatedUnitTypes.length === unitTypeOptions.length) {
                    return ["All Unit", ...unitTypeOptions];
                }

                return updatedUnitTypes;
            });
        }
    };

    // State for property type section collapse
    const [isPropertyTypeCollapsed, setIsPropertyTypeCollapsed] = useState(false);
    const propertyTypeOptions = ["Residential", "Commercial", "Land"];
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);

    const handlePropertyTypeChange = (propertyType: string) => {
        if (propertyType === "All Property") {
            if (selectedPropertyTypes.includes("All Property")) {
                // Deselect "All Property" and all other property types
                setSelectedPropertyTypes([]);
            } else {
                // Select all property types
                setSelectedPropertyTypes(["All Property", ...propertyTypeOptions]);
            }
        } else {
            setSelectedPropertyTypes((prev) => {
                const updatedPropertyTypes = prev.includes(propertyType)
                    ? prev.filter((type) => type !== propertyType) // Deselect the property type
                    : [...prev, propertyType]; // Select the property type

                // Automatically deselect "All Property" if a single property type is deselected
                if (prev.includes("All Property") && !updatedPropertyTypes.includes(propertyType)) {
                    return updatedPropertyTypes.filter((type) => type !== "All Property");
                }

                // Automatically select "All Property" if all other property types are selected
                if (updatedPropertyTypes.length === propertyTypeOptions.length) {
                    return ["All Property", ...propertyTypeOptions];
                }

                return updatedPropertyTypes;
            });
        }
    };

    // Property details
    const status = "Ready for Occupancy";
    const propertyName = "Property Name";
    const price = "₱ 1,000,000 - 15,000,000";
    const location = "Example City";
    const amenities = ["Swimming Pool", "Gym", "Parking", "24-Hour Security"];
    const landmarks = ["0.9km away from St. Paul College Pasig", "1.3km away from Rizal Medical Hospital", "0.3km away from SM Hypermarket Pasig", "1.9km away from SM Megamall"];

    // Responsive state for mobile and tablet
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const updateScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 480);
            setIsTablet(width > 480 && width <= 960);
        };

        updateScreenSize(); // Initial check
        window.addEventListener("resize", updateScreenSize);

        return () => window.removeEventListener("resize", updateScreenSize);
    }, []);

    // Sort dropdown state
    const sortOptions = [
        { value: "all", label: "All Properties" },
        { value: "residential", label: "Relevance" },
        { value: "commercial", label: "Pricing Low to High" },
        { value: "land", label: "Pricing High to Low" }
    ];
    const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    return (
        <div>
            <div className="properties-body-container">
                <div className="left-section">
                    <p>Showing {propertyCount} properties</p>
                </div>
                {/* Only show sort filter here on desktop */}
                {!(isMobile || isTablet) && (
                    <div className="right-section" style={{ position: "relative" }}>
                        <span className="properties-sort">Sort by:</span>
                        {/* Custom dropdown UI */}
                        <div
                            className={`properties-dropdown-placeholder${isSortDropdownOpen ? " selected" : ""}`}
                            style={{ width: 218, minWidth: 150, marginTop: 5, cursor: "pointer" }}
                            onClick={() => setIsSortDropdownOpen((prev) => !prev)}
                            tabIndex={0}
                            onBlur={() => setIsSortDropdownOpen(false)}
                        >
                            {sortOptions.find(opt => opt.value === selectedSort)?.label}
                            <span className="properties-dropdown-arrow" style={{ marginLeft: 8 }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="7"
                                    fill="currentColor"
                                    viewBox="0 0 12 7"
                                >
                                    <path
                                        d={
                                            isSortDropdownOpen
                                                ? "M0.147077 6.35435C-0.0485327 6.15944 -0.0490966 5.84285 0.145817 5.64724L5.6108 0.162761C5.82574 -0.0529522 6.17505 -0.0529512 6.39 0.162761L11.855 5.64724C12.0499 5.84285 12.0493 6.15944 11.8537 6.35435C11.6581 6.54926 11.3415 6.5487 11.1466 6.35309L6.0004 1.18851L0.854183 6.35309C0.659269 6.5487 0.342687 6.54926 0.147077 6.35435Z"
                                                : "M11.8527 0.645818C12.0484 0.840732 12.0489 1.15731 11.854 1.35292L6.38902 6.83741C6.17408 7.05312 5.82477 7.05312 5.60982 6.83741L0.14484 1.35292C-0.0500734 1.15731 -0.0495088 0.840731 0.1461 0.645817C0.34171 0.450903 0.658292 0.451467 0.853206 0.647077L5.99942 5.81166L11.1456 0.647077C11.3406 0.451468 11.6571 0.450904 11.8527 0.645818Z"
                                        }
                                        fill="#616161"
                                    />
                                </svg>
                            </span>
                        </div>
                        {isSortDropdownOpen && (
                            <div
                                className="properties-dropdown-menu"
                                style={{
                                    position: "absolute",
                                    right: 0,
                                    top: "100%",
                                    width: 218,
                                    zIndex: 1001
                                }}
                            >
                                {sortOptions.map((opt) => (
                                    <div
                                        key={opt.value}
                                        className="properties-dropdown-option"
                                        style={{
                                            background: selectedSort === opt.value ? "#f0f0f0" : undefined,
                                            fontWeight: selectedSort === opt.value ? 600 : 400,
                                        }}
                                        onMouseDown={() => {
                                            setSelectedSort(opt.value);
                                            setIsSortDropdownOpen(false);
                                        }}
                                    >
                                        {opt.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="main-body">
                <div className="left-main-section">
                    {/* 2. Search bar */}
                    <div className="search-bar-container">
                        <input 
                            type="text" 
                            className="search-bar" 
                            placeholder="Search for an SMDC property" 
                        />
                        <span className="search-icon">
                            <img src={magnifyingGlassIcon} alt="Search" />
                        </span>
                    </div>
                    {/* 3. Sort filter for mobile */}
                    {(isMobile || isTablet) && (
                        <div className="right-section" style={{ margin: "16px 0" }}>
                            <span className="Sort">Sort by: </span>
                            {/* Use native select for mobile/tablet */}
                            <select
                                className="dropdown"
                                value={selectedSort}
                                onChange={e => setSelectedSort(e.target.value)}
                            >
                                {sortOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    {/* Mobile: Filter button */}
                    {(isMobile || isTablet) && (
                        <button
                            className="mobile-filter-btn"
                            onClick={() => setShowFilters((prev) => !prev)}
                        >
                            <img src={mageFilterIcon} alt="Filter" />
                            Filter
                        </button>
                    )}

                    {/* Overlay mobile filters */}
                    {(isMobile || isTablet) && showFilters && (
                        <div className="mobile-filters-overlay">
                            <div className="mobile-filters-header" style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <img src={mageFilterIcon} alt="Filter Icon" style={{ width: 24, height: 24 }} />
                                    <span>Filters</span>
                                </div>
                                <button
                                    className="mobile-filters-close"
                                    onClick={() => setShowFilters(false)}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="mobile-filters-content">
                                {/* Location Filter */}
                                <div className="location-container">
                                    <div
                                        className="location-header"
                                        onClick={() => setIsLocationCollapsed(!isLocationCollapsed)}
                                    >
                                        <span>
                                            <span className="arrowIcon">
                                                <img
                                                    src={isLocationCollapsed ? arrowDownIcon : arrowUpIcon}
                                                    alt={isLocationCollapsed ? "Expand" : "Collapse"}
                                                    className="location-arrow-icon"
                                                />
                                            </span>
                                            Location <span className="filter-count">(
                                                {selectedLocations.includes("All Locations")
                                                    ? locationOptions.length - 1
                                                    : selectedLocations.length}
                                            )</span>
                                        </span>
                                    </div>
                                    {!isLocationCollapsed && (
                                        <div className="selected-filters">
                                            {selectedLocations
                                                .filter((location) => location !== "All Locations")
                                                .map((location, index) => (
                                                    <div key={index} className="selected-filter">
                                                        {location}
                                                        <span onClick={() => handleLocationChange(location)}>
                                                            <img src={closeFilterIcon} alt="Remove" style={{ width: "100%", height: "100%" }} />
                                                        </span>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                    {!isLocationCollapsed && (
                                        <div className="location-options">
                                            {locationOptions.map((location, index) => (
                                                <label key={index}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedLocations.includes(location)}
                                                        onChange={() => handleLocationChange(location)}
                                                    />
                                                    {location}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {/* Unit Type Filter */}
                                <div className="unit-type-container">
                                    <div
                                        className="unit-type-header"
                                        onClick={() => setIsUnitTypeCollapsed(!isUnitTypeCollapsed)}
                                    >
                                        <span>
                                            <span className="arrowIcon">
                                                <img
                                                    src={isUnitTypeCollapsed ? arrowDownIcon : arrowUpIcon}
                                                    alt={isUnitTypeCollapsed ? "Expand" : "Collapse"}
                                                    className="unit-type-arrow-icon"
                                                />
                                            </span>
                                            Unit Type <span className="filter-count">(
                                                {selectedUnitTypes.includes("All Unit")
                                                    ? unitTypeOptions.length
                                                    : selectedUnitTypes.length}
                                            )</span>
                                        </span>
                                    </div>
                                    {!isUnitTypeCollapsed && (
                                        <div className="selected-filters">
                                            {selectedUnitTypes
                                                .filter((unitType) => unitType !== "All Unit")
                                                .map((unitType, index) => (
                                                    <div key={index} className="selected-filter">
                                                        {unitType}
                                                        <span onClick={() => handleUnitTypeChange(unitType)}>
                                                            <img src={closeFilterIcon} alt="Remove" style={{ width: "100%", height: "100%" }} />
                                                        </span>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                    {!isUnitTypeCollapsed && (
                                        <div className="unit-type-options">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUnitTypes.includes("All Unit")}
                                                    onChange={() => handleUnitTypeChange("All Unit")}
                                                />
                                                All Unit
                                            </label>
                                            {unitTypeOptions.map((unitType, index) => (
                                                <label key={index}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedUnitTypes.includes(unitType)}
                                                        onChange={() => handleUnitTypeChange(unitType)}
                                                    />
                                                    {unitType}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {/* Property Type Filter */}
                                <div className="property-type-container">
                                    <div
                                        className="property-type-header"
                                        onClick={() => setIsPropertyTypeCollapsed(!isPropertyTypeCollapsed)}
                                    >
                                        <span>
                                            <span className="arrowIcon">
                                                <img
                                                    src={isPropertyTypeCollapsed ? arrowDownIcon : arrowUpIcon}
                                                    alt={isPropertyTypeCollapsed ? "Expand" : "Collapse"}
                                                    className="property-type-arrow-icon"
                                                />
                                            </span>
                                            Property Type <span className="filter-count">(
                                                {selectedPropertyTypes.includes("All Property")
                                                    ? propertyTypeOptions.length
                                                    : selectedPropertyTypes.length}
                                            )</span>
                                        </span>
                                    </div>
                                    {!isPropertyTypeCollapsed && (
                                        <div className="selected-filters">
                                            {selectedPropertyTypes
                                                .filter((propertyType) => propertyType !== "All Property")
                                                .map((propertyType, index) => (
                                                    <div key={index} className="selected-filter">
                                                        {propertyType}
                                                        <span onClick={() => handlePropertyTypeChange(propertyType)}>
                                                            <img src={closeFilterIcon} alt="Remove" style={{ width: "100%", height: "100%" }} />
                                                        </span>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                    {!isPropertyTypeCollapsed && (
                                        <div className="property-type-options">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPropertyTypes.includes("All Property")}
                                                    onChange={() => handlePropertyTypeChange("All Property")}
                                                />
                                                All Property
                                            </label>
                                            {propertyTypeOptions.map((propertyType, index) => (
                                                <label key={index}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedPropertyTypes.includes(propertyType)}
                                                        onChange={() => handlePropertyTypeChange(propertyType)}
                                                    />
                                                    {propertyType}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mobile-filters-actions">
                                <button
                                    className="mobile-apply-filter-btn"
                                    onClick={() => setShowFilters(false)}
                                >
                                    Apply Filter
                                </button>
                                <button
                                    className="mobile-clear-filter-btn"
                                    onClick={() => {
                                        setSelectedLocations([]);
                                        setSelectedUnitTypes([]);
                                        setSelectedPropertyTypes([]);
                                        setPriceRange([0, fixedPrices.length - 1]);
                                    }}
                                >
                                    Clear Filter
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="property-slider-container">
                        <label>Budget</label>
                        <div className="slider-wrapper">
                            <Range
                                min={0} // Slider track starts from 0 (even spacing index)
                                max={fixedPrices.length - 1} // Slider track ends at the last index of fixedPrices
                                values={priceRange} // Use state for slider values
                                onChange={(indices) => {
                                    const snappedValues: [number, number] = [
                                        fixedPrices[indices[0]],
                                        fixedPrices[indices[1]],
                                    ];
                                    handleSliderChange(snappedValues);
                                }}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '2px',
                                            width: '100%',
                                            background: getTrackBackground({
                                                values: priceRange,
                                                colors: ['#ddd', '#1A3D8F', '#ddd'],
                                                min: 0,
                                                max: fixedPrices.length - 1,
                                            }),
                                            borderRadius: '4px',
                                            position: 'relative',
                                        }}
                                    >
                                        {fixedPrices.map((value, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    position: 'absolute',
                                                    left: `${(index / (fixedPrices.length - 1)) * 100}%`,
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
                                                        {value / 1000000}M
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
                                    />
                                )}
                            />
                        </div>

                        <div className="min-max-container">
                            <div className="min-section">
                                <label>Min</label>
                                <select
                                    className="dropdown"
                                    value={fixedPrices[priceRange[0]]}
                                    onChange={(e) => {
                                        const newMin = parseInt(e.target.value, 10);
                                        setPriceRange([
                                            fixedPrices.indexOf(newMin),
                                            priceRange[1],
                                        ]);
                                    }}
                                >
                                    {fixedPrices.map((price, index) => (
                                        <option
                                            key={index}
                                            value={price}
                                            disabled={index > priceRange[1]} // Disable options greater than the selected max
                                        >
                                            {price / 1000000}M
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="max-section">
                                <label>Max</label>
                                <select
                                    className="dropdown"
                                    value={fixedPrices[priceRange[1]]}
                                    onChange={(e) => {
                                        const newMax = parseInt(e.target.value, 10);
                                        setPriceRange([
                                            priceRange[0],
                                            fixedPrices.indexOf(newMax),
                                        ]);
                                    }}
                                >
                                    {fixedPrices.map((price, index) => (
                                        <option
                                            key={index}
                                            value={price}
                                            disabled={index < priceRange[0]} // Disable options less than the selected min
                                        >
                                            {price / 1000000}M
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="location-container">
                        <div
                            className="location-header"
                            onClick={() => setIsLocationCollapsed(!isLocationCollapsed)}
                        >
                            <span>
                                <span className="arrowIcon">
                                    <img
                                        src={isLocationCollapsed ? arrowDownIcon : arrowUpIcon}
                                        alt={isLocationCollapsed ? "Expand" : "Collapse"}
                                        className="location-arrow-icon"
                                    />
                                    </span>
                                Location <span className="filter-count">(
                                    {selectedLocations.includes("All Locations") 
                                        ? locationOptions.length - 1 
                                        : selectedLocations.length}
                                )</span>
                            </span>
                        </div>
                        {!isLocationCollapsed && (
                            <div className="selected-filters">
                                {selectedLocations
                                    .filter((location) => location !== "All Locations")
                                    .map((location, index) => (
                                        <div key={index} className="selected-filter">
                                            {location}
                                            <span onClick={() => handleLocationChange(location)}>
                                                <img src={closeFilterIcon} alt="Remove" style={{ width: "100%", height: "100%" }} />
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        )}
                        {!isLocationCollapsed && (
                            <div className="location-options">
                                {locationOptions.map((location, index) => (
                                    <label key={index}>
                                        <input
                                            type="checkbox"
                                            checked={selectedLocations.includes(location)}
                                            onChange={() => handleLocationChange(location)}
                                        />
                                        {location}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="unit-type-container">
                        <div
                            className="unit-type-header"
                            onClick={() => setIsUnitTypeCollapsed(!isUnitTypeCollapsed)}
                        >
                            <span>
                                <span className="arrowIcon">
                                    <img
                                        src={isUnitTypeCollapsed ? arrowDownIcon : arrowUpIcon}
                                        alt={isUnitTypeCollapsed ? "Expand" : "Collapse"}
                                        className="unit-type-arrow-icon"
                                    />
                                </span>
                                Unit Type <span className="filter-count">(
                                    {selectedUnitTypes.includes("All Unit") 
                                        ? unitTypeOptions.length 
                                        : selectedUnitTypes.length}
                                )</span>
                            </span>
                        </div>
                        {!isUnitTypeCollapsed && (
                            <div className="selected-filters">
                                {selectedUnitTypes
                                    .filter((unitType) => unitType !== "All Unit")
                                    .map((unitType, index) => (
                                        <div key={index} className="selected-filter">
                                            {unitType}
                                            <span onClick={() => handleUnitTypeChange(unitType)}>
                                                <img src={closeFilterIcon} alt="Remove" style={{ width: "100%", height: "100%" }} />
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        )}
                        {!isUnitTypeCollapsed && (
                            <div className="unit-type-options">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedUnitTypes.includes("All Unit")}
                                        onChange={() => handleUnitTypeChange("All Unit")}
                                    />
                                    All Unit
                                </label>
                                {unitTypeOptions.map((unitType, index) => (
                                    <label key={index}>
                                        <input
                                            type="checkbox"
                                            checked={selectedUnitTypes.includes(unitType)}
                                            onChange={() => handleUnitTypeChange(unitType)}
                                        />
                                        {unitType}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="property-type-container">
                        <div
                            className="property-type-header"
                            onClick={() => setIsPropertyTypeCollapsed(!isPropertyTypeCollapsed)}
                        >
                            <span>
                                <span className="arrowIcon">
                                    <img
                                        src={isPropertyTypeCollapsed ? arrowDownIcon : arrowUpIcon}
                                        alt={isPropertyTypeCollapsed ? "Expand" : "Collapse"}
                                        className="property-type-arrow-icon"
                                    />
                                </span>
                                Property Type <span className="filter-count">(
                                    {selectedPropertyTypes.includes("All Property") 
                                        ? propertyTypeOptions.length 
                                        : selectedPropertyTypes.length}
                                )</span>
                            </span>
                        </div>
                        {!isPropertyTypeCollapsed && (
                            <div className="selected-filters">
                                {selectedPropertyTypes
                                    .filter((propertyType) => propertyType !== "All Property")
                                    .map((propertyType, index) => (
                                        <div key={index} className="selected-filter">
                                            {propertyType}
                                            <span onClick={() => handlePropertyTypeChange(propertyType)}>
                                                <img src={closeFilterIcon} alt="Remove" style={{ width: "100%", height: "100%" }} />
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        )}
                        {!isPropertyTypeCollapsed && (
                            <div className="property-type-options">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedPropertyTypes.includes("All Property")}
                                        onChange={() => handlePropertyTypeChange("All Property")}
                                    />
                                    All Property
                                </label>
                                {propertyTypeOptions.map((propertyType, index) => (
                                    <label key={index}>
                                        <input
                                            type="checkbox"
                                            checked={selectedPropertyTypes.includes(propertyType)}
                                            onChange={() => handlePropertyTypeChange(propertyType)}
                                        />
                                        {propertyType}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="right-main-section">
                    <div className="property-card">
                        <div className="property-card-image-container" style={{ position: "relative" }}>
                            <img 
                                src={HeaderImg} 
                                alt="Property" 
                                className="property-card-image" 
                            />
                            {/* Show status on image for mobile */}
                            {isMobile && (
                                <span className="property-card-status property-card-status-mobile">
                                    {status}
                                </span>
                            )}
                        </div>
                        <div className="property-card-details">
                            {/* Hide status here on mobile */}
                            {!isMobile && (
                                <p className="property-card-status">{status}</p>
                            )}
                            <div className="property-card-name-loc-price-cont">
                                <div className="property-card-name-loc-cont">
                                    <div className="property-card-name-price">
                                        <span className="property-card-name">{propertyName}</span>
                                        {/* property-card-price removed from here */}
                                    </div>
                                    <p className="property-card-location">
                                        <img src={locationIcon} alt="Location Icon" className="location-icon" />
                                        {location}
                                    </p>
                                </div>
                                <span className="property-card-price">{price}</span>
                            </div>
                         
                            <div className="property-card-extra">
                                <div className="property-card-amenities">
                                    <ul>
                                        {amenities.map((amenity, index) => (
                                            <li key={index}>{amenity}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="property-card-landmarks">
                                    <ul>
                                        {landmarks.map((landmark, index) => (
                                            <li key={index}>{landmark}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertiesBody;