import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { FaUserCircle } from 'react-icons/fa';

const Nav = () => {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const [account, setAccount] = useState();

  const handleLinkClick = () => {
    document.getElementById('navbarNav').classList.remove('show'); // Close the menu when a link is clicked
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-gradient-blue">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">NewAge Nations DAO</Link>
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/"
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/staking"
                onClick={handleLinkClick}
              >
                Staking
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/"
                onClick={handleLinkClick}
              >
                Subscription
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/Use-case"
                onClick={handleLinkClick}
              >
                Use-Case
              </Link>
            </li>
            <li className="nav-item">
              <a
                href='https://app.uniswap.org/explore/tokens/polygon/0xa486a99109d21ac204a2219c8e40fb0733afec88'
                className="nav-link text-white"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
              >
                Swap
              </a>
            </li>
            <li className="nav-item">
              <a
                href='http://www.hvts.network/'
                className="nav-link text-white"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
              >
                HVTS
              </a>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {isAuthenticated() ? (
              <>
                <div className="dropdown">
                  <button
                    className="btn btn-link text-white dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUserCircle style={{ fontSize: "24px" }} />
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><Link to="/dashboard" className="dropdown-item" onClick={handleLinkClick}>Dashboard</Link></li>
                    <li><Link to="/Profile" className="dropdown-item" onClick={handleLinkClick}>Profile</Link></li>
                    <li><Link to="/Settings" className="dropdown-item" onClick={handleLinkClick}>Settings</Link></li>
                    <li><Link to="/Settings" className="dropdown-item" onClick={handleLinkClick}>Withdraw funds</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={() => { signOut(); handleLinkClick(); }}>Logout</button></li>
                  </ul>
                </div>
                <button onClick={connectWallet} className="btn btn-outline-light ms-3">
                  Connect Wallet
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/Login"
                  className="btn btn-primary text-light mx-2"
                  style={{ fontSize: "16px" }}
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
                <Link
                  to="/Registration"
                  className="btn btn-success text-light mx-2"
                  style={{ fontSize: "16px" }}
                  onClick={handleLinkClick}
                >
                  Register
                </Link>
              </>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
