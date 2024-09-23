import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SidePanel from '../Components/SidePanel'
import Navbar from '../Components/Navbar'
import AdDetails from './AdDetails'
import CreateAd from './CreateAd'
import Wallet from './Wallet'

export default function Dashboard() {
  return (
    <div className='font-primary'>
        <SidePanel/>
        <Navbar/>
        <div className="relative z-1 left-[20vw] top-20 w-[80vw] overflow-x-hidden">
        <Routes>
          <Route path="/" element={<AdDetails />} />
          <Route path="/create-ad" element={<CreateAd />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
        </div>
    </div>
  )
}
