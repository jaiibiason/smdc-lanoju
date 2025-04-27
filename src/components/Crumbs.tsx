import '.././App.css';
import '.././css/Crumbs.css'; // Adjust the path as necessary
import Arrow from '../assets/weui_arrow-outlined.svg';

function Crumbs({ pageName, title }: { pageName: string; title?: string }) {
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