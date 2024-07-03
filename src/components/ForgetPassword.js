import React, { useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);  // Add state for loading

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading
    try {
      await axios.post('https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/user/forgot-password', { email });
      setMessage('A password reset link has been sent successfully. If the email is registered, you will receive the password reset link.');
      setIsError(false);
    } catch (error) {
      console.error('Error sending reset password email:', error);
      setMessage('Error sending reset password email. Please try again later.');
      setIsError(true);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '400px',
    margin: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div className="card-body">
          <h2 className="card-title text-center">Forgot Password</h2>
          <p className="text-center mb-3" style={{ fontSize: '12px' }}>
            Enter your newagecoin.cash email address so we can send your password reset link.
          </p>
          <form onSubmit={handleForgotPassword}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}  // Disable button while loading
              >
                {loading ? (
                  <ThreeDots
                    height="20"
                    width="50"
                    radius="9"
                    color="#fff"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </div>
          </form>
          {message && (
            <div className={`alert ${isError ? 'alert-danger' : 'alert-info'} mt-3`} role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
