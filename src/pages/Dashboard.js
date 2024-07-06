import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import { ThreeDots } from 'react-loader-spinner';
import moment from 'moment';

function Dashboard() {


    const [nacBalance, setNacBalance] = useState(0);
    const [daiBalance, setDaiBalance] = useState(0);
    const [nacRewardRates, setnacRewardRates] = useState(0);
    const [daiRewardRates, setDaiRewardRates] = useState(0);
    const [nacUsdRate, setNacUsdRate] = useState(0);
    const [availableNacReward, setAvailableNacReward] = useState(6);
    const [availableDaiReward, setAvailableDaiReward] = useState(6);
    const [stakeCount, setStakeCount] = useState(0);
    const [referralId, setReferralId] = useState('');
    const [stakingDuration, setStakingDuration] = useState()
    const [referrals, setReferrals] = useState([]);
    const [referralPercentage, setReferralPercentage] = useState();
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [diaEarningDays, setDaiEarningDays] = useState();
    const [stakeAmount, setStakeAmount] = useState(0);
    const [dailyNacReward, setDailyNacReward] = useState(0);
    const [weeklyNacReward, setWeeklyNacReward] = useState(0);
    const [weeklyDaiReward, setWeeklyDaiReward] = useState(0);
    const [monthlyDaiReward, setMonthlyDaiReward] = useState(0);
    const [max, setMax] = useState(21000000);
    const [error, setError] = useState();
    const [showReferralComponent, setShowReferralComponent] = useState(false); // State to toggle referral component






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
                setNacUsdRate(stakingConfigResponse.data.nacPriceUSD)

                //fetch available reward balance
                const daiRewardBalanceResponse = await axios.get(`https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/stake/available-dai-reward/${userId}`)
                console.log();
                setAvailableDaiReward(daiRewardBalanceResponse.data.availableDaiRewards)

                //fetch available reward balance
                const nacRewardBalanceResponse = await axios.get(`https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/stake/available-nac-reward/${userId}`)
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


    const handleStakeAmountChange = (e) => {
        const value = e.target.value;

        // Check if the input value is a number
        const amount = parseFloat(value);

        if (isNaN(amount)) {
            setStakeAmount('');
            setDailyNacReward(0);
            setWeeklyNacReward(0);
            setWeeklyDaiReward(0);
            setMonthlyDaiReward(0);
            return;
        }

        if (amount > max) {
            setStakeAmount(max);
        } else {
            setStakeAmount(amount);
        }

        const dailyNac = (amount > max ? max : amount) * nacRewardRates;
        const weeklyNac = dailyNac * 7;

        const daiEquivalent = (amount > max ? max : amount) * nacUsdRate;
        const weeklyDai = daiEquivalent * daiRewardRates / 4;
        const monthlyDai = daiEquivalent * daiRewardRates;

        setDailyNacReward(dailyNac);
        setWeeklyNacReward(weeklyNac);
        setWeeklyDaiReward(weeklyDai);
        setMonthlyDaiReward(monthlyDai);
    };




    const handleStake = async () => {
        try {
            setButtonLoading(true);
            await axios.post(`https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/stake/${userId}`, { nacAmount: stakeAmount });
            setError('');
            alert('Stake successful');
            setButtonLoading(false);
            // Refresh data after staking
            window.location.reload();
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
            setButtonLoading(false);
        }
    };

    const handleClaimNacReward = async () => {
        if (availableNacReward <= 0) {
            alert('No NAC rewards available to claim');
            return;
        }

        try {
            setButtonLoading(true);
            await axios.post(`https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/stake/claim-nac-reward/${userId}`);
            setError('');
            alert('NAC reward claimed successfully');
            setButtonLoading(false);
            // Refresh data after claiming reward
            window.location.reload();
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
            setButtonLoading(false);
        }
    };

    const handleClaimDaiReward = async () => {
        if (availableDaiReward <= 0) {
            alert('No DAI rewards available to claim');
            return;
        }

        try {
            setButtonLoading(true);
            await axios.post(`https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/stake/claim-dai-reward/${userId}`);
            setError('');
            alert('DAI reward claimed successfully');
            setButtonLoading(false);
            // Refresh data after claiming reward
            window.location.reload();
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
            setButtonLoading(false);
        }
    };

    const handleViewReferralsClick = () => {
        setShowReferralComponent(true);
    };

    const handleGoBackClick = () => {
        setShowReferralComponent(false);
    };

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

            </div>
            <div className='container col-md-10'>
                {loading ? (
                    <div className="text-center mt-5">
                        <ThreeDots color="#000" height={30} width={30} />
                    </div>
                ) : (
                    <>
                        <div className="dashboard-container row flex-nowrap mt-3">
                            <div className="balance-block col-md-6 col-lg-3">
                                <h3 className='text-center'>Total NAC Earned</h3>
                                <p className='text-center'>{nacBalance}</p>
                            </div>
                            <div className="balance-block col-md-6 col-lg-3">
                                <h3 className='text-center'>Total DAI Earned</h3>
                                <p className='text-center'>${daiBalance}</p>
                            </div>
                            <div className="stake-block col-md-6 col-lg-3">
                                <h3 className='text-center'>NAC USD Price</h3>
                                <p className='text-center'>${nacUsdRate}</p>
                            </div>
                            <div className="stake-block col-md-6 col-lg-3">
                                <h3 className='text-center'>Stake Count</h3>
                                <p className='text-center'>{stakeCount}</p>
                            </div>
                        </div>

                        <div className='row mt-4'>
                            <div className='col-md-6 tx-area'>
                                <p className=' '> NAC daily percentage - <small className="text-muted">{nacRewardRates * 100}% </small></p>
                                <p className=''>DAI weekly percentage - <small className="text-muted">{daiRewardRates * 100}% </small></p>
                                <label htmlFor="amountInput" className="col-12">Amount (NAC):</label>
                                <input
                                    className='staking-input col-12'
                                    type='text'
                                    inputMode='numeric'
                                    value={stakeAmount}
                                    onChange={handleStakeAmountChange}
                                />

                                <hr />

                                <p><strong>Profit calculation:</strong> Below is the break down when you stake {stakeAmount} NAC</p>
                                <div className='estimated-container d-flex justify-content-center'>
                                    <div className='profit-estimate'><p>Daily</p>NAC {dailyNacReward.toFixed(2)}</div>
                                    <div className='profit-estimate'><p>Weekly</p> NAC {weeklyNacReward.toFixed(2)}</div>
                                    <div className='profit-estimate'><p>Weekly</p> DAI {weeklyDaiReward.toFixed(2)}</div>
                                    <div className='profit-estimate'><p>Monthly</p> DAI {monthlyDaiReward.toFixed(2)}</div>
                                </div>

                                <button
                                    className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
                                    onClick={handleStake}
                                    disabled={buttonLoading} // Disable button while staking
                                >
                                    {buttonLoading ? (
                                        <div className="d-flex justify-content-center align-items-center w-100">
                                            <ThreeDots color="#fff" height={20} width={20} />
                                        </div>
                                    ) : (
                                        'Stake'
                                    )}
                                </button>

                                <div className="row mt-5">
                                    <div className="col-12 col-md-6 mb-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <p className="mb-0">Available NAC Rewards:</p>
                                            {availableNacReward}

                                            <button
                                                className="btn btn-success btn-sm d-flex justify-content-center align-items-center"
                                                onClick={handleClaimNacReward}
                                                disabled={buttonLoading} // Disable button while staking
                                            >
                                                {buttonLoading ? (
                                                    <div className="d-flex justify-content-center align-items-center w-100">
                                                        <ThreeDots color="#fff" height={20} width={20} />
                                                    </div>
                                                ) : (
                                                    'ClAIM'
                                                )}
                                            </button>



                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <p className="mb-0">Available DAI Rewards:</p>
                                            {availableDaiReward}
                                            <button
                                                className="btn btn-success btn-sm d-flex justify-content-center align-items-center"
                                                onClick={handleClaimDaiReward}
                                                disabled={buttonLoading} // Disable button while staking
                                            >
                                                {buttonLoading ? (
                                                    <div className="d-flex justify-content-center align-items-center w-100">
                                                        <ThreeDots color="#fff" height={20} width={20} />
                                                    </div>
                                                ) : (
                                                    'ClAIM'
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='col-md-6 d-flex flex-column align-items-center'>

                                {/* please chatgpt help modify this, when they click this card i want it to show ReferralComponent then it should return when they click go back on referal component */}
                                <div className='cards  w-100 w-md-auto'>

                                    <h6>Invite your friend and get {referralPercentage * 100}% bonus</h6>
                                    <p>Referral ID: {referralId}</p>
                                    
                                    <p><Link
                                        className=" text-info"
                                        to="/referral-list"    
                                    >
                                        View referrals
                                    </Link></p>
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
