
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/otpvalidate.css';

const Otpvalidate = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loginData, setLoginData] = useState(null);
  const [otpValidationSuccess, setOtpValidationSuccess] = useState(false);

  const handleOtpChange = (e) => {
    const value = e.target.value;

    if (/^[0-9]*$/.test(value) && value.length <= 4) {
      setOtp(value);
    }
  };

  const handleSubmit = () => {
    if (otp.length === 4) {
      // Redirect back to the login page with OTP as a query parameter
      setOtpValidationSuccess(true);
      navigate(`/login?otp=${otp}`);
    } else {
      // Handle invalid OTP or incomplete data
    }
  };


  return (
    <div className="otp-container">
      <div className="otp-content">
        <h1>OTP Validation</h1>
        <p>Please enter the 4-digit OTP sent to your email.</p>
        <div className="otp-input-container">
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            maxLength="4"
            placeholder="4 digit otp"
          />
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>

      </div>
    </div>
  );
};

export default Otpvalidate;

