import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.jpg'

function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = () => {
    setIsNavOpen(false); // Close the menu when a link is clicked
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-bg-purple text-light" style={{ backgroundColor: '#232c57' }}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isNavOpen ? "show" : ""} collapse navbar-collapse`}
          id="navbarSupportedContent"
        >
          <img src={logo} alt="Logo" />
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link active text-light"
                aria-current="page"
                style={{ fontSize: "16px", margin: "10px" }}
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            

            <li className="nav-item">
              <Link
                to="/AboutUs"
                className="nav-link text-light"
                style={{ fontSize: "16px", margin: "10px" }}
                onClick={handleLinkClick}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
                <a
                  href="/"
                  alt="contact us"
                  className="nav-link text-light"
                  style={{ fontSize: "16px", margin: "10px" }}
                >
                  How to Stake
                </a>
              </li>
          </ul>
          <div className="ml-auto">
            <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/Login"
                className="nav-link text-light nav-link-hover"
                style={{ fontSize: "16px", margin: "10px" }}
                onClick={handleLinkClick}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Registration"
                className="nav-link text-light nav-link-hover"
                style={{ fontSize: "16px", margin: "10px" }}
                onClick={handleLinkClick}
              >
                Register
              </Link>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
