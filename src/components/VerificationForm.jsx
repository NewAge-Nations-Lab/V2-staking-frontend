import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Change from useHistory to useNavigate
import { ThreeDots } from 'react-loader-spinner';

const VerificationForm = ({ userId, email }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const navigate = useNavigate();  // Update from useHistory to useNavigate

  useEffect(() => {
    console.log("userId in VerificationForm:", userId);
    console.log("email in VerificationForm:", email);
    if (email) {
      setVerificationMessage(`A verification code has been sent to your email address: ${email}.`);
    }
  }, [userId, email]);

  const handleInputChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/auth/verify/${userId}`, { verifyCode: verificationCode });

      if (response.status === 200) {
        navigate('/verificationSuccess');  // Update from history.push to navigate
      } else {
        setError('Verification failed');
      }
    } catch (error) {
      setError('An error occurred while verifying');
      console.error('Verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="card-title text-center">Verification</h2>
          <p className="text-center text-info">{verificationMessage}</p>
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
            <button type="submit" className="btn btn-primary" disabled={loading}>
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
