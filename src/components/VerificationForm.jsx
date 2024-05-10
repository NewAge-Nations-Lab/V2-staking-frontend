import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'; // Import the ThreeDots loader component
import { FaCheckCircle } from 'react-icons/fa'; // Import the FaCheckCircle icon for success

const VerificationForm = ({ userId }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading state
  const [verificationSuccess, setVerificationSuccess] = useState(false); // State to track verification success
  const history = useHistory();

  const handleInputChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when verification request starts
    try {
      const response = await axios.post(`https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/auth/verify/${userId}`, { code: verificationCode });
      if (response.status === 200) {
        // Verification succeeded
        setVerificationSuccess(true);
        // Redirect to dashboard after successful verification
        history.push('/dashboard');
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (error) {
      setError('Error during verification. Please try again.');
    } finally {
      setLoading(false); // Set loading state back to false after verification request completes
    }
  };

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
                {/* Conditionally render loader if loading state is true */}
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
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
