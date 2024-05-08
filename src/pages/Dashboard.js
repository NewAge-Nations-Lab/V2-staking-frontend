import React from 'react';
import BalanceOverview from '../components/BalanceOverview';



function Dashboard() {



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
                    <li> <a href="/">Profile</a></li>
                    <li> <a href="/">P2P</a></li>
                    <li> <a href="/">Referer Link</a></li>
                    <li className='mt-5'> <a href="/">Sign Out</a></li>
                </ul>


            </div>

            <div className='container col-md-10'>

                <BalanceOverview />



                <div className='row mt-4' >
                    <div className='col-md-6 tx-area'>
                        <p>Min:100 NAC</p>
                        <p>Max:10000 NAC</p>
                        <label htmlFor="amountInput" className="col-12">Amount (NAC):</label>
                        <input onChange={handleChange} className='staking-input col-12' type='text' inputmode='numeric' />

                        <div className="button-group col-12 d-flex justify-content-center">
                            <button className="mr-2">100</button>
                            <button className="mr-2">500</button>
                            <button className="mr-2">1000</button>
                            <button className="ml-2">All</button>
                        </div>
                        <p className='text-center'>Transfer from NAC Balance: 100 </p>
                        <hr />
                        <p>if you stake 500 NAC, Your stimated returns will be</p>
                        <div className='estimated-container d-flex justify-content-center'>
                            <div className='profit-estimate'><p>Daily</p>0.90 NAC</div>
                            <div className='profit-estimate'><p>Monthly</p>20.00 NAC</div>
                            <div className='profit-estimate'><p>Yearly</p>150 NAC</div>
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
                                        <td colSpan="4">No running stakiing</td>
                                    </tr>



                                    <tr >
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