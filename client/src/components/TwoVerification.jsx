import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reset2FA, verify2FA } from "../service/authApi";

const TwoVerification = ({ onVerifySuccess, onResetSucces }) => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState();
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const handleTokenVerification = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verify2FA(otp);
      onVerifySuccess(data);
    } catch (error) {
      setOtp("");
      console.log("The Error is", error.message);
      setError("Invalid OTP");
    }
    
  };

  const handleReset = async () => {
      try {
        const {data} = await reset2FA();
        onResetSucces(data)
      } catch (error) {
        console.log("The Error is", error.message);
        setError("Invalid OTP");
      }
    };
  return (
    <form
      onSubmit={handleTokenVerification}
      className="p-4 bg-white rounded-lg shadow-md w-full max-w-sm mx-auto"
    >
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">Validate TOPT</h2>
      </div>
      <hr className="text-gray-200 my-6" />
      <p className="text-center text-gray-600 text-lg font-light ">
        Please Enter 6 digit time based OTP to verify 2FA Authentication
      </p>
      <div className="p-6">
        <div className="mb-4">
          <label className="text-gray-600 text-sm"> TOTP</label>
          <input
            type="text"
            label="TOTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded-lg mt-2"
            placeholder="Enter Your Username"
            required
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {message && <p className="text-green-600 text-sm mb-3">{message}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md"
      >
        Verify TOTP
      </button>
      <button
        type="button"
        className="w-full bg-blue-600 text-white py-2 rounded-md mt-3"
        onClick={handleReset}
      >
        Reset 2FA
      </button>
    </form>
  );
};

export default TwoVerification;
