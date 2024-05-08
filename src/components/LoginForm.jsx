// LoginForm.js
import React, { useState } from 'react';

const LoginForm = ({ onLogin, onRegisterClick }) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to send login data to the server
    // Call onLogin function upon successful login
    onLogin();
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" value={loginData.username} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={loginData.password} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p>Don't have an account? <button className="link-button" onClick={onRegisterClick}>Register</button></p>
    </div>
  );
};

export default LoginForm;
