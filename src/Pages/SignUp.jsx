import React, { useState } from 'react'

export default function SignUp() {
  const [signupCredentials, setsignupCredentials] = useState({name: "", email: "", password: "" });


  const onChange = (e) => {
    setsignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='font-primary w-[100vw] h-[100vh] flex justify-center items-center'>
      <div className='bg-white w-[80vw] h-[60vh] shadow-lg rounded-lg flex justify-around px-12 py-20 gap-12'>

        <div className='signin-left flex flex-1 flex-col items-start justify-start gap-2'>
          <img src="./logo.png" alt="logo" className='w-[60px] h-[60px] ' />
          <h1 className='font-bold text-3xl'>Welcome to CrowdCast</h1>
          <p className='text-sm'>Welcome! Please sign up to continue</p>
        </div>
        <div className='signin-right text-sm flex-1 flex justify-end items-end'>
          <form className='w-full pl-6'>
            <div className="mb-4 ">
              <input
                type="text"
                name="name"
                className="w-full text-sm bg-white px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Enter your name"
                value={signupCredentials.name}
                onChange={onChange}
              />
            </div>
            <div className="mb-4 ">
              <input
                type="email"
                name="email"
                className="w-full text-sm bg-white px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Enter Email"
                value={signupCredentials.email}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                className="w-full text-sm bg-white px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Enter Password"
                value={signupCredentials.password}
                onChange={onChange}
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
