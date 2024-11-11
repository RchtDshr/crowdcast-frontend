import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signin() {
    const [signinCredentials, setSigninCredentials] = useState({ email: "", password: "" });
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const onChange = (e) => {
        setSigninCredentials({ ...signinCredentials, [e.target.name]: e.target.value });
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/user/signin', signinCredentials);

            // const { token, userId, userEmail } = response.data;

            // Store the JWT token in localStorage
            // localStorage.setItem('token', token);
            // localStorage.setItem('userId', userId);
            // localStorage.setItem('userEmail', userEmail);

            // Set the token in axios defaults for future requests
            // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                localStorage.setItem('signInSuccess', 'true');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            toast.error('Sign In Failed', {
                position: "bottom-center"
            });
            
        }
    };

    return (
        <div className='font-primary w-[100vw] h-[100vh] flex justify-center items-center'>
            <div className='bg-white w-[80vw] h-[60vh] shadow-lg rounded-lg flex justify-around px-12 py-20 gap-12'>
                <div className='signin-left flex flex-1 flex-col items-start justify-start gap-2'>
                    <img src="./logo.png" alt="logo" className='w-[60px] h-[60px] ' />
                    <h1 className='font-bold text-3xl'>Welcome to CrowdCast</h1>
                    <p className='text-sm'>Welcome! Please sign in to continue</p>
                </div>
                <div className='signin-right text-sm flex-1 flex justify-end items-end relative'>
                    <form className='w-full pl-6' onSubmit={handleSignInSubmit}>
                        <div className="mb-4 relative">
                            <input
                                type="email"
                                name="email"
                                className="w-full text-sm bg-white px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Enter Email"
                                value={signinCredentials.email}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="mb-4 relative">
                            <input
                                type={visible ? "text" : "password"}
                                name="password"
                                className="w-full relative text-sm bg-white px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Enter Password"
                                value={signinCredentials.password}
                                onChange={onChange}
                                required
                            />
                            <span
                                onClick={() => setVisible(!visible)}
                                className="absolute right-2 top-3 cursor-pointer text-gray-500 mt-1"
                            >
                                {visible ? <EyeOff /> : <Eye />}
                            </span>
                        </div>

                        <div className="flex items-center justify-end gap-6 mt-10">
                            <p className='text-sm font-bold text-primary hover:underline'>
                                <Link to='/signup'>Create Account</Link>
                            </p>
                            <button
                                type="submit"
                                className="btn font-bold shadow-lg w-[8rem] hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}