import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
// import { Carousel } from 'react-responsive-carousel';
import slide1 from "../images/slide1.jpg";
import slide2 from "../images/slide2.jpg";
import slide3 from "../images/slide3.jpg";
import slide4 from "../images/slide4.jpg";
import slide5 from "../images/slide5.jpg";

function MyCarousel() {
  return (
    <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" className="" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" className="" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="3" className="" aria-label="Slide 4"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="4" className="active" aria-current="true"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item">
          <img src={slide3} alt='slide-1' width="100%" height={500}/>
          <div className="container">
            <div className="carousel-caption text-start">
              <h1>Empowering Futures, Enriching Lives</h1>
              <p className="opacity-75 slide-p-size">Your Trusted cryptocurrency platform investment for Compassionate
                investors</p>
                <p><Link className="btn btn-lg btn-danger" to="/AuthForm">Sign up today</Link></p>
            </div>
          </div>
        </div>
        <div className="carousel-item active carousel-item-start">
          <img src={slide2} alt='slide-2' width="100%" height={500}/>
          <div className="container">
            <div className="carousel-caption">
              <h1>Newage coin staking - Nurturing Dreams, Transforming Wealth</h1>
              <p className="opacity-75 slide-p-size" >"24/7 Service for Cryptocurrency
                investors, Earn in Dai and Nac every day."</p>
                <p><Link className="btn btn-lg btn-danger" to="/AuthForm">Sign up today</Link></p>
            </div>
          </div>
        </div>
        <div className="carousel-item carousel-item-next carousel-item-start">
          <img src={slide1} alt='slide-3' width="100%" height={500}/>
          <div className="container">
            <div className="carousel-caption text-end">
              <h1>Newage coin staking.</h1>
              <p className="opacity-75 slide-p-size">"Embark on a journey of holistic investment, where each service orchestrates a harmonious symphony of well-being."</p>
                <p><Link className="btn btn-lg btn-danger" to="/AuthForm">Sign up today</Link></p>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img src={slide4} alt='slide-4' width="100%" height={500}/>
          <div className="container">
            <div className="carousel-caption">
              <h1>Stake and Earn in NAC & DAI</h1>
              <p className="opacity-75 slide-p-size">You can start earning daily percentage in NAC and DAI today</p>
              <p><Link className="btn btn-lg btn-danger" to="/AuthForm">Sign up today</Link></p>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img src={slide5} alt='slide-5' width="100%" height={500}/>
          <div className="container">
            <div className="carousel-caption">
              <h1>Our Specialty</h1>
              <p className="opacity-75 slide-p-size">We specialize in providing top-notch staking investment services, catering to a diverse range of needs</p>
              <p><Link className="btn btn-lg btn-danger" to="/AuthForm">Sign up today</Link></p>
            </div>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default MyCarousel;
