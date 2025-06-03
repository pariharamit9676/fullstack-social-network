import React, { useState, useRef } from "react";

const OtpInput = ({ length = 6, onVerify=() => {}, loading=false }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^\d$/.test(value) && value !== "") return; // Allow only single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const finalOtp = otp.join("");
    if (finalOtp.length === length) {
      onVerify(finalOtp);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      <div className="flex gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            value={digit}
            maxLength="1"
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleBackspace(index, e)}
            className="w-12 h-12 border rounded text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      <button
        onClick={handleVerify}
        className="bg-green-500 text-white py-2 px-6 mt-4 rounded disabled:bg-gray-400"
        disabled={otp.includes("")}
      >
       {
        loading? "Verifying...":"VerifyOTP"
       }
      </button>
    </div>
  );
};

export default OtpInput;
