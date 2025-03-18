import { Fragment } from "react";
import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from 'react-transition-group';
import { Link } from "react-router-dom";
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

    // Dynamically set menu height when opening
    if (!isOpen) {
      setMenuHeight();
    }
  };

  return (
    <nav className={`navbar ${isOpen ? 'dark-mode' : ''}`}>
      <Link to="/">
        <img src={temp_logo} alt="Brand Logo" />
      </Link>
      <button className={`menu-toggle ${isOpen ? 'close' : ''}`} onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </button>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/properties">Properties</Link></li>
        <li><Link to="/aboutme">About Me</Link></li>
        <li><Link to="/articles">Articles</Link></li>
        <li><Link to="/FAQs">FAQs</Link></li>
        <li>
          <Link to="/inquirenow">
            <button className="inquire-btn">Inquire Now</button>
          </Link>
        </li>
      </ul>
    </nav>
  );

};

export default Navbar;