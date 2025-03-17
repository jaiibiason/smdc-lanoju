import { Fragment } from "react";
import React, { useState, useRef } from "react";
import { CSSTransition } from 'react-transition-group';
import "../App copy.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const nodeRef = useRef(null);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
       <nav className="navbar">
            <div className="logo">MyLogo</div>
            <div className="menu-toggle" onClick={toggleMenu}>
                ☰
            </div>
            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><button className="cta-button">Sign Up</button></li>
            </ul>
        </nav>
    </Fragment>
  );
};

export default Navbar;