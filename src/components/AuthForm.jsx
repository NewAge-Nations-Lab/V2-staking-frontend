import React, { useState } from 'react';

const AuthForm = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ email: '', password: '', username: '', phoneNumber: '' });

  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    // Add your sign-in logic here
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // Add your sign-up logic here
  };

  const toggleForm = () => {
    setIsRegistered(!isRegistered);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6"> {/* Adjusted column classes */}
          {isRegistered ? (
            <div className="auth-form">
              <h2>Sign In</h2>
              <form onSubmit={handleSignInSubmit}>
                <input type="email" name="email" className="form-control mb-3" placeholder="Email" value={signInData.email} onChange={handleSignInChange} required />
                <input type="password" name="password" className="form-control mb-3" placeholder="Password" value={signInData.password} onChange={handleSignInChange} required />
                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
              </form>
              <p>Don't have an account? <span onClick={toggleForm}>Sign Up</span></p>
            </div>
          ) : (
            <div className="auth-form">
              <h2>Register</h2>
              <form onSubmit={handleSignUpSubmit}>
                <input type="email" name="email" className="form-control mb-3" placeholder="Email" value={signUpData.email} onChange={handleSignUpChange} required />
                <input type="password" name="password" className="form-control mb-3" placeholder="Password" value={signUpData.password} onChange={handleSignUpChange} required />
                <input type="text" name="username" className="form-control mb-3" placeholder="Username" value={signUpData.username} onChange={handleSignUpChange} required />
                <input type="tel" name="phoneNumber" className="form-control mb-3" placeholder="Phone Number" value={signUpData.phoneNumber} onChange={handleSignUpChange} required />
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
              </form>
              <p>Already have an account? <span onClick={toggleForm}>Sign In</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
