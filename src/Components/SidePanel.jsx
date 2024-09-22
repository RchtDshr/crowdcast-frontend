import React from 'react'
import { LayoutDashboard, LogOut, Megaphone, Wallet2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SidePanel() {
  return (
    <div className='text-white z-100 bg-primary h-full w-[20vw] gap-4 fixed z-100 text-wrap  p-8 flex flex-col justify-between items-start'>
      <h1 className="welcome text-3xl font-bold">
        Welcome, Rachita
        {/* add username here */}
      </h1>
      <div className='flex flex-col justify-between items-start h-full'>


        <div className="route text-md flex flex-col gap-6 items-start justify-center">
          <Link to='/' className='flex gap-3 items-start justify-center'>
            <LayoutDashboard /> Dashboard
          </Link>

          <Link to='/create' className='flex gap-3 items-start justify-center'>
            <Megaphone /> Create Ad
          </Link>
          <Link to='/wallet' className='flex gap-3 items-start justify-center'>
            <Wallet2 /> Wallet
          </Link>

        </div>
        <div className="logout">
          <div className="flex gap-3 items-start justify-center">
            <LogOut /> Logout
          </div>
        </div>
      </div>
    </div>
  )
}
