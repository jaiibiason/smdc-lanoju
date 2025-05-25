import '.././App.css';
import '.././css/Crumbs.css'; // Adjust the path as necessary
import Arrow from '../assets/weui_arrow-outlined.svg';
import Arrow2 from '../assets/weui_arrow-outlined-2.svg';
import React from "react";

function Crumbs({ pageName, title }: { pageName: string; title?: string }) {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 780);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (isMobile) {
        if (title) {
            // On mobile, if there's a title, only show pageName
            return (
                <div className="crumbs-container">
                    <img src={Arrow2} alt="arrow" className="crumb-icon" />
                    <span className="crumb-link-active">{pageName}</span>
                </div>
            );
        } else {
            // On mobile, if only pageName, show only Home
            return (
                <div className="crumbs-container">
                    <img src={Arrow2} alt="arrow" className="crumb-icon" />
                    <a className="crumb-link" href="/">Home</a>
                    
                </div>
            );
        }
    }

    return (
        <div className="crumbs-container">
            <a className="crumb-link" href="/">Home</a>
            <img src={Arrow} alt="arrow" className="crumb-icon" />
            {!title ? (
                <span className="crumb-link-active">{pageName}</span>
            ) : (
                <>
                    <a className="crumb-link" href={`/${pageName.toLowerCase()}`}>{pageName}</a>
                    <img src={Arrow} alt="arrow" className="crumb-icon" />
                    <span className="crumb-link-active">{title}</span>
                </>
            )}
        </div>
    );
}

export default Crumbs;