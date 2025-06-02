import { NavLink } from 'react-router-dom';
import temp_logo from "../assets/temp_logo.png"
import "../App.css";
import "../css/NavBar.css";

const Navbar = () => {
  return (
    <nav className={`navbar`}>
      <NavLink to="/">
        <img src={temp_logo} alt="Brand Logo" />
      </NavLink>
      <ul className={`nav-links`}>
        <li><NavLink to="/properties">Properties</NavLink></li>
        <li><NavLink to="/aboutme">About Me</NavLink></li>
        <li><NavLink to="/articles">Articles</NavLink></li>
        <li>
          <NavLink 
            to="/faqs" 
            className={({ isActive }) => isActive || window.location.pathname.startsWith('/faqs') ? 'active' : ''}
          >
            FAQs
          </NavLink>
        </li>
        <li>
          <NavLink to="/inquirenow">
            <button className="inquire-btn">Inquire Now</button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;