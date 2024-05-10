import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

const RegistrationForm = ({ onLoginClick }) => {
  const [registrationData, setRegistrationData] = useState({ email: '', password: '', confirmPassword: '', username: '', phoneNumber: '' });
  const [loading, setLoading] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false); // State to track password match error
  const history = useHistory();

  const handleInputChange = (e) => {
    setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (registrationData.password !== registrationData.confirmPassword) {
      setPasswordMatchError(true);
      return; // Exit registration process
    }

    setLoading(true);
    try {
      const response = await axios.post('https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/auth/register', registrationData);
      if (response.status === 200) {
        // Extract the user ID from the response
        const { userId } = response.data;
        // Redirect to the verification page with the user ID
        history.push(`/verification/${userId}`);
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
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input type="tel" className="form-control" id="phone" name="phoneNumber" value={registrationData.phoneNumber} onChange={handleInputChange} required />
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
  );
};

export default RegistrationForm;
