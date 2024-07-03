// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { useSignIn } from 'react-auth-kit';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onRegisterClick = () => {
    navigate('/registration');
  };

  const onForgotPasswordClick = () => {
    navigate('/forgot-password');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/auth/login', loginData);
      if (response.status === 200) {
        const { token, user } = response.data;
        const expiresIn = 3600; // 1 hour

        signIn({
          token: token,
          expiresIn: expiresIn,
          tokenType: "Bearer",
          authState: { username: user.username, userId: user.id } // Store userId
        });

        navigate('/dashboard');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
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
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? (
                  <ThreeDots color="#ffffff" height={20} width={20} />
                ) : (
                  'Login'
                )}
              </button>
            
         
        </form>
        
            <button  className="btn btn-link" onClick={onForgotPasswordClick}>Forgot Password?</button>
            <div>
        Don't have an account? <button  className="btn btn-link" onClick={onRegisterClick}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
