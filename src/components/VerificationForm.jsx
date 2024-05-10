import React, { useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { FaCheckCircle } from 'react-icons/fa';

const VerificationForm = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  
  const handleInputChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Get the authentication token from local storage
      if (!token) {
        throw new Error('Authentication token not found');
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      };
      const response = await axios.post(
        `https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/auth/verify`,
        { verifyCode: verificationCode },
        config // Pass the config object with headers
      );
      if (response.status === 201) {
        setVerificationSuccess(true);
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during verification:', error);
      setError('Error during verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  ;

  return (
    <div className="container mt-5 mb-5">
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="card-title text-center">Verification</h2>
          {verificationSuccess ? (
            <div className="text-center mb-3">
              <FaCheckCircle color="green" size={50} />
              <p className="text-success mt-3">Verification Successful!</p>
              <p className="text-center"><a href="/login">Login</a> to your account.</p>
            </div>
          ) : (
            <>
              <p className="card-text text-center">Please enter the 6-digit verification code sent to your email:</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="verificationCode"
                  value={verificationCode}
                  onChange={handleInputChange}
                  maxLength={6}
                  autoFocus
                  className="form-control mb-3"
                  placeholder="Verification Code"
                />
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <ThreeDots
                      color="#ffffff"
                      height={20}
                      width={20}
                    />
                  ) : (
                    'Verify'
                  )}
                </button>
              </form>
              {error && <p className="text-danger text-center mt-3">{error}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationForm;
