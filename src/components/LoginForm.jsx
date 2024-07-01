import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onRegisterClick = () => {
    history.push('/Registration');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/auth/login', loginData);
      if (response.status === 200) {
        // Login successful, route user to dashboard
        history.push('/dashboard');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" name="username" value={loginData.username} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={loginData.password} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <ThreeDots color="#ffffff" height={20} width={20} />
              ) : (
                'Login'
              )}
            </button>
          </form>
          <p className="text-center mt-3">Don't have an account? <button className="btn btn-link" onClick={onRegisterClick}>Register</button></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
