import React from 'react'

export default function Navbar() {
  return (
    <div className='fixed z-1000 left-[20vw] w-[80vw] bg-white flex justify-between items-center p-4'>
       <div className="appname flex justify-center items-center gap-2">
       <img src="./logo.png" alt="logo" className='w-[45px] h-[45px] ' />
       <h1 className='font-bold text-2xl'>CrowdCast</h1>
       </div>

        <div className="balance">
            <p className='text-sm'>
                Wallet Balance
                <span className='ml-2 text-2xl font-bold text-primary'>50,000</span> {/*add from the api the balance*/}
            </p>
        </div>
    </div>
  )
}
