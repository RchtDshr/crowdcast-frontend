import React from 'react'
import { LayoutDashboard, LogOut, Megaphone, Wallet2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function SidePanel() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/signin');
  };
  return (
    <div className='text-white z-100 bg-primary h-full w-[20vw] gap-4 fixed z-100 text-wrap p-7 flex flex-col justify-between items-start'>
      <h1 className="welcome text-3xl font-bold">
        Welcome, Rachita
        {/* add username here */}
      </h1>
      <div className='flex flex-col justify-between items-start h-full'>


        <div className="route text-md flex flex-col gap-6 items-start justify-center">
          <Link to='/dashboard' className='flex gap-3 items-start justify-center'>
            <LayoutDashboard /> Dashboard
          </Link>

          <Link to='/create-ad' className='flex gap-3 items-start justify-center'>
            <Megaphone /> Create Ad
          </Link>
          <Link to='/wallet' className='flex gap-3 items-start justify-center'>
            <Wallet2 /> Wallet
          </Link>

        </div>
        <div className="logout">
          <div className="flex gap-3 items-start justify-center">
            <button onClick={handleLogout}>
              <LogOut /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
