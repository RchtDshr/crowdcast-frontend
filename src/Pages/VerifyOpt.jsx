import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VerifyOTP() {
  const [verifyotp, setverifyotp] = useState({ email: "", otp: ""});
  const navigate = useNavigate();

  const onChange = (e) => {
    setverifyotp({ ...verifyotp, [e.target.name]: e.target.value });
  };

  const handleVerifyOTPSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/user/verify-otp', {
            email: verifyotp.email,
            otp: verifyotp.otp
        });

        if (response.data.message === 'User verified successfully') {
            alert("OTP Verified Successfully");
            navigate('/'); // Redirect to home page
        } else {
            alert("OTP Verification failed: " + response.data.message);
        }
    } catch (error) {
        alert("OTP not verified, an error occurred: " + (error.response?.data?.message || error.message));
    }
  };


  return (
    <div className='font-primary w-[100vw] h-[100vh] flex justify-center items-center'>
      <div className='bg-white w-[80vw] h-[60vh] shadow-lg rounded-lg flex justify-around px-12 py-20 gap-12'>

        <div className='signin-left flex flex-1 flex-col items-start justify-start gap-2'>
          <img src="./logo.png" alt="logo" className='w-[60px] h-[60px] ' />
          <h1 className='font-bold text-3xl'>Welcome to CrowdCast</h1>
          <p className='text-sm'>Check your email to verify OTP.</p>
        </div>
        <div className='signin-right text-sm flex-1 flex justify-end items-end'>
          <form className='w-full pl-6' onSubmit={handleVerifyOTPSubmit}>
            <div className="mb-4 ">
              <input
                type="email"
                name="email"
                className="w-full text-sm bg-white px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Enter your email"
                value={verifyotp.email}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="otp"
                className="w-full text-sm bg-white px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Enter OTP"
                value={verifyotp.otp}
                onChange={onChange}
                required
              />
            </div>

            <div className="flex items-center justify-end gap-6 mt-10">
              <button
                type="submit"
                className="btn font-bold shadow-lg w-[8rem] hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
        
                Sign Up
           
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
