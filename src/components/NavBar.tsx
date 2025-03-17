import { Fragment } from "react";
import React, { useState, useRef } from "react";
import { CSSTransition } from 'react-transition-group';
import "../App.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setMenuHeight = () => {
    const menu = document.querySelector('.nav-links') as HTMLElement | null;
    const navbar = document.querySelector('.navbar') as HTMLElement | null;

    if (menu && navbar) {
        const navbarHeight = navbar.offsetHeight; // Get the height of the navbar
        const viewportHeight = window.innerHeight; // Get the total viewport height
        const remainingHeight = viewportHeight - navbarHeight; // Calculate remaining space

        menu.style.height = `${remainingHeight}px`; // Set the menu height dynamically
    }
};

  type ToggleMenu = () => void;

  const toggleMenu: ToggleMenu = () => {
    const menu = document.querySelector('.nav-links') as HTMLElement | null;
    const toggleButton = document.querySelector('.menu-toggle') as HTMLElement | null;
    const navbar = document.querySelector('.navbar') as HTMLElement | null;


    if (menu && toggleButton && navbar) {
      menu.classList.toggle('open'); // Toggle the 'open' class for the menu
      toggleButton.classList.toggle('close'); // Toggle the 'close' class for the button

      // Change button content dynamically
      if (menu.classList.contains('open')) {
        toggleButton.textContent = '✖'; // Switch to close icon
        setMenuHeight(); // Adjust menu height whenever it opens
      } else {
        toggleButton.textContent = '☰'; // Switch back to hamburger icon
      }
      navbar.classList.toggle('dark-mode');
     
      
    }
  };

  // const toggleMenu = (): void => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <Fragment>

      <nav className="navbar">
        <div className="logo">MyLogo</div>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><a href="#home">Properites</a></li>
          <li><a href="#about">About Me</a></li>
          <li><a href="#services">Articles</a></li>
          <li><a href="#contact">FAQs</a></li>
          <li>
            <button className="inquire-btn">Sign Up</button>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;