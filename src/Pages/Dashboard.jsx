import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SidePanel from '../Components/SidePanel'
import Navbar from '../Components/Navbar'
import AdDetails from './AdDetails'
import CreateAd from './CreateAd'

export default function Dashboard() {
  return (
    <div className='font-primary'>
        <SidePanel/>
        <Navbar/>
        <div className="relative left-[20vw] top-20 w-[80vw] ">
        <Routes>
          <Route path="/" element={<AdDetails />} />
          <Route path="/create" element={<CreateAd />} />
          {/* <Route path="/wallet" element={<Wallet />} /> */}
        </Routes>
        </div>
    </div>
  )
}
