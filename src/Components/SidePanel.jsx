import React from 'react'
import { CirclePlus, LayoutDashboard, LogOut, Wallet2 } from 'lucide-react';

export default function SidePanel() {
  return (
    <div className='text-white bg-primary h-full w-[20vw] gap-4 fixed p-8 flex flex-col justify-between items-start'>
      <h1 className="welcome text-3xl font-bold text-wrap ">
        Welcome, Rachita
        {/* add username here */}
      </h1>
      <div className='flex flex-col justify-between items-start h-full'>

      
      <div className="route text-md flex flex-col gap-6 items-start justify-center">
        <div className="flex gap-3 items-start justify-center">
          <LayoutDashboard /> Dashboard
        </div>
        <div className="flex gap-3 items-start justify-center">
          <CirclePlus /> Create Ad
        </div>
        <div className="flex gap-3 items-start justify-center">
          <Wallet2 /> Wallet
        </div>
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
