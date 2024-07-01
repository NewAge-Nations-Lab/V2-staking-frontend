import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import VerificationForm from './VerificationForm';

const RegistrationForm = () => {
  const [registrationData, setRegistrationData] = useState({ email: '', password: '', confirmPassword: '', username: '', phoneNumber: '', referralCode: '' });
  const [loading, setLoading] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [userData, setUserData] = useState(null); // State to store the user data (including email)
  const history = useHistory();

  const handleInputChange = (e) => {
    setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
  };

  const onLoginClick = () => {
    history.push('/Login');
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (registrationData.password !== registrationData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/auth/register', registrationData);
      if (response.status === 200) {
        const { userId, email } = response.data; // Extract userId and email from the response
        setUserData({ userId, email }); // Store both userId and email in state
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {userData ? ( // If userData exists, render VerificationForm with userId and email
        <VerificationForm userId={userData.userId} email={userData.email} />
      ) : (
        <div className="container mt-5 mb-5">
          <div className="card mx-auto" style={{ maxWidth: '400px' }}>
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
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
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={registrationData.confirmPassword} onChange={handleInputChange} required />
                  {passwordMatchError && <p className="text-danger">Passwords do not match</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                  <input type="tel" className="form-control" id="phoneNumber" name="phoneNumber" value={registrationData.phoneNumber} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="referralCode" className="form-label">Referral Code (optional)</label>
                  <input type="text" placeholder='The referral code of your referral' className="form-control" id="referralCode" name="referralCode" value={registrationData.referralCode} onChange={handleInputChange} />
                </div>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <ThreeDots color="#ffffff" height={20} width={20} />
                  ) : (
                    'Register'
                  )}
                </button>
              </form>
              <p className="text-center mt-3">Already have an account? <button className="btn btn-link" onClick={onLoginClick}>Login</button></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistrationForm;
