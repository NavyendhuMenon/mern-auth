import React, { useState, useEffect } from 'react';

const OTPForm = () => {
  const [otp, setOtp] = useState(['', '', '', '']); // Stores OTP digits
  const [timer, setTimer] = useState(30); // Countdown timer
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Disable Resend button during countdown
  const [isLoading, setIsLoading] = useState(false); // Button loading state

  // Handle OTP input changes
  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // If it's not a number or more than 1 digit, ignore
    if (/[^0-9]/.test(value) || value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next field if current one is filled
    if (value !== '' && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Handle Resend button click
  const handleResendClick = () => {
    setOtp(['', '', '', '']); // Clear OTP input
    setTimer(30); // Reset timer to 30 seconds
    setIsResendDisabled(true); // Disable Resend button
    startTimer(); // Start countdown again
  };

  // Timer logic
  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setIsResendDisabled(false); // Enable Resend button
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle OTP verification
  const handleVerifyClick = () => {
    setIsLoading(true);

    // Simulate OTP verification (replace this with actual logic)
    setTimeout(() => {
      alert('OTP Verified!');
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    // Start the timer when the component mounts
    startTimer();
  }, []);

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2>OTP Verification</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            id={`otp-input-${index}`}
            value={digit}
            maxLength="1"
            onChange={(e) => handleOtpChange(e, index)}
            style={{
              width: '40px',
              height: '40px',
              fontSize: '20px',
              textAlign: 'center',
              marginRight: '5px',
            }}
          />
        ))}
      </div>

      <button
        onClick={handleVerifyClick}
        disabled={otp.some((digit) => digit === '') || isLoading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: otp.some((digit) => digit === '') || isLoading ? 'not-allowed' : 'pointer',
          marginRight: '10px',
        }}
      >
        {isLoading ? 'Verifying...' : 'Verify'}
      </button>

      <div>
        <button
          onClick={handleResendClick}
          disabled={isResendDisabled}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: isResendDisabled ? 'not-allowed' : 'pointer',
          }}
        >
          {isResendDisabled ? `Resend in ${timer}s` : 'Resend OTP'}
        </button>
      </div>
    </div>
  );
};

export default OTPForm;
