import React from 'react';
import logo from '../images/homeabout.png'


function HomeAbout() {
  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="h-100 p-5 website-red text-white rounded-3">
            <h2>About us</h2>

            <p>
            We are a trusted organization dedicated to developing secure and profitable applications tailored for cryptocurrency investors. Our commitment to security and profitability ensures peace of mind and lucrative opportunities for our clients.
            </p>
           <ul className='' style={{fontSize:"1.2rem", fontWeight:"bold"}}>
            <li>Earn 0.5% daily</li>
            <li>Stake NAC and earn DAI and NAC</li>
            <li>Buy NAC with our efficient P2P services</li>
           </ul>
           <small>As a reputable entity, we specialize in crafting secure and lucrative applications designed specifically for cryptocurrency investors. With a focus on reliability and profitability, our offerings cater to the diverse needs of our discerning clientele, ensuring satisfaction and success in their investment endeavors.</small>
          </div>
        </div>
        <div className="col-md-6">
        <img src={logo} alt="Logo" width={700} height={500}/>
           
          
        </div>
      </div>
    </div>
  );
}

export default HomeAbout;
