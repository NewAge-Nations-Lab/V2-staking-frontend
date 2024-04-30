import React, { useEffect, useState } from 'react';
import moment from 'moment';
import BalanceOverview from '../components/BalanceOverview';



function DashBoard() {
    



    
    const [rewardBalances, setRewardBalances] = useState("...");
    const [duration, setDuration] = useState(0);
    const [totalStakedAmount, setTotalStakedAmount] = useState();
    const [remainingStakingDurations, setRemainingStakingDurations] = useState([]);
    const [isStakeButtonDisabled, setIsStakeButtonDisabled] = useState(false);






    const handleChange = (e) => {
        
    }

    const handleStaking = async (e) => {
       
    }





    const handleClaimReward = async () => {
        
    }


    return (
        <div className='container-fluid parent-layout d-flex'>

            <div className='col-2 side-bar d-none d-md-block'>
                <h3>Dashboard</h3>
                <ul>
                    <li> <a href="#">Profile</a></li>
                    <li> <a href="#">P2P</a></li>
                    <li> <a href="#">Referer Link</a></li>
                    <li className='mt-5'> <a href="#">Sign Out</a></li>
                </ul>

                
            </div>

            <div className='container col-md-10'>
              
                <BalanceOverview />

                

                <div className='row mt-4' >
                    <div className='col-md-6 tx-area' >
                        <p>Min:  NAC</p>
                        <p>Max: NAC</p>

                        <input onChange={handleChange} className='staking-input col-12' type='text' inputmode='numeric' placeholder='Amount' />
                        <button
                            onClick={handleStaking}
                            className='staking-btn btn btn-primary col-12'
                            disabled={isStakeButtonDisabled}
                        >
                            {isStakeButtonDisabled ? 'Pls enter Min Amount' : 'STAKE'}
                        </button>



                        <div className='mt-5'>
                            <p className='col-12'>Available Rewards: {rewardBalances} NAC</p>
                            <button onClick={handleClaimReward} className='btn btn-success'>CLAIM REWARD</button>
                        </div>
                    </div>

                    <div className='col-md-6 d-flex flex-column align-items-center'>
                        <div className='card d-flex w-100 w-md-auto'>
                            <p>Stake amount:</p>
                            <p>{totalStakedAmount} NAC</p>
                        </div>
                        <div className='card d-flex w-100 w-md-auto'>
                            <p>Lock Period:</p>
                            <p>{moment.duration(duration, 'seconds').humanize()}</p>
                        </div>
                        <div className='card d-flex w-100 w-md-auto'>
                            <p>Available Reward:</p>
                            <p>{rewardBalances} NAC</p>
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
                                    {remainingStakingDurations.length === 0 ? (
                                        <tr>
                                            <td colSpan="4">No running stakiing</td>
                                        </tr>
                                    ) : (
                                        remainingStakingDurations
                                            .filter(stakeInfo => parseInt(stakeInfo.remainingDuration._hex, 16) !== 0)
                                            .map((stakeInfo, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td></td>
                                                    <td>{moment.unix(parseInt(stakeInfo.startTime._hex, 16)).fromNow(true)}</td>
                                                    <td>{moment.duration(parseInt(stakeInfo.remainingDuration._hex, 16), 'seconds').humanize()}</td>
                                                </tr>
                                            ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>




            </div>

          
        </div>
    );
}

export default DashBoard ;