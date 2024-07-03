import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewAgeCoinPage = () => {
  return (
    <div className="container py-5">
      <header className="text-center mb-4 p-4">
        <h1 className="mt-3">NewAgeCoin (NAC): A Novel Subscription-Staking Protocol</h1>
      </header>

      <p className="lead">
        NewAgeCoin (NAC) is the utility and governance token of the NewAge Nations Project, a Decentralized Autonomous Organization (DAO). Below are the five key use cases for NAC.
      </p>

      <div className="accordion" id="nacUseCases">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingA">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseA" aria-expanded="true" aria-controls="collapseA">
              A. NAC Dual-Staking
            </button>
          </h2>
          <div id="collapseA" className="accordion-collapse collapse show" aria-labelledby="headingA" data-bs-parent="#nacUseCases">
            <div className="accordion-body">
              <ul>
                <li><a href="https://www.geckoterminal.com/polygon_pos/pools/0xce0418acee13740c8e9f45782b9161088f169a14" target="_blank" rel="noopener noreferrer">Get the current price of NAC</a></li>
                <li><a href="https://app.uniswap.org/explore/tokens/polygon/0xa486a99109d21ac204a2219c8e40fb0733afec88" target="_blank" rel="noopener noreferrer">Buy NAC & Stake for 10 months</a></li>
                <li>Earn 0.5% Daily for 10 months</li>
                <li>Earn 5% DAI Weekly for 10 months</li>
                <li>Get up to 10% Referral Bonus. You can invite your friends!</li>
                <li>Other tokens will be listed as Dual-Staking Rewards, allowing for global partnerships & Yield Farming opportunities.</li>
                <li><a href="https://www.newagecoin.cash" target="_blank" rel="noopener noreferrer">Start Dual-Staking now</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingB">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseB" aria-expanded="false" aria-controls="collapseB">
              B. HVTS-PAMM Investment
            </button>
          </h2>
          <div id="collapseB" className="accordion-collapse collapse" aria-labelledby="headingB" data-bs-parent="#nacUseCases">
            <div className="accordion-body">
              <ul>
                <li>Fund your Forex PAMM ACCOUNT using your preferred broker.</li>
                <li>Receive NAC Airdrop 1:1 of Equity.</li>
                <li><a href="https://t.me/newagecoinprotocol" target="_blank" rel="noopener noreferrer">Find out more</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingC">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseC" aria-expanded="false" aria-controls="collapseC">
              C. HVTS-Liquidity Partnerships
            </button>
          </h2>
          <div id="collapseC" className="accordion-collapse collapse" aria-labelledby="headingC" data-bs-parent="#nacUseCases">
            <div className="accordion-body">
              <ul>
                <li>Fund at least $2,500 in Forex account.</li>
                <li>Get over 100% Profit monthly in Forex HVTS.</li>
                <li>Buy-Back NAC using 50% of Profit.</li>
                <li>Stake the NAC or use it to provide NAC/MATIC LIQUIDITY or pair the NAC to another pool.</li>
                <li><a href="https://gempad.app/locks" target="_blank" rel="noopener noreferrer">Liquidity must be locked for at least 10 months</a></li>
                <li>Partners can pair NAC to their own project pools after NAC BUY BACKS.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingD">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseD" aria-expanded="false" aria-controls="collapseD">
              D. NAC Subscription-Staking for Acquisition of RWAs
            </button>
          </h2>
          <div id="collapseD" className="accordion-collapse collapse" aria-labelledby="headingD" data-bs-parent="#nacUseCases">
            <div className="accordion-body">
              <ul>
                <li>Get cash-backs as you buy or shop using NAC.</li>
                <li>Receive NAC Airdrop 1:1 of capital.</li>
                <li>Vesting of NAC for 10 months duration.</li>
                <li>NAC is staked automatically to receive Dual-Staking rewards.</li>
                <li>Enlisting and announcing partner vendors.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingE">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseE" aria-expanded="false" aria-controls="collapseE">
              E. HVTS — High Volume Trading as a Service
            </button>
          </h2>
          <div id="collapseE" className="accordion-collapse collapse" aria-labelledby="headingE" data-bs-parent="#nacUseCases">
            <div className="accordion-body">
              <ul>
                <li>Algorithmic Forex/Prop Funds Trading, providing high returns for Copy Traders & our Protocol-Owned Equity (POL).</li>
                <li><a href="https://www.myfxbook.com/portfolio/hvts-high-volume-trade-service/10926011" target="_blank" rel="noopener noreferrer">See live trading results</a></li>
                <li>We provide Copy Trading & PAMM for investors/traders.</li>
                <li>HVTS earns additional Performance Fees.</li>
                <li>HVTS provides massive NAC liquidity across our DEX pools.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-5">
        <p>For more information, visit:</p>
        <ul>
          <li><a href="https://www.newagecoin.cash" target="_blank" rel="noopener noreferrer">NewAgeCoin Home</a></li>
          <li><a href="https://t.me/newagecoinprotocol" target="_blank" rel="noopener noreferrer">Telegram</a></li>
          <li><a href="https://www.twitter.com/newagenations" target="_blank" rel="noopener noreferrer">Twitter</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default NewAgeCoinPage;
