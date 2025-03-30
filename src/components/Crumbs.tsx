import '.././App.css'
import '.././css/Crumbs.css' // Adjust the path as necessary;
import Arrow from '../assets/weui_arrow-outlined.svg'

function Crumbs() {
    return (
        <div className="crumbs-container">
            {(() => {
            const home = "Home";
            const properties = "Properties";

            return (
                <div>
                <a className="crumb-link" href="/">{home}</a> <img src={Arrow} alt="arrow" className="crumb-icon" /> <a className="crumb-link-active" href="/properties">{properties}</a>
                </div>
            );
            })()}
        </div>
      );
}

export default Crumbs