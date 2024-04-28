import React, { useState } from 'react';
import emailjs from 'emailjs-com';

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    // Use your EmailJS service, template, and user IDs
    const serviceId = 'your_emailjs_service_id';
    const templateId = 'your_newsletter_template_id';
    const userId = 'your_emailjs_user_id';

    try {
      await emailjs.send(serviceId, templateId, { email }, userId);

      alert('Newsletter subscription successful!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      alert('Failed to subscribe to the newsletter. Please try again.');
    }
  };

  return (
    <footer className="container-fluid py-5">
      <div className="container p-5 text-center">
      <div className="mx-auto" style={{ maxWidth: "700px" }}>
        <h4>Sign Up For Our Newsletter</h4>
        <p>FSubscribe to our newsletter for exclusive updates delivered straight to your inbox. Stay ahead of the curve with firsthand information and insights from our team</p>

        <form className="mb-5" onSubmit={handleNewsletterSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control newsletter"
                placeholder="Enter email to receive updates"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">Send</button>
            </div>
          </form>
      </div>
    </div>



      <div className="row">
        <div className="col-12 col-md">
          
          <small className="d-block mb-3  text-white"><b>Help</b><br/>support@newagecoin.cash <br/>
            <br/>
            
            </small>
            
        </div>
        <div className="col-6 col-md">
          <h5>Features</h5>
          <ul className="list-unstyled text-small">
            <li>Staking</li>
            <li>P2P</li>
            <li>NAC Earnings</li>
            <li>DAI Earnings</li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>Partners</h5>
          <ul className="list-unstyled text-small">
            <li>Cryptocurrency</li>
            <li>polygon network</li>
            <li>Another partner</li>
            <li>Final partner</li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>About</h5>
          <ul className="list-unstyled text-small">
            <li>Team</li>
            <li>Locations</li>
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>
        <p className=" text-white">copyright© {year}</p>
      </div>
    </footer>
  );
}

export default Footer;
