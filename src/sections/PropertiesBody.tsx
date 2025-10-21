import "../css/Properties.css"; // Import styles
import "../css/MainBody.css"; // Import new styles for main body
import magnifyingGlassIcon from "../assets/ph_magnifying-glass-light.svg"; // Import the icon
import arrowUpIcon from "../assets/ep_arrow-up.svg"; // Import the arrow-up icon
import arrowDownIcon from "../assets/ep_arrow-down.svg"; // Import the arrow-down icon
import HeaderImg from '../assets/temp_prptHeader.png'
import locationIcon from "../assets/lsicon_location-outline.svg"; // Import location icon
import { useState, useEffect, useRef } from 'react'; // Import useState, useEffect, and useRef
import { Range, getTrackBackground } from 'react-range'; // Import Range and getTrackBackground
import mageFilterIcon from "../assets/mage_filter-2.svg"; // Import the filter icon
import closeFilterIcon from "../assets/close_filter.svg"; // Import close icon
import { rtdb } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useNavigate, useLocation } from 'react-router-dom';

function PropertiesBody() {
    // Dynamic price range values
    const [dynamicPrices, setDynamicPrices] = useState<number[]>([1000000, 3000000, 5000000, 10000000, 15000000, 30000000]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5]);
    
    // Add search query state - moved to the top with other state declarations
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Helper to find closest value in dynamicPrices
    const findClosestValue = (value: number) => {
        return dynamicPrices.reduce((prev, curr) =>
            Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
        );
    };

    // State for location section collapse
    const [isLocationCollapsed, setIsLocationCollapsed] = useState(false);

    // Dynamic location options from DB
    const [locationOptions, setLocationOptions] = useState<string[]>([]);
    
    // State for location filter
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const handleLocationChange = (location: string) => {
        if (location === "All Locations") {
            if (selectedLocations.includes("All Locations")) {
                setSelectedLocations([]);
            } else {
                setSelectedLocations(["All Locations", ...locationOptions]);
            }
        } else {
            setSelectedLocations((prev) => {
                const updatedLocations = prev.includes(location)
                    ? prev.filter((loc) => loc !== location)
                    : [...prev, location];

                if (prev.includes("All Locations") && !updatedLocations.includes(location)) {
                    return updatedLocations.filter((loc) => loc !== "All Locations");
                }

                if (updatedLocations.length === locationOptions.length) {
                    return ["All Locations", ...locationOptions];
                }

                return updatedLocations;
            });
        }
    };

    // State for unit type section collapse
    const [isUnitTypeCollapsed, setIsUnitTypeCollapsed] = useState(false);
    const [unitTypeOptions, setUnitTypeOptions] = useState<string[]>([]);
    const [selectedUnitTypes, setSelectedUnitTypes] = useState<string[]>([]);

    const handleUnitTypeChange = (unitType: string) => {
        if (unitType === "All Unit") {
            if (selectedUnitTypes.includes("All Unit")) {
                setSelectedUnitTypes([]);
            } else {
                setSelectedUnitTypes(["All Unit", ...unitTypeOptions]);
            }
        } else {
            setSelectedUnitTypes((prev) => {
                const updatedUnitTypes = prev.includes(unitType)
                    ? prev.filter((type) => type !== unitType)
                    : [...prev, unitType];

                if (prev.includes("All Unit") && !updatedUnitTypes.includes(unitType)) {
                    return updatedUnitTypes.filter((type) => type !== "All Unit");
                }

                if (updatedUnitTypes.length === unitTypeOptions.length) {
                    return ["All Unit", ...unitTypeOptions];
                }

                return updatedUnitTypes;
            });
        }
    };

    // State for property type section collapse
    const [isPropertyTypeCollapsed, setIsPropertyTypeCollapsed] = useState(false);
    const [propertyTypeOptions, setPropertyTypeOptions] = useState<string[]>([]);
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

    // Fetch amenities, nearbyest, and units from the root of the database
    const [masterAmenities, setMasterAmenities] = useState<{ key: string, name: string }[]>([]);
    const [masterNearbyest, setMasterNearbyest] = useState<{ [key: string]: { category: string, name: string } }>({});
    const [unitsTable, setUnitsTable] = useState<{ [key: string]: any }>({});
    
    // Properties from Realtime Database
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Add temporary filter states for mobile overlay
    const [tempSelectedLocations, setTempSelectedLocations] = useState<string[]>([]);
    const [tempSelectedUnitTypes, setTempSelectedUnitTypes] = useState<string[]>([]);
    const [tempSelectedPropertyTypes, setTempSelectedPropertyTypes] = useState<string[]>([]);
    const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([0, dynamicPrices.length - 1]);

    useEffect(() => {
        // Fetch properties
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
            setProperties(props);
            setLoading(false);

            // Extract unique provinces from locations (after comma, trimmed)
            const locSet = new Set<string>();
            props.forEach((prop: any) => {
                if (prop.location) {
                    const parts = prop.location.split(',');
                    // Province is always the last part after the last comma
                    const province = parts.length > 1
                        ? parts[parts.length - 1].trim()
                        : prop.location.trim();
                    if (province) locSet.add(province);
                }
            });
            setLocationOptions(Array.from(locSet));

            // Extract unique property types (split by comma, trim, flatten, dedupe)
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
        });

        // Fetch amenities
        const amenitiesRef = ref(rtdb, "amenities");
        const unsubscribeAmenities = onValue(amenitiesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const arr = Object.entries(data).map(([key, value]: any) => ({
                    key,
                    name: value.name
                }));
                setMasterAmenities(arr);
            }
        });

        // Fetch nearbyest
        const nearbyestRef = ref(rtdb, "nearbyest");
        const unsubscribeNearbyest = onValue(nearbyestRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setMasterNearbyest(data);
            }
        });

        // Fetch units
        const unitsRef = ref(rtdb, "units");
        const unsubscribeUnits = onValue(unitsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setUnitsTable(data);
            }
        });

        return () => {
            unsubscribeProps();
            unsubscribeAmenities();
            unsubscribeNearbyest();
            unsubscribeUnits();
        };
    }, []);

    // Dynamically extract unique unit names for filter and dynamic price range
    useEffect(() => {
        if (unitsTable && typeof unitsTable === 'object') {
            // Unit names
            const unitNames = Object.entries(unitsTable)
                .map(([_, unit]: [string, any]) => unit.name)
                .filter((name): name is string => typeof name === 'string');
            
            const uniqueNames = Array.from(new Set(unitNames));
            setUnitTypeOptions(uniqueNames);

            // Dynamic price range
            const allPrices: number[] = [];
            
            // Get prices from all property units
            properties.forEach(property => {
                if (property.unit) {
                    Object.entries(property.unit).forEach(([unitKey, unitData]: [string, any]) => {
                        if (unitData && typeof unitData.price === 'number') {
                            allPrices.push(unitData.price);
                        }
                    });
                }
            });
            
            if (allPrices.length > 0) {
                // Find min/max, round down/up to nearest 100k or 1M for better UX
                const minPrice = Math.min(...allPrices);
                const maxPrice = Math.max(...allPrices);
                // Round down min to nearest 100k, up max to nearest 100k
                const roundBase = minPrice < 2000000 ? 100000 : 1000000;
                const roundedMin = Math.floor(minPrice / roundBase) * roundBase;
                const roundedMax = Math.ceil(maxPrice / roundBase) * roundBase;
                // Generate price steps (6 steps, inclusive)
                let steps = 5;
                let stepSize = Math.max(Math.round((roundedMax - roundedMin) / steps / roundBase) * roundBase, roundBase);
                if (stepSize === 0) stepSize = roundBase;
                const priceArr = [];
                for (let p = roundedMin; p < roundedMax; p += stepSize) {
                    priceArr.push(p);
                }
                priceArr.push(roundedMax);
                setDynamicPrices(priceArr);
                setPriceRange([0, priceArr.length - 1]);
            }
        }
    }, [unitsTable, properties]);

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

    // Filtering logic
    const filterProperties = (props: any[]) => {
        return props.filter((property) => {
            // Search filter - filter by name or location
            if (searchQuery.trim() !== '') {
                const query = searchQuery.trim().toLowerCase();
                const matchesName = property.name?.toLowerCase().includes(query);
                const matchesLocation = property.location?.toLowerCase().includes(query);
                if (!matchesName && !matchesLocation) return false;
            }
            
            // 1. Budget filter
            if (dynamicPrices.length > 1 && priceRange) {
                // Get min/max price from slider
                const minBudget = dynamicPrices[priceRange[0]];
                const maxBudget = dynamicPrices[priceRange[1]];
                
                // Get property unit prices
                let propPrices: number[] = [];
                if (property.unit) {
                    propPrices = Object.values(property.unit)
                        .filter((unit: any) => 
                            unit && typeof unit.price === 'number'
                        )
                        .map((unit: any) => unit.price);
                }
                
                // If no price, skip (show)
                if (propPrices.length > 0) {
                    const inBudget = propPrices.some((p) => p >= minBudget && p <= maxBudget);
                    if (!inBudget) return false;
                }
            }

            // 2. Location filter - match by province only
            if (selectedLocations.length > 0 && !selectedLocations.includes('All Locations')) {
                if (!property.location) return false;
                const parts = property.location.split(',');
                const province = parts.length > 1
                    ? parts[parts.length - 1].trim()
                    : property.location.trim();
                if (!selectedLocations.includes(province)) return false;
            }

            // 3. Unit type filter
            if (selectedUnitTypes.length > 0 && !selectedUnitTypes.includes('All Unit')) {
                // Check if property has units with selected unit types
                if (!property.unit) return false;
                
                const hasMatchingUnit = Object.keys(property.unit).some(unitKey => {
                    const unitInfo = unitsTable[unitKey];
                    return unitInfo && selectedUnitTypes.includes(unitInfo.name);
                });
                
                if (!hasMatchingUnit) return false;
            }

            // 4. Property type filter
            if (selectedPropertyTypes.length > 0 && !selectedPropertyTypes.includes('All Property')) {
                // property.type can be comma separated
                const propTypes = property.type ? property.type.split(',').map((t: string) => t.trim()) : [];
                if (!propTypes.some((t: string) => selectedPropertyTypes.includes(t))) return false;
            }

            return true;
        });
    };

    // Sorting logic
    const sortProperties = (props: any[]) => {
        if (selectedSort === 'residential') {
            // Relevance: sort by id descending (assuming id is PTY0001, PTY0002, ...)
            return [...props].sort((a, b) => {
                // Extract number from id
                const getNum = (id: string) => {
                    const match = id && id.match(/(\d+)/);
                    return match ? parseInt(match[1], 10) : 0;
                };
                return getNum(a.id) - getNum(b.id);
            });
        } else if (selectedSort === 'commercial') {
            // Pricing Low to High
            return [...props].sort((a, b) => {
                const getMinPrice = (property: any) => {
                    if (!property.unit) return Number.MAX_SAFE_INTEGER;
                    
                    const prices = Object.values(property.unit)
                        .filter((unit: any) => unit && typeof unit.price === 'number')
                        .map((unit: any) => unit.price);
                        
                    return prices.length > 0 ? Math.min(...prices) : Number.MAX_SAFE_INTEGER;
                };
                return getMinPrice(a) - getMinPrice(b);
            });
        } else if (selectedSort === 'land') {
            // Pricing High to Low
            return [...props].sort((a, b) => {
                const getMaxPrice = (property: any) => {
                    if (!property.unit) return Number.MIN_SAFE_INTEGER;
                    
                    const prices = Object.values(property.unit)
                        .filter((unit: any) => unit && typeof unit.price === 'number')
                        .map((unit: any) => unit.price);
                        
                    return prices.length > 0 ? Math.max(...prices) : Number.MIN_SAFE_INTEGER;
                };
                return getMaxPrice(b) - getMaxPrice(a);
            });
        }
        // Default: All Properties (no sort)
        return props;
    };

    const filteredProperties = sortProperties(filterProperties(properties));
    const propertyCount = filteredProperties.length;

    function formatPesoRange(unitObj: any) {
        if (!unitObj) return null;
        
        // Get all unit prices from the property's units
        const prices: number[] = Object.values(unitObj)
            .filter((unit: any) => unit && typeof unit.price === 'number')
            .map((unit: any) => unit.price);

        if (prices.length === 0) return null;
        
        const min = Math.min(...prices);
        const max = Math.max(...prices);

        // Format with comma
        const format = (num: number) => "₱ " + num.toLocaleString();
        return prices.length === 1 ? format(min) : `${format(min)} - ${format(max)}`;
    }

    const navigate = useNavigate();
    const locationHook = useLocation();

    // Parse query params for filters
    useEffect(() => {
        const params = new URLSearchParams(locationHook.search);
        const unitType = params.get('unitType')?.split(',').filter(Boolean) || [];
        const locationParam = params.get('location')?.split(',').filter(Boolean) || [];
        const propertyType = params.get('propertyType')?.split(',').filter(Boolean) || [];
        const minPrice = params.get('minPrice');
        const maxPrice = params.get('maxPrice');

        if (unitType.length > 0) setSelectedUnitTypes(unitType);
        if (locationParam.length > 0) setSelectedLocations(locationParam);
        if (propertyType.length > 0) setSelectedPropertyTypes(propertyType);
        if (minPrice && maxPrice && dynamicPrices.length > 1) {
            const minIdx = dynamicPrices.indexOf(Number(minPrice));
            const maxIdx = dynamicPrices.indexOf(Number(maxPrice));
            if (minIdx !== -1 && maxIdx !== -1) {
                setPriceRange([minIdx, maxIdx]);
            }
        }
        // eslint-disable-next-line
    }, [locationHook.search, dynamicPrices.length]);

    // Sync temp states with actual filter states when opening mobile filter
    useEffect(() => {
        if (showFilters) {
            setTempSelectedLocations([...selectedLocations]);
            setTempSelectedUnitTypes([...selectedUnitTypes]);
            setTempSelectedPropertyTypes([...selectedPropertyTypes]);
            setTempPriceRange([...priceRange]);
        }
        // eslint-disable-next-line
    }, [showFilters]);

    // Infinite scroll state
    const [visibleCount, setVisibleCount] = useState(8);
    const rightSectionRef = useRef<HTMLDivElement>(null);

    // Height sync state
    const leftSectionRef = useRef<HTMLDivElement>(null);
    const [leftSectionHeight, setLeftSectionHeight] = useState<number | undefined>(undefined);

    // Sync right section height with left section
    useEffect(() => {
        const updateHeight = () => {
            if (leftSectionRef.current) {
                setLeftSectionHeight(leftSectionRef.current.offsetHeight);
            }
        };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, [searchQuery, selectedLocations, selectedUnitTypes, selectedPropertyTypes, priceRange, properties, isMobile, isTablet, showFilters]);

    // Reset visibleCount when filters/search change
    useEffect(() => {
        setVisibleCount(8);
    }, [searchQuery, selectedLocations, selectedUnitTypes, selectedPropertyTypes, priceRange, properties]);

    // Infinite scroll handler
    useEffect(() => {
        const handleScroll = () => {
            const container = rightSectionRef.current;
            if (!container) return;
            // Check if user scrolled near bottom (100px threshold)
            if (container.scrollTop + container.clientHeight >= container.scrollHeight - 100) {
                if (visibleCount < filteredProperties.length) {
                    setVisibleCount((prev) => Math.min(prev + 8, filteredProperties.length));
                }
            }
        };
        const container = rightSectionRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [filteredProperties.length, visibleCount]);

    return (
        <div>
            <div className="properties-body-container">
                <div className="left-section" ref={leftSectionRef}>
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
                <div className="left-main-section sticky-left-filter" ref={leftSectionRef}>
                    {/* 2. Search bar */}
                    <div className="search-bar-container">
                        <input 
                            type="text" 
                            className="search-bar" 
                            placeholder="Search for an SMDC property" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className="search-icon">
                            <img src={magnifyingGlassIcon} alt="Search" />
                        </span>
                    </div>
                    
                    {/* Mobile search bar - optional for consistent UX in mobile filters */}
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
                                {/* Add search bar to mobile filters */}
                                <div className="mobile-search-container" style={{ marginBottom: '16px' }}>
                                    <label>Search</label>
                                    <input 
                                        type="text" 
                                        className="search-bar" 
                                        placeholder="Search by property name or location" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                
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
                                                {tempSelectedLocations.includes("All Locations")
                                                    ? locationOptions.length - 1
                                                    : tempSelectedLocations.length}
                                            )</span>
                                        </span>
                                    </div>
                                    {!isLocationCollapsed && (
                                        <div className="selected-filters">
                                            {tempSelectedLocations
                                                .filter((location) => location !== "All Locations")
                                                .map((location, index) => (
                                                    <div key={index} className="selected-filter">
                                                        {location.charAt(0).toUpperCase() + location.slice(1)}
                                                        <span onClick={() => {
                                                            if (location === "All Locations") {
                                                                setTempSelectedLocations([]);
                                                            } else {
                                                                setTempSelectedLocations(prev => prev.filter(l => l !== location));
                                                            }
                                                        }}>
                                                            <img src={closeFilterIcon} alt="Remove" style={{ width: "100%", height: "100%" }} />
                                                        </span>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                    {!isLocationCollapsed && (
                                        <div className="location-options">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={tempSelectedLocations.includes("All Locations")}
                                                    onChange={() => {
                                                        if (tempSelectedLocations.includes("All Locations")) {
                                                            setTempSelectedLocations([]);
                                                        } else {
                                                            setTempSelectedLocations(["All Locations", ...locationOptions]);
                                                        }
                                                    }}
                                                />
                                                All Locations
                                            </label>
                                            {locationOptions.map((location, index) => (
                                                <label key={index}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempSelectedLocations.includes(location)}
                                                        onChange={() => {
                                                            setTempSelectedLocations(prev => {
                                                                const updated = prev.includes(location)
                                                                    ? prev.filter(l => l !== location)
                                                                    : [...prev, location];
                                                                if (prev.includes("All Locations") && !updated.includes(location)) {
                                                                    return updated.filter(l => l !== "All Locations");
                                                                }
                                                                if (updated.length === locationOptions.length) {
                                                                    return ["All Locations", ...locationOptions];
                                                                }
                                                                return updated;
                                                            });
                                                        }}
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
                                                {tempSelectedUnitTypes.includes("All Unit")
                                                    ? unitTypeOptions.length
                                                    : tempSelectedUnitTypes.length}
                                            )</span>
                                        </span>
                                    </div>
                                    {!isUnitTypeCollapsed && (
                                        <div className="selected-filters">
                                            {tempSelectedUnitTypes
                                                .filter((unitType) => unitType !== "All Unit")
                                                .map((unitType, index) => (
                                                    <div key={index} className="selected-filter">
                                                        {unitType}
                                                        <span onClick={() => {
                                                            if (unitType === "All Unit") {
                                                                setTempSelectedUnitTypes([]);
                                                            } else {
                                                                setTempSelectedUnitTypes(prev => prev.filter(u => u !== unitType));
                                                            }
                                                        }}>
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
                                                    checked={tempSelectedUnitTypes.includes("All Unit")}
                                                    onChange={() => {
                                                        if (tempSelectedUnitTypes.includes("All Unit")) {
                                                            setTempSelectedUnitTypes([]);
                                                        } else {
                                                            setTempSelectedUnitTypes(["All Unit", ...unitTypeOptions]);
                                                        }
                                                    }}
                                                />
                                                All Unit
                                            </label>
                                            {unitTypeOptions.map((unitType, index) => (
                                                <label key={index}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempSelectedUnitTypes.includes(unitType)}
                                                        onChange={() => {
                                                            setTempSelectedUnitTypes(prev => {
                                                                const updated = prev.includes(unitType)
                                                                    ? prev.filter(u => u !== unitType)
                                                                    : [...prev, unitType];
                                                                if (prev.includes("All Unit") && !updated.includes(unitType)) {
                                                                    return updated.filter(u => u !== "All Unit");
                                                                }
                                                                if (updated.length === unitTypeOptions.length) {
                                                                    return ["All Unit", ...unitTypeOptions];
                                                                }
                                                                return updated;
                                                            });
                                                        }}
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
                                                {tempSelectedPropertyTypes.includes("All Property")
                                                    ? propertyTypeOptions.length
                                                    : tempSelectedPropertyTypes.length}
                                            )</span>
                                        </span>
                                    </div>
                                    {!isPropertyTypeCollapsed && (
                                        <div className="selected-filters">
                                            {tempSelectedPropertyTypes
                                                .filter((propertyType) => propertyType !== "All Property")
                                                .map((propertyType, index) => (
                                                    <div key={index} className="selected-filter">
                                                        {propertyType}
                                                        <span onClick={() => {
                                                            if (propertyType === "All Property") {
                                                                setTempSelectedPropertyTypes([]);
                                                            } else {
                                                                setTempSelectedPropertyTypes(prev => prev.filter(p => p !== propertyType));
                                                            }
                                                        }}>
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
                                                    checked={tempSelectedPropertyTypes.includes("All Property")}
                                                    onChange={() => {
                                                        if (tempSelectedPropertyTypes.includes("All Property")) {
                                                            setTempSelectedPropertyTypes([]);
                                                        } else {
                                                            setTempSelectedPropertyTypes(["All Property", ...propertyTypeOptions]);
                                                        }
                                                    }}
                                                />
                                                All Property
                                            </label>
                                            {propertyTypeOptions.map((propertyType, index) => (
                                                <label key={index}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempSelectedPropertyTypes.includes(propertyType)}
                                                        onChange={() => {
                                                            setTempSelectedPropertyTypes(prev => {
                                                                const updated = prev.includes(propertyType)
                                                                    ? prev.filter(p => p !== propertyType)
                                                                    : [...prev, propertyType];
                                                                if (prev.includes("All Property") && !updated.includes(propertyType)) {
                                                                    return updated.filter(p => p !== "All Property");
                                                                }
                                                                if (updated.length === propertyTypeOptions.length) {
                                                                    return ["All Property", ...propertyTypeOptions];
                                                                }
                                                                return updated;
                                                            });
                                                        }}
                                                    />
                                                    {propertyType}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {/* Budget Slider */}
                                <div className="property-slider-container">
                                    <label>Budget</label>
                                    <div className="slider-wrapper">
                                        <Range
                                            min={0}
                                            max={dynamicPrices.length - 1}
                                            values={tempPriceRange}
                                            onChange={(indices) => {
                                                setTempPriceRange([indices[0], indices[1]]);
                                            }}
                                            renderTrack={({ props, children }) => (
                                                <div
                                                    {...props}
                                                    style={{
                                                        ...props.style,
                                                        height: '2px',
                                                        width: '100%',
                                                        background: getTrackBackground({
                                                            values: tempPriceRange,
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
                                            renderThumb={({ props, isDragged }) => (
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
                                                value={dynamicPrices[tempPriceRange[0]]}
                                                onChange={(e) => {
                                                    const newMin = parseInt(e.target.value, 10);
                                                    setTempPriceRange([
                                                        dynamicPrices.indexOf(newMin),
                                                        tempPriceRange[1],
                                                    ]);
                                                }}
                                            >
                                                {dynamicPrices.map((price, index) => (
                                                    <option
                                                        key={index}
                                                        value={price}
                                                        disabled={index > tempPriceRange[1]}
                                                    >
                                                        {price >= 1000000 ? `${Math.round(price / 1000000)}M` : `${Math.round(price / 1000)}K`}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="max-section">
                                            <label>Max</label>
                                            <select
                                                className="dropdown"
                                                value={dynamicPrices[tempPriceRange[1]]}
                                                onChange={(e) => {
                                                    const newMax = parseInt(e.target.value, 10);
                                                    setTempPriceRange([
                                                        tempPriceRange[0],
                                                        dynamicPrices.indexOf(newMax),
                                                    ]);
                                                }}
                                            >
                                                {dynamicPrices.map((price, index) => (
                                                    <option
                                                        key={index}
                                                        value={price}
                                                        disabled={index < tempPriceRange[0]}
                                                    >
                                                        {price >= 1000000 ? `${Math.round(price / 1000000)}M` : `${Math.round(price / 1000)}K`}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mobile-filters-actions">
                                <button
                                    className="mobile-apply-filter-btn"
                                    onClick={() => {
                                        setSelectedLocations(tempSelectedLocations);
                                        setSelectedUnitTypes(tempSelectedUnitTypes);
                                        setSelectedPropertyTypes(tempSelectedPropertyTypes);
                                        setPriceRange(tempPriceRange);
                                        setShowFilters(false);
                                    }}
                                >
                                    Apply Filter
                                </button>
                                <button
                                    className="mobile-clear-filter-btn"
                                    onClick={() => {
                                        setTempSelectedLocations([]);
                                        setTempSelectedUnitTypes([]);
                                        setTempSelectedPropertyTypes([]);
                                        setTempPriceRange([0, dynamicPrices.length - 1]);
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
                                min={0}
                                max={dynamicPrices.length - 1}
                                values={priceRange}
                                onChange={(indices) => {
                                    setPriceRange([indices[0], indices[1]]);
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
                                renderThumb={({ props, isDragged }) => (
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
                                    value={dynamicPrices[priceRange[0]]}
                                    onChange={(e) => {
                                        const newMin = parseInt(e.target.value, 10);
                                        setPriceRange([
                                            dynamicPrices.indexOf(newMin),
                                            priceRange[1],
                                        ]);
                                    }}
                                >
                                    {dynamicPrices.map((price, index) => (
                                        <option
                                            key={index}
                                            value={price}
                                            disabled={index > priceRange[1]}
                                        >
                                            {price >= 1000000 ? `${Math.round(price / 1000000)}M` : `${Math.round(price / 1000)}K`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="max-section">
                                <label>Max</label>
                                <select
                                    className="dropdown"
                                    value={dynamicPrices[priceRange[1]]}
                                    onChange={(e) => {
                                        const newMax = parseInt(e.target.value, 10);
                                        setPriceRange([
                                            priceRange[0],
                                            dynamicPrices.indexOf(newMax),
                                        ]);
                                    }}
                                >
                                    {dynamicPrices.map((price, index) => (
                                        <option
                                            key={index}
                                            value={price}
                                            disabled={index < priceRange[0]}
                                        >
                                            {price >= 1000000 ? `${Math.round(price / 1000000)}M` : `${Math.round(price / 1000)}K`}
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
                                            {location.charAt(0).toUpperCase() + location.slice(1)}
                                            <span onClick={() => handleLocationChange(location)}>
                                                <img src={closeFilterIcon} alt="Remove" style={{ width: "100%", height: "100%" }} />
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        )}
                        {!isLocationCollapsed && (
                            <div className="location-options">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedLocations.includes("All Locations")}
                                        onChange={() => handleLocationChange("All Locations")}
                                    />
                                    All Locations
                                </label>
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
                <div
                    className="right-main-section"
                    ref={rightSectionRef}
                    style={{
                        height: leftSectionHeight ? leftSectionHeight : 'auto',
                        overflowY: 'auto',
                        paddingRight: 8,
                        boxSizing: 'border-box'
                    }}
                >
                    {loading ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <div className="loading-text">Loading properties...</div>
                        </div>
                    ) : filteredProperties.length > 0 ? (
                        filteredProperties.slice(0, visibleCount).map((property) => (
                            <div
                                className="property-card"
                                key={property.id}
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/inner-prop/${property.id}`)}
                            >
                                <div className="property-card-image-container" style={{ position: "relative" }}>
                                    <img 
                                        src={
                                            property.images && property.images.mainImage
                                                ? property.images.mainImage
                                                : HeaderImg
                                        }
                                        alt="Property"
                                        className="property-card-image"
                                    />
                                    {isMobile && (
                                        <span className="property-card-status property-card-status-mobile">
                                            {property.type || status}
                                        </span>
                                    )}
                                </div>
                                <div className="property-card-details">
                                    {!isMobile && (
                                        property.type && property.type.includes(',')
                                            ? (
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    {property.type.split(',').map((statusStr: string, idx: number) => (
                                                        <p className="property-card-status" key={idx}>
                                                            {statusStr.trim()}
                                                        </p>
                                                    ))}
                                                </div>
                                            )
                                            : <p className="property-card-status">{property.type || status}</p>
                                    )}
                                    <div className="property-card-name-loc-price-cont">
                                        <div className="property-card-name-loc-cont">
                                            <div className="property-card-name-price">
                                                <span className="property-card-name">{property.name || propertyName}</span>
                                            </div>
                                            <p className="property-card-location">
                                                <img src={locationIcon} alt="Location Icon" className="location-icon" />
                                                {property.location || location}
                                            </p>
                                        </div>
                                        <span className="property-card-price">
                                            {property.unit
                                                ? formatPesoRange(property.unit)
                                                : price}
                                        </span>
                                    </div>
                                    <div className="property-card-extra">
                                        <div className="property-card-amenities">
                                            <ul>
                                                {property.amenities
                                                    ? masterAmenities
                                                        .filter(a => property.amenities[a.key])
                                                        .slice(0, 4) // Limit to 4 amenities
                                                        .map((a, idx) => (
                                                            <li key={idx}>{a.name}</li>
                                                        ))
                                                    : amenities.slice(0, 4).map((amenity, idx) => (
                                                        <li key={idx}>{amenity}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                        <div className="property-card-landmarks">
                                            <ul>
                                                {property.nearby
                                                    ? Object.keys(property.nearby)
                                                        .filter(key => property.nearby[key] && masterNearbyest[key])
                                                        .map((key, idx) => (
                                                            <li key={idx}>
                                                                {property.nearby[key].distance}km from {masterNearbyest[key].name}
                                                            </li>
                                                        ))
                                                    : landmarks.map((landmark, idx) => (
                                                        <li key={idx}>{landmark}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-properties-found">
                            <div className="no-properties-found-icon">
                                <img src={magnifyingGlassIcon} alt="No Results" style={{ width: 40, height: 40 }} />
                            </div>
                            <div className="no-properties-found-title">
                                No Properties Found
                            </div>
                            <div className="no-properties-found-desc">
                                Sorry, we couldn't find any properties that match your search and filter criteria. Try adjusting your filters or search terms.
                            </div>
                            <button 
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedLocations([]);
                                    setSelectedUnitTypes([]);
                                    setSelectedPropertyTypes([]);
                                    setPriceRange([0, dynamicPrices.length - 1]);
                                }}
                                className="clear-search-btn"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PropertiesBody;