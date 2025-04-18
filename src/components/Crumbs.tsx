import '.././App.css'
import '.././css/Crumbs.css' // Adjust the path as necessary;
import Arrow from '../assets/weui_arrow-outlined.svg'

function Crumbs({ pageName }: { pageName: string }) {
    return (
        <div className="crumbs-container">
            {(() => {
                const home = "Home";

                return (
                    <div>
                        <a className="crumb-link" href="/">{home}</a> 
                        <img src={Arrow} alt="arrow" className="crumb-icon" /> 
                        <a className="crumb-link-active" href={`/${pageName.toLowerCase()}`}>{pageName}</a>
                    </div>
                );
            })()}
        </div>
    );
}

export default Crumbs