import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import temp_logo from "../assets/temp_logo.png"
import "../App.css";
import "../css/NavBar.css";

const Navbar: React.FC = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
    // Dynamically set the menu height on open
    const setMenuHeight = () => {
      const navbar = document.querySelector('.navbar') as HTMLElement | null;
      const menu = document.querySelector('.nav-links') as HTMLElement | null;
      if (menu && navbar) {
        const navbarHeight = navbar.offsetHeight; // Navbar height
        const viewportHeight = window.innerHeight; // Total viewport height
        const remainingHeight = viewportHeight - navbarHeight; // Remaining height
        menu.style.height = `${remainingHeight}px`; // Set menu height
      }
    };
    // Handle window resize to disable transitions
    useEffect(() => {
      const bodyElement = document.querySelector('body');
      if (!bodyElement) return;
      let resizeTimeout: ReturnType<typeof setTimeout>;
      const handleResize = () => {
        bodyElement.classList.add('no-transitions');
        // Clear timeout and remove class after resize
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          bodyElement.classList.remove('no-transitions');
        }, 300);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize); // Cleanup listener
    }, []);
    // Toggle menu open/close
    const toggleMenu = () => {
    setIsOpen((prev) => !prev); // Update React state
    const bodyElement = document.body;

    if (!isOpen) {
      setMenuHeight();
      bodyElement.classList.add('no-scroll'); // Disable scrolling when menu opens
    } else {
      bodyElement.classList.remove('no-scroll'); // Enable scrolling when menu closes
    }
  };

    return (
      <Fragment>
    
      <nav className={`navbar ${isOpen ? 'dark-mode' : ''}`}>
        <NavLink to="/">
          <img src={temp_logo} alt="Brand Logo" />
        </NavLink>
        <button className={`menu-toggle ${isOpen ? 'close' : ''}`} onClick={toggleMenu}>
          {isOpen ? '✖' : '☰'}
        </button>
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><NavLink to="/properties">Properties</NavLink></li>
          <li><NavLink to="/aboutme">About Me</NavLink></li>
          <li><NavLink to="/articles">Articles</NavLink></li>
          <li><NavLink to="/FAQs">FAQs</NavLink></li>
          <li>
            <NavLink to="/inquirenow">
              <button className="inquire-btn">Inquire Now</button>
            </NavLink>
          </li>
        </ul>
      </nav>

  </Fragment>

    );

};

export default Navbar;