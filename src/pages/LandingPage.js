import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaTelegramPlane, FaDiscord } from 'react-icons/fa';
import logo from '../images/logo2.png'; // Placeholder for your logo
import { data } from '../data';
import DextoolImage from '../images/dextool.png';
import UniswapImage from '../images/uniswap.png';
import mintmeImage from '../images/mintme.png';

const LandingPage = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Trim the disclaimer text to make it brief
    const briefDisclaimer = data.disclaimer.slice(0, 200);

    // Function to scroll to the end of the page
    const scrollToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight);
    };

    return (
        <div className="container text-center my-5">
            <header className="mb-5">
                <img src={logo} alt="Logo" className="my-4" />
                <h1>Welcome to NewAgeCoin Staking</h1>
                <p className="lead">Stake your coins and earn rewards with NewAgeCoin.</p>
            </header>

            <div className="my-4">
                <a href="https://newagecoin.cash/doc/whitepaper.pdf" className="btn btn-primary btn-lg mx-2" target="_blank" rel="noopener noreferrer">
                    Whitepaper
                </a>
                <Link to="/staking" className="btn btn-success btn-lg mx-2">
                    Launch dApp
                </Link>
            </div>

            <div className="d-flex flex-column align-items-center text-justify text-center justify-content-center mt-4">
                <h6>DISCLAIMER</h6>
                {/* Render the disclaimer text based on the expansion state */}
                <div className="col-md-6">
                    <p style={{ fontSize: "0.7rem" }}>{isExpanded ? data.disclaimer : briefDisclaimer}</p>
                </div>
                {/* Render the "Read More" or "Read Less" button based on the expansion state */}
                {isExpanded ? (
                    <button
                        onClick={() => setIsExpanded(false)}
                        className="btn btn-link"
                    >
                        Read Less
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            setIsExpanded(true);
                            scrollToBottom(); // Scroll to the end when expanding
                        }}
                        className="btn btn-link"
                    >
                        Read More
                    </button>
                )}
            </div>

            {/* Exchanges Section */}
            <div className="mt-5">
                <h5 className="text-center mb-4">Exchanges</h5>
                <div className="d-flex justify-content-center">
                    {/* MintMe */}
                    <div className="exchange-item mx-3">
                        <a href="https://www.mintme.com/token/NewAgeCoin" target="_blank" rel="noopener noreferrer">
                            <img src={mintmeImage} alt="MintMe" style={{ width: "80px" }} />
                        </a>
                    </div>
                    {/* Uniswap */}
                    <div className="exchange-item mx-3">
                        <a href="https://app.uniswap.org/explore/tokens/polygon/0xa486a99109d21ac204a2219c8e40fb0733afec88" target="_blank" rel="noopener noreferrer">
                            <img src={UniswapImage} alt="Uniswap" style={{ width: "80px" }} />
                        </a>
                    </div>
                    {/* Dextools */}
                    <div className="exchange-item mx-3">
                        <a href="https://www.dextools.io/app/en/polygon/pair-explorer/0xce0418acee13740c8e9f45782b9161088f169a14?t=1717063053593" target="_blank" rel="noopener noreferrer">
                            <img src={DextoolImage} alt="Dextools" style={{ width: "80px" }} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h5>Follow us on</h5>
                <div className="d-flex justify-content-center my-3">
                    <a href="https://www.x.com/newagenations" className="mx-2">
                        <FaTwitter size={30} />
                    </a>
                    <a href="https://t.me/NewAgeCoinprotocol" className="mx-2">
                        <FaTelegramPlane size={30} />
                    </a>
                    <a href="https://discord.com/invite/ybSYGvmKT5" className="mx-2">
                        <FaDiscord size={30} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
