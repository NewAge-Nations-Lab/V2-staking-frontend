import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const RegistrationForm = ({ onLoginClick }) => {
  const [registrationData, setRegistrationData] = useState({ email: '', password: '', username: '', phoneNumber: '' });
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const handleInputChange = (e) => {
    setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
  };

  const handleVerificationInputChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      // Send registration data to the server
      const response = await axios.post('https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/register', registrationData);
      if (response.status === 200) {
        // Registration successful, show verification form
        setShowVerification(true);
      } else {
        // Handle registration failure
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      // Send verification code to the server
      const response = await axios.post(`https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/verify/${response.data.userId}`, { code: verificationCode });
      if (response.status === 200) {
        // Verification successful, you can redirect the user or perform any other action
        console.log('Verification successful');
      } else {
        // Handle verification failure
        console.error('Verification failed');
      }
    } catch (error) {
      console.error('Error during verification:', error);
    }
  };

  return (
    <div className="registration-form-container container mb-5">
      <div className="registration-form">
        <h2>Register</h2>
        {!showVerification ? (
          <form onSubmit={handleRegistration}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" name="username" value={registrationData.username} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={registrationData.email} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={registrationData.password} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input type="tel" className="form-control" id="phone" name="phoneNumber" value={registrationData.phoneNumber} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        ) : (
          <form onSubmit={handleVerification}>
            <div className="mb-3">
              <label htmlFor="verificationCode" className="form-label">Verification Code</label>
              <input type="text" className="form-control" id="verificationCode" name="verificationCode" value={verificationCode} onChange={handleVerificationInputChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Verify</button>
          </form>
        )}
        <p>Already have an account? <button className="link-button" onClick={onLoginClick}>Login</button></p>
      </div>
    </div>
  );
};

export default RegistrationForm;
