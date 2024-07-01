import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Adjust the import path as necessary

const Nav = () => {
  const { user } = useAuth(); // Use the AuthContext to get the user
  const [account, setAccount] = useState(null);

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

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    };
    checkConnection();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-gradient-blue">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">NewAge Nations DAO</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/staking">Staking</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Subscription</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Use-case">Use-Case</Link>
            </li>
            <li className="nav-item">
              <a href='https://app.uniswap.org/explore/tokens/polygon/0xa486a99109d21ac204a2219c8e40fb0733afec88' className="nav-link text-white">Swap</a>
            </li>
          </ul>
          <span className="navbar-text text-white">
            {user ? (
              account ? (
                <span>Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}</span>
              ) : (
                <button onClick={connectWallet} className="btn btn-outline-light">Connect Wallet</button>
              )
            ) : (
              <Link to="/Registration" className="btn btn-outline-success text-light">Sign Up</Link>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
