import React from 'react'

function Cards() {
  return (
    <div className="container px-4 py-5" id="custom-cards">
                <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                    <div className="col">
                        <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg">
                            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">0.5% per day </h3>
                                <p>With Newage coin staking, you receive a daily return of 0.5% on your investment from the moment you start staking with us until the end of the staking period. This consistent yield ensures steady growth and rewards throughout your staking journey</p>
                                
                            </div>
                        </div>
                    </div>

                    <div className="col ">
                        <div className="card card-cover h-100 overflow-hidden text-bg-danger rounded-4 shadow-lg">
                            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Earn Dai token</h3>
                                <p className='text-center'>OStaking NAC with us presents a dual opportunity for growth. By engaging with our platform, you not only earn passive income from your NAC investment but also witness the growth of your DAI holdings, making it an ideal avenue for expanding your investment portfolio</p>
                              
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg">
                            <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Double Earning</h3>
                                <p>In Newage coin staking, you have the opportunity to double your earnings. By staking NAC, you not only earn rewards in NAC itself but also receive additional rewards in Dai, equivalent to the dollar value of the staked NAC</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default Cards