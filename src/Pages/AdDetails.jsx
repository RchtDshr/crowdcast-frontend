import React from 'react'

export default function AdDetails() {
    return (
        <div className='p-4 grid grid-cols-2 gap-2'>

            <div className="box col-span-2">Currently showing ad:
                <div className="flex justify-between items-center">
                    {/* change with actual product name from the api calling */}
                    <span className='text-2xl font-bold text-primary mt-2'>PlayStation 5</span>
                    <p className='text-sm'>
                        Credits used:
                        <span className='ml-2 text-2xl font-bold text-primary'>50,000</span> {/*add from the api the balance*/}
                    </p>
                </div>
            </div>

            <div className="box flex flex-col justify-start items-start">
                <p>Age Category/ies selected: </p>
                <div className='selected-ages text-2xl text-primary font-bold'>
                    {/* contains all the age groups selected for a particular ad */}
                    {/* map ages here */}
                    <ul>
                        <li>10-19 </li>
                        <li>20-29</li>
                    </ul>
                </div>
            </div>

            <div className="box flex flex-col justify-start items-start">
                <p>Location/Device selected: </p>
                <div className='selected-ages text-2xl text-primary font-bold'>
                    {/* contains all the age groups selected for a particular ad */}
                    {/* map locations here */}
                    <ul>
                        <li>Malls: Digital Screens </li>
                        <li>Universities and Colleges: Digital Boards</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
