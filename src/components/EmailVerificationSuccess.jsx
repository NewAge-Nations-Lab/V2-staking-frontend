import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerificationSuccess = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogin = () => {
    // Redirect the user to the login route
    navigate('/login'); // Use navigate() to perform the redirect
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="card-title text-center text-success">Email Verification Successful</h2>
          <p className="text-center">Your email address has been successfully verified.</p>
          <div className="text-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationSuccess;
