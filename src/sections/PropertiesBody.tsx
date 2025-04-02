import "../css/Properties.css"; // Import styles
import "../css/MainBody.css"; // Import new styles for main body
import magnifyingGlassIcon from "../assets/ph_magnifying-glass-light.svg"; // Import the icon
import arrowUpIcon from "../assets/ep_arrow-up.svg"; // Import the arrow-up icon
import arrowDownIcon from "../assets/ep_arrow-down.svg"; // Import the arrow-down icon
import { useState } from 'react'; // Import useState
import { Range, getTrackBackground } from 'react-range'; // Import Range and getTrackBackground

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

    return (
        <div>
            <div className="properties-body-container">

                <div className="left-section">
                    <p>Showing {propertyCount} properties</p>
                </div>

                <div className="right-section">
                    <span>Sort by: </span>
                    <select className="dropdown">
                        <option value="all">All Properties</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="land">Land</option>
                    </select>
                </div>
            </div>

            <div className="main-body">
                <div className="left-main-section">
                    <div className="search-bar-container">
                        <input 
                            type="text" 
                            className="search-bar" 
                            placeholder="Search properties..." 
                        />
                        <span className="search-icon">
                            <img src={magnifyingGlassIcon} alt="Search" />
                        </span>
                    </div>

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
                                <img
                                    src={isLocationCollapsed ? arrowDownIcon : arrowUpIcon}
                                    alt={isLocationCollapsed ? "Expand" : "Collapse"}
                                    className="location-arrow-icon"
                                />
                                Location
                            </span>
                        </div>
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
                                <img
                                    src={isUnitTypeCollapsed ? arrowDownIcon : arrowUpIcon}
                                    alt={isUnitTypeCollapsed ? "Expand" : "Collapse"}
                                    className="unit-type-arrow-icon"
                                />
                                Unit Type
                            </span>
                        </div>
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
                                <img
                                    src={isPropertyTypeCollapsed ? arrowDownIcon : arrowUpIcon}
                                    alt={isPropertyTypeCollapsed ? "Expand" : "Collapse"}
                                    className="property-type-arrow-icon"
                                />
                                Property Type
                            </span>
                        </div>
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
                    {/* Add content for the right section here */}
                </div>
            </div>
        </div>
    );
}

export default PropertiesBody;