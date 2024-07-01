import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { useAuth } from '../components/AuthContext'; // Adjust the path as necessary

const LoginForm = () => {
  const { login } = useAuth(); // Access the login function from AuthContext
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
      await login(loginData.username, loginData.password); // Use the login function from AuthContext
      history.push('/dashboard'); // Redirect upon successful login
    } catch (error) {
      console.error('Error during login:', error);
      // Handle specific error cases or provide user feedback
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
