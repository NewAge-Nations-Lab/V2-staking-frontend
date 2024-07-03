import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);  // Track if password was reset
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  useEffect(() => {
    // Check if token is present
    if (!token) {
      setMessage('Token is missing. Please use the link from your email.');
      setIsError(true);
    }
  }, [token]);

  const handleInputChange = (e) => {
    if (e.target.name === 'newPassword') {
      setNewPassword(e.target.value);
    } else if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsError(true);
      return;
    }

    try {
      await axios.post('https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/user/reset-password', { token, newPassword });
      setMessage('Your password has been reset successfully.');
      setIsError(false);
      setPasswordReset(true);  // Indicate that password was successfully reset
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Error resetting password. Please try again later.');
      setIsError(true);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
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
          <h2 className="card-title text-center">Reset Password</h2>
          {!passwordReset ? (
            <>
              <p className="text-center mb-3" style={{ fontSize: '12px' }}>
                Enter your new password and confirm it.
              </p>
              <form onSubmit={handleResetPassword}>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    name="newPassword"
                    value={newPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm New Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Reset Password</button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="alert alert-info mt-3" role="alert">
                {message}
              </div>
              <button className="btn btn-primary mt-3" onClick={handleLoginRedirect}>
                Go to Login
              </button>
            </div>
          )}
          {message && !passwordReset && (
            <div className={`alert ${isError ? 'alert-danger' : 'alert-info'} mt-3`} role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
