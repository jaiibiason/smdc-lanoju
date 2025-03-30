import "../css/Properties.css"; // Import styles

function PropertiesBody() {
    const propertyCount = 0; // Define propertyCount with a default value

    return (
        <div className="properties-body-container">
            {/* Left Side - Text */}
            <div className="left-section">
                <p>Showing {propertyCount} properties</p>
            </div>

            {/* Right Side - Dropdown */}
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
    );
}

export default PropertiesBody