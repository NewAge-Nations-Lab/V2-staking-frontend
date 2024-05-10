// VerificationForm.js

import React, { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { makeAuthenticatedRequest } from '../api'; 

const VerificationForm = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await makeAuthenticatedRequest(
        'https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/auth/verify',
        'POST',
        { verifyCode: verificationCode }
      );
      console.log(verificationCode);
      if (response && response.status === 201) {
        // Verification Successful
        // You might want to handle this case if needed
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

  return (
    <div className="container mt-5 mb-5">
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="card-title text-center">Verification</h2>
          <p className="card-text text-center">Please enter the 6-digit verification code sent to your email:</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
              autoFocus
              className="form-control mb-3"
              placeholder="Verification Code"
            />
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <ThreeDots color="#ffffff" height={20} width={20} />
              ) : (
                'Verify'
              )}
            </button>
          </form>
          {error && <p className="text-danger text-center mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default VerificationForm;
