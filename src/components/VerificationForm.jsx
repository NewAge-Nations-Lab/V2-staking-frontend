import React, { useState } from 'react';


const VerificationForm = ({ onVerified }) => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleInputChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to send verification code to the server
    // Call onVerified function upon successful verification
    onVerified();
  };

  return (
    <div className="verification-form"> {/* Apply CSS class */}
      <h2>Verification</h2>
      <p>Please enter the 6-digit verification code you received:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="verificationCode"
          value={verificationCode}
          onChange={handleInputChange}
          maxLength={6}
          autoFocus
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerificationForm;
