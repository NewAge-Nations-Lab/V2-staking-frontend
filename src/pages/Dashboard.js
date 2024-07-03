import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { ThreeDots } from 'react-loader-spinner';

function Dashboard() {
    const [amount, setAmount] = useState('');
    const [dailyReturn, setDailyReturn] = useState(0);
    const [weeklyReturn, setWeeklyReturn] = useState(0);
    const [monthlyReturn, setMonthlyReturn] = useState(0);
    const [yearlyReturn, setYearlyReturn] = useState(0);
    const [nacBalance, setNacBalance] = useState(0);
    const [daiBalance, setDaiBalance] = useState(0);
    const [totalStaked, setTotalStaked] = useState(0);
    const [stakeCount, setStakeCount] = useState(0);
    const [referralCode, setReferralCode] = useState('');
    const [referrals, setReferrals] = useState([]);
    const [availableRewards, setAvailableRewards] = useState(0);
    const [loading, setLoading] = useState(true);
    const [runningStakes, setRunningStakes] = useState([]);

    const authHeader = useAuthHeader();  // Get the authorization header
    const authUser = useAuthUser();  // Extract authentication user
    const userId = authUser()?.userId;

    

    useEffect(() => {



        const fetchData = async () => {
            try {
                
                if (!userId) throw new Error('No userId found');

                const headers = { Authorization: authHeader() };
                
                console.log('user id', userId);

               
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [authHeader, userId]);

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
        try {
            await axios.post(`http://localhost:3000/api/staking/${userId}`, {
                nacAmount: amount,
                daiAmount: 0 // Adjust if you have DAI staking
            }, {
                headers: {
                    'Authorization': `Bearer ${authHeader()}`,
                    'Content-Type': 'application/json'
                }
            });
            alert("Stake successful");
        } catch (error) {
            console.error("Error during staking:", error);
            alert("Failed to stake");
        }
    }

    const handleClaimReward = async () => {
        try {
            await axios.post(`http://localhost:3000/api/staking/claim-nac-reward/${userId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${authHeader()}`,
                    'Content-Type': 'application/json'
                }
            });
            alert("NAC reward claimed");
        } catch (error) {
            console.error("Error claiming NAC reward:", error);
            alert("Failed to claim NAC reward");
        }
    }

    return (
        <div className='container-fluid parent-layout d-flex'>
            <div className='col-2 side-bar d-none d-md-block'>
                <h3>Dashboard</h3>
                <ul>
                    <li> <a href="/" className='text-info'>Profile</a></li>
                    <li> <a href="/" className='text-info'>P2P</a></li>
                    <li> <a href="/" className='text-info'>Referer Link</a></li>
                    <li> <a href="/" className='text-info'>Staking</a></li>
                </ul>
                <button className='mt-5 btn btn-danger' onClick={() => {
                    localStorage.removeItem('authToken');
                    window.location.href = '/login'; // Redirect to login after sign out
                }}>
                    Sign Out
                </button>
            </div>
            <div className='container col-md-10'>
                {loading ? (
                    <div className="text-center mt-5">
                        <ThreeDots color="#000" height={30} width={30} />
                    </div>
                ) : (
                    <>
                        <div className="dashboard-container row">
                            <div className="balance-block col-md-6 col-lg-3">
                                <h3>NAC Balance</h3>
                                {nacBalance}
                            </div>
                            <div className="balance-block col-md-6 col-lg-3">
                                <h3>DAI Balance</h3>
                                <p>{daiBalance} DAI</p>
                            </div>
                            <div className="stake-block col-md-6 col-lg-3">
                                <h3>Total Staked</h3>
                                <p>{totalStaked} NAC</p>
                            </div>
                            <div className="stake-block col-md-6 col-lg-3">
                                <h3>Stake Count</h3>
                                <p>{stakeCount}</p>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-md-6 tx-area'>
                                <p>Min: 100 NAC</p>
                                <p>Max: 10000 NAC</p>
                                <label htmlFor="amountInput" className="col-12">Amount (NAC):</label>
                                <input
                                    value={amount}
                                    onChange={handleChange}
                                    className='staking-input col-12'
                                    type='text'
                                    inputMode='numeric'
                                />
                                <div className="button-group col-12 d-flex justify-content-center">
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
                                    <p className='col-12'>Available Rewards: {availableRewards} NAC</p>
                                    <button onClick={handleClaimReward} className='btn btn-success'>CLAIM REWARD</button>
                                </div>
                            </div>
                            <div className='col-md-6 d-flex flex-column align-items-center'>
                                <div className='cards d-flex w-100 w-md-auto'>
                                    <p>Your referral code: {referralCode}</p>
                                </div>
                                <div className='cards d-flex w-100 w-md-auto'>
                                    <p>Total numbers of referrals:</p>
                                    <p>{referrals.length}</p>
                                </div>
                                <div className='cards d-flex w-100 w-md-auto'>
                                    <p>Total amount of reward:</p>
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
                                            {runningStakes.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4">No running staking</td>
                                                </tr>
                                            ) : (
                                                runningStakes.map((stake, index) => (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{stake.amount} NAC</td>
                                                        <td>{new Date(stake.startDate).toLocaleDateString()}</td>
                                                        <td>{new Date(stake.endDate).toLocaleDateString()}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
