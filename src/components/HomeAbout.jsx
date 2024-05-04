import React from 'react';
import referalImage from '../images/ReferralBonus.png';

function HomeAbout() {
  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="h-100 p-5 website-red text-white rounded-3">
            <h2>About us</h2>
            <p>We are a trusted organization dedicated to developing secure and profitable applications tailored for cryptocurrency investors. Our commitment to security and profitability ensures peace of mind and lucrative opportunities for our clients.</p>
            <ul className='' style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              <li>Earn 0.5% daily</li>
              <li>Stake NAC and earn DAI and NAC</li>
              <li>Buy NAC with our efficient P2P services</li>
            </ul>
            <small>As a reputable entity, we specialize in crafting secure and lucrative applications designed specifically for cryptocurrency investors. With a focus on reliability and profitability, our offerings cater to the diverse needs of our discerning clientele, ensuring satisfaction and success in their investment endeavors.</small>
          </div>
        </div>
        <div className="col-md-6">
          <div className='text-center'>
            <img src={referalImage} alt='Referral Bonus' width={250} height={200} />
            <h3 style={{ fontFamily: 'Arial, sans-serif', color: '#1a1a1a' }}>Unlock a Rewarding Opportunity</h3>
            <p>Empower your network and reap the benefits with our exclusive Referrer Bonus. Refer a friend to our platform and enjoy a lucrative 10% bonus from their investment, adding value to both your portfolio and theirs.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomeAbout;
