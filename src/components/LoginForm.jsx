import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useHistory } from 'react-router-dom'; // Import useHistory for routing
import { ThreeDots } from 'react-loader-spinner'; // Import the Loader component

const LoginForm = ({ onRegisterClick }) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false); // State to track loading state
  const history = useHistory(); // Get the history object for routing

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when login request starts
    try {
      // Send login data to the server
      const response = await axios.post('https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/auth/login', loginData);
      if (response.status === 201) {
        // Login successful, route user to dashboard
        history.push('/dashboard');
      } else {
        // Handle login failure
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false); // Set loading state back to false after login request completes
    }
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" value={loginData.username} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={loginData.password} onChange={handleInputChange} required />
        </div>
        {/* Conditionally render loader if loading state is true */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <ThreeDots
              type="ThreeDots"
              color="#ffffff"
              height={20}
              width={20}
            />
          ) : (
            'Login'
          )}
        </button>
      </form>
      <p>Don't have an account? <button className="link-button" onClick={onRegisterClick}>Register</button></p>
    </div>
  );
};

export default LoginForm;
