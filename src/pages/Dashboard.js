import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthUser } from 'react-auth-kit';
import { ThreeDots } from 'react-loader-spinner';

function Dashboard() {
   
    
    const [nacBalance, setNacBalance] = useState(0);
    const [daiBalance, setDaiBalance] = useState(0);
    const [nacRewardRates, setnacRewardRates] = useState(0);
    const [daiRewardRates, setDaiRewardRates] = useState(0);
    const [stakeCount, setStakeCount] = useState(0);
    const [referralId, setReferralId] = useState('');
    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [test, setTest] = useState();
    const [error, setError] = useState()

    
  

   
    const authUser = useAuthUser();  // Extract authentication user
    const userId = authUser()?.userId;
    console.log(test);
    

    

    useEffect(() => {
        const fetchData = async () => {
          try {
            if (!userId) throw new Error('No userId found');
    
            
    
            console.log('user id', userId);
    
            const response = await axios.get(`https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/user/profile/${userId}`);
            setTest(response.data);
            setNacBalance(response.data.profile.NacBalance)
            setDaiBalance(response.data.profile.DaiBalance)
            setStakeCount(response.data.profile.stakeCount)
            setReferralId(response.data.profile.referralCode)
          } catch (error) {
            console.error("Error fetching data:", error);
            setError(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [ userId]);

    const handleChange = (e) => {
        //handle change logi
    }

    const handleStakeButtonClick = () => {
        // Deduct the stake amount from the NAC balance and place it in the in
    }

    

   

    const handleStaking = async () => {
       //handle staking logic
    }

    const handleClaimReward = async () => {
        //handle claim reward logic
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
                                <p className='text-center'>{nacBalance}</p>
                            </div>
                            <div className="balance-block col-md-6 col-lg-3">
                                <h3>DAI Balance</h3>
                                <p className='text-center'>{daiBalance}</p>
                            </div>
                            <div className="stake-block col-md-6 col-lg-3">
                                <h3>Reward Rates</h3>
                                
                                <p className='m-0'>{nacRewardRates}% NAC - <small className="text-muted">Monthly</small></p>
                                <p>{daiRewardRates}% DAI -- <small className="text-muted">Weekly</small>  </p>
                                
                                
                            </div>
                            <div className="stake-block col-md-6 col-lg-3">
                                <h3>Stake Count</h3>
                                <p className='text-center'>{stakeCount}</p>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-md-6 tx-area'>
                                <p>Min: 100 NAC</p>
                                <p>Max: 10000 NAC</p>
                                <label htmlFor="amountInput" className="col-12">Amount (NAC):</label>
                                <input
                                    
                                  
                                    className='staking-input col-12'
                                    type='text'
                                    inputMode='numeric'
                                />
                                <div className="button-group col-12 d-flex justify-content-center">
                                    <button className="mr-2">1000</button>
                                    <button className="ml-2">All</button>
                                </div>
                                
                                <hr />
                                

                                <div className='estimated-container d-flex justify-content-center'>
                                    <div className='profit-estimate'><p>Daily</p>NAC</div>
                                    <div className='profit-estimate'><p>Weekly</p> NAC</div>
                                    <div className='profit-estimate'><p>Monthly</p> NAC</div>
                                    <div className='profit-estimate'><p>Yearly</p> NAC</div>
                                </div>
                                <button
                                    
                                    className='staking-btn'
                                >
                                    STAKE
                                </button>
                                <div className='mt-5'>
                                    <p className='col-12'>Available Rewards: 0 NAC</p>
                                    <button className='btn btn-success'>CLAIM REWARD</button>
                                </div>
                            </div>
                            <div className='col-md-6 d-flex flex-column align-items-center'>
                                <div className='cards d-flex w-100 w-md-auto'>
                                    
                                    <p><p>Invite your friend and get 10% bonus</p>Your referral ID: {referralId}</p>

                                </div>
                                <div className='cards d-flex w-100 w-md-auto'>
                                    <p>Current Staking Duration</p>
                                    <p></p>
                                </div>
                                <div className='cards d-flex w-100 w-md-auto'>
                                    <p>Transaction History</p>
                                    
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
