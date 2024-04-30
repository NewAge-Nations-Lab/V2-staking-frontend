import React from 'react';


const BalanceOverview = () => {
  return (
    <div className="dashboard-container">
      <div className="balance-block">
        <h3>NAC</h3>
        <p>123.45 NAC</p>
      </div>
      <div className="balance-block">
        <h3>DAI</h3>
        <p>678.90 DAI</p>
      </div>
      <div className="stake-block">
        <h3>Staked</h3>
        <p>456.78 NAC</p>
      </div>
      <div className="stake-block">
        <h3>Stake Count</h3>
        <p>10</p>
      </div>
    </div>
  );
};

export default BalanceOverview;