import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthUser } from 'react-auth-kit';
import { ThreeDots } from 'react-loader-spinner';
import moment from 'moment';

function Dashboard() {


    const [nacBalance, setNacBalance] = useState(0);
    const [daiBalance, setDaiBalance] = useState(0);
    const [nacRewardRates, setnacRewardRates] = useState(0);
    const [daiRewardRates, setDaiRewardRates] = useState(0);
    const [availableNacReward, setAvailableNacReward] = useState(6);
    const [availableDaiReward, setAvailableDaiReward] = useState(6);
    const [stakeCount, setStakeCount] = useState(0);
    const [referralId, setReferralId] = useState('');
    const [stakingDuration, setStakingDuration] = useState()
    const [referrals, setReferrals] = useState([]);
    const [referralPercentage, setReferralPercentage] = useState();
    const [loading, setLoading] = useState(true);
    const [diaEarningDays, setDaiEarningDays] = useState();
    const [error, setError] = useState()





    const authUser = useAuthUser();  // Extract authentication user
    const userId = authUser()?.userId;





    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!userId) throw new Error('No userId found');

                console.log('user id', userId);

                // Fetch user profile
                const userProfileResponse = await axios.get(`https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/user/profile/${userId}`);

                setNacBalance(userProfileResponse.data.profile.NacBalance);
                setDaiBalance(userProfileResponse.data.profile.DaiBalance);
                setStakeCount(userProfileResponse.data.profile.stakeCount);
                setReferralId(userProfileResponse.data.profile.referralCode);

                // Fetch staking configuration
                const stakingConfigResponse = await axios.get(`https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/stake/staking-config`);
                // Convert duration and daiEarningDays using moment
                const duration = moment.duration(stakingConfigResponse.data.duration, 'days');
                const daiDays = moment.duration(stakingConfigResponse.data.daiEarningDays, 'days');

                const formattedStakingDuration = formatDuration(duration);
                const formattedDaiEarningDays = formatDuration(daiDays);

                setStakingDuration(formattedStakingDuration);
                setDaiEarningDays(formattedDaiEarningDays);
                setReferralPercentage(stakingConfigResponse.data.referralPercentage)
                setDaiRewardRates(stakingConfigResponse.data.monthlyDaiRewardPercentage)
                setnacRewardRates(stakingConfigResponse.data.dailyNacRewardPercentage)

                //fetch available reward balance
                const daiRewardBalanceResponse = await axios.get(`https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/stake/available-dai-reward/${userId}`)
                console.log();
                setAvailableDaiReward(daiRewardBalanceResponse.data.availableDaiRewards)

                 //fetch available reward balance
                 const nacRewardBalanceResponse = await axios.get(`https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/stake/available-nac-reward/${userId}`)
                 console.log();
                 setAvailableNacReward(nacRewardBalanceResponse.data.availableNacRewards)

            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);


    const formatDuration = (duration) => {
        if (duration.asMonths() >= 1) {
            return `${duration.asMonths().toFixed(1)} months`;
        } else if (duration.asWeeks() >= 1) {
            return `${duration.asWeeks().toFixed(1)} weeks`;
        } else {
            return `${duration.asDays()} days`;
        }
    };

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
                        <div className="dashboard-container row flex-nowrap">
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
                                <p className='m-0 text-center'> NAC - <small className="text-muted">{nacRewardRates * 100}% </small></p>
                                <p className='text-center'>DAI - <small className="text-muted">{daiRewardRates * 100}% </small></p>
                            </div>
                            <div className="stake-block col-md-6 col-lg-3">
                                <h3>Stake Count</h3>
                                <p className='text-center'>{stakeCount}</p>
                            </div>
                        </div>

                        <div className='row mt-4'>
                            <div className='col-md-6 tx-area'>
                                <label htmlFor="amountInput" className="col-12">Amount (NAC):</label>
                                <input


                                    className='staking-input col-12'
                                    type='text'
                                    inputMode='numeric'
                                />
                               

                                <hr />

                                <p><strong>Profit calculation:</strong> Below is the break down when you stake _____</p>
                                <div className='estimated-container d-flex justify-content-center'>
                                    <div className='profit-estimate'><p>Daily</p>NAC</div>
                                    <div className='profit-estimate'><p>Weekly</p> NAC</div>
                                    <div className='profit-estimate'><p>Daily</p> DAI</div>
                                    <div className='profit-estimate'><p>Weekly</p> DAI</div>
                                </div>
                                <button

                                    className='btn btn-info w-100'
                                >
                                    STAKE
                                </button>
                                <div className="row mt-5">
                                    <div className="col-12 col-md-6 mb-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <p className="mb-0">Available NAC Rewards:</p>
                                            {availableNacReward}
                                            <button className="btn btn-success btn-sm">CLAIM</button>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <p className="mb-0">Available DAI Rewards:</p>
                                            {availableDaiReward}
                                            <button className="btn btn-success btn-sm">CLAIM</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='col-md-6 d-flex flex-column align-items-center'>
                                <div className='cards  w-100 w-md-auto'>

                                    <h6>Invite your friend and get {referralPercentage * 100}% bonus</h6>
                                    <p>Referral ID: {referralId}</p>

                                </div>
                                <div className='cards w-100 w-md-auto'>
                                    <h6>Staking Duration</h6>
                                    <p>{stakingDuration}</p>
                                </div>
                                <div className='cards  w-100 w-md-auto'>
                                    <h6>DAI Rewards Maturity:</h6>
                                    <p className=''> After every {diaEarningDays} </p>


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
