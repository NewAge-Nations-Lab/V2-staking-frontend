import React, { useState } from 'react';

function Dashboard() {
    const [amount, setAmount] = useState('');
    const [dailyReturn, setDailyReturn] = useState(0);
    const [weeklyReturn, setWeeklyReturn] = useState(0);
    const [monthlyReturn, setMonthlyReturn] = useState(0);
    const [yearlyReturn, setYearlyReturn] = useState(0);
    const [nacBalance, setNacBalance] = useState(3000); // Initial NAC balance

    const handleChange = (e) => {
        const inputAmount = e.target.value;
        if (!isNaN(inputAmount)) {
            setAmount(parseFloat(inputAmount));
            // Calculate returns based on staked amount (assuming 0.5% return)
            calculateReturns(parseFloat(inputAmount));
        } else {
            setAmount('');
            resetReturns();
        }
    }

    const handleStakeButtonClick = (stakeAmount) => {
        // Deduct the stake amount from the NAC balance and place it in the input
        const newAmount = stakeAmount;
        if (newAmount <= nacBalance) {
            setAmount(newAmount);
            calculateReturns(stakeAmount);
        } else {
            // Show error message if stake amount exceeds NAC balance
            alert("Insufficient NAC balance");
        }
    }

    const resetReturns = () => {
        setDailyReturn(0);
        setWeeklyReturn(0);
        setMonthlyReturn(0);
        setYearlyReturn(0);
    }

    const calculateReturns = (stakedAmount) => {
        const daily = stakedAmount * 0.005; // 0.5% daily return
        const weekly = daily * 7; // Assuming 7 days in a week
        const monthly = weekly * 4; // Assuming 4 weeks in a month
        const yearly = monthly * 12; // Assuming 12 months in a year
        setDailyReturn(daily.toFixed(2));
        setWeeklyReturn(weekly.toFixed(2));
        setMonthlyReturn(monthly.toFixed(2));
        setYearlyReturn(yearly.toFixed(2));
    }
    

    const handleStaking = async () => {
        // Implement staking logic here if needed
    }

    const handleClaimReward = async () => {
        // Implement reward claiming logic here if needed
    }

    return (
        <div className='container-fluid parent-layout d-flex'>
            <div className='col-2 side-bar d-none d-md-block'>
                <h3>Dashboard</h3>
                <ul>
                    <li> <a href="/">Profile</a></li>
                    <li> <a href="/">P2P</a></li>
                    <li> <a href="/">Referer Link</a></li>
                    <li className='mt-5'> <a href="/">Sign Out</a></li>
                </ul>
            </div>
            <div className='container col-md-10'>
                <div className="dashboard-container">
                    <div className="balance-block">
                        <h3>NAC</h3>
                        {nacBalance}
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
                <div className='row mt-4'>
                    <div className='col-md-6 tx-area'>
                        <p>Min:100 NAC</p>
                        <p>Max:10000 NAC</p>
                        <label htmlFor="amountInput" className="col-12">Amount (NAC):</label>
                        <input
                            value={amount}
                            onChange={handleChange}
                            className='staking-input col-12'
                            type='text'
                            inputMode='numeric'
                        />
                        <div className="button-group col-12 d-flex justify-content-center">
                            <button onClick={() => handleStakeButtonClick(100)} className="mr-2">100</button>
                            <button onClick={() => handleStakeButtonClick(500)} className="mr-2">500</button>
                            <button onClick={() => handleStakeButtonClick(1000)} className="mr-2">1000</button>
                            <button onClick={() => handleStakeButtonClick(nacBalance)} className="ml-2">All</button>
                        </div>
                        <p className='text-center'>Transfer from NAC Balance: {nacBalance} </p>
                        <hr />
                        <p className={`text-red ${amount !== '0' ? 'input-done' : ''}`}>if you stake {amount} NAC, Your estimated returns will be</p>

                        <div className='estimated-container d-flex justify-content-center'>
                            <div className='profit-estimate'><p>Daily</p>{dailyReturn} NAC</div>
                            <div className='profit-estimate'><p>Weekly</p>{weeklyReturn} NAC</div>
                            <div className='profit-estimate'><p>Monthly</p>{monthlyReturn} NAC</div>
                            <div className='profit-estimate'><p>Yearly</p>{yearlyReturn} NAC</div>
                        </div>
                        <button
                            onClick={handleStaking}
                            className='staking-btn'
                        >
                            STAKE
                        </button>
                        <div className='mt-5'>
                            <p className='col-12'>Available Rewards: 300 NAC</p>
                            <button onClick={handleClaimReward} className='btn btn-success'>CLAIM REWARD</button>
                        </div>
                    </div>
                    <div className='col-md-6 d-flex flex-column align-items-center'>
                        <div className='cards d-flex w-100 w-md-auto'>
                            <p>Stake amount:</p>
                            <p>455 NAC</p>
                        </div>
                        <div className='cards d-flex w-100 w-md-auto'>
                            <p>Lock Period:</p>
                            <p>78</p>
                        </div>
                        <div className='cards d-flex w-100 w-md-auto'>
                            <p>Available Reward:</p>
                            <p>456 NAC</p>
                        </div>
                    </div>
                    <div className='mt-4 table-container'>
                        <h4>Running Staking</h4>
                        <div className='table-responsive'>
                            <table className="table table-striped custom-table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Start</th>
                                        <th scope="col">End</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="4">No running staking</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
