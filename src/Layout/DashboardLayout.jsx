import React from 'react'
import { Outlet } from 'react-router-dom'
import SidePanel from '../Components/SidePanel'
import Navbar from '../Components/Navbar'

export default function DashboardLayout() {
  return (
    <div className='font-primary'>
        <SidePanel/>
        <Navbar/>
        <div className="relative h-full z-0 left-[20vw] top-20 w-[80vw] overflow-x-hidden">
            <Outlet />
        </div>
    </div>
  )
}