import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SidePanel from '../Components/SidePanel'
import Navbar from '../Components/Navbar'
import { isAuthenticated } from '../utils/authUtils'

export default function DashboardLayout() {
  // if (!isAuthenticated()) {
  //   // Redirect to the login page if user is not authenticated
  //   return <Navigate to="/signin" replace />;
  // }
  return (
    <div className='font-primary w-screen h-screen'>
        <SidePanel/>
        <Navbar/>
        <div className="relative h-full p-4 z-0 left-[20vw] top-20 w-[80vw] overflow-x-hidden">
            <Outlet />
        </div>
    </div>
  )
}