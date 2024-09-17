import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const ageGroups = [
    { value: "3-9", label: "3-9 years old" },
    { value: "10-19", label: "10-19 years old" },
    { value: "20-29", label: "20-29 years old" },
    { value: "30-39", label: "30-39 years old" },
    { value: "40-49", label: "40-49 years old" },
    { value: "50-59", label: "50-59 years old" },
    { value: "60-70", label: "60-70 years old" }
];

const locations = [
    { value: "Railway Stations", label: "Railway Stations: Digital Screens ₹30 per second" },
    { value: "Malls", label: "Malls: Digital Screens ₹100 per second" },
    { value: "Airports", label: "Airports: Digital Kiosks ₹200 per second" },
    { value: "Public Transit", label: "Public Transit: Bus Shelters ₹20 per second" },
    { value: "Gyms and Fitness Centers", label: "Gyms and Fitness Centers: Exercise Equipment ₹30 per second" },
    { value: "Universities and Colleges", label: "Universities and Colleges: Digital Boards ₹60 per second" },
    { value: "Restaurants and Cafes", label: "Restaurants and Cafes: Window Decals ₹30 per second" },
    { value: "Healthcare Facilities", label: "Healthcare Facilities: Digital Screens ₹50 per second" },
    { value: "Events and Expos", label: "Events and Expos: Digital Displays ₹150 per second" },
    { value: "Community Centers", label: "Community Centers: Digital Displays ₹40 per second" },
    { value: "Public Libraries", label: "Public Libraries: Digital Screens ₹50 per second" }
];

export default function CreateAd() {
    const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [isAgeGroupOpen, setIsAgeGroupOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);

    const toggleAgeGroupDropdown = () => setIsAgeGroupOpen(!isAgeGroupOpen);
    const toggleLocationDropdown = () => setIsLocationOpen(!isLocationOpen);

    const handleAgeGroupChange = (e) => {
        const { value, checked } = e.target;
        setSelectedAgeGroups((prev) =>
            checked ? [...prev, value] : prev.filter((v) => v !== value)
        );
    };

    const handleLocationChange = (e) => {
        const { value, checked } = e.target;
        setSelectedLocations((prev) =>
            checked ? [...prev, value] : prev.filter((v) => v !== value)
        );
    };

    return (
        <div className='p-4'>
            <form>
                <div className=' grid grid-cols-2 gap-2'>


                    {/* ad name */}
                    <div className='box col-span-2'>
                        Ad name:
                        <input
                            type="text"
                            name="adName"
                            className="w-full text-sm bg-white px-2 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Type..."
                        />
                    </div>

                    {/* upload ad */}
                    <div className="box">
                        Upload Ad:
                        <input
                            type="file"
                            name="uploadAd"
                            className="w-full text-sm bg-white px-2 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    {/* select age */}
                    <div className="box relative z-100">
                        Select Age Group/s:
                        <button
                            type="button"
                            onClick={toggleAgeGroupDropdown}
                            className="shadow z-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                        >
                            {selectedAgeGroups.length > 0 ? selectedAgeGroups.join(', ') : 'Select Age Group/s'}
                        </button>

                        {isAgeGroupOpen && (
                            <div className="absolute z-100 mt-2 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                                {ageGroups.map(group => (
                                    <label key={group.value} className="block px-4 py-2">
                                        <input
                                            type="checkbox"
                                            value={group.value}
                                            onChange={handleAgeGroupChange}
                                            checked={selectedAgeGroups.includes(group.value)}
                                            className="mr-2 z-100"
                                        />
                                        {group.label}
                                    </label>
                                ))}
                            </div>
                        )}
                        <ul className='grid grid-cols-4 gap-2 mt-3'>
                            {selectedAgeGroups.map((ageGroup, index) => (
                                <li key={index} className='bg-primary flex justify-center items-center gap-2 text-md text-white py-2 px-4 rounded-[10rem] shadow-md'>
                                    {ageGroup} <CheckCircle />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* select locations */}
                    <div className="box relative">
                        Select Location/s:
                        <button
                            type="button"
                            onClick={toggleLocationDropdown}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                        >
                            {selectedLocations.length > 0 ? selectedLocations.join(', ') : 'Select Location/s'}
                        </button>

                        {isLocationOpen && (
                            <div className="absolute mt-2 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                                {locations.map(location => (
                                    <label key={location.value} className="block px-4 py-2">
                                        <input
                                            type="checkbox"
                                            value={location.value}
                                            onChange={handleLocationChange}
                                            checked={selectedLocations.includes(location.value)}
                                            className="mr-2"
                                        />
                                        {location.label}
                                    </label>
                                ))}
                            </div>
                        )}
                        <ul className='flex flex-col justify-start items-start gap-2 mt-3'>
                            {selectedLocations.map((location, index) => (
                                <li key={index} className='bg-primary flex justify-center items-center gap-2 text-md text-white py-2 px-4 rounded-[10rem] shadow-md'>
                                    {location} <CheckCircle />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* min balance check. the user must have the defined balance in his account */}
                    <div className="balance h-full box relative flex flex-col z-10 ">
                        Min credits required to run the ad
                        <br />
                        <div className='flex flex-col justify-between items-start h-full'>
                            <span className='text-primary relative font-bold text-3xl'>60,000</span>
                            <div className='btn relative'>
                                <Link to='/wallet'>Add Balance</Link>
                            </div>
                        </div>
                    </div>

                </div>
                <button
                    type="submit"
                    // onClick={handleSubmit}
                    className="submit-button btn mt-2"
                // disabled={isSubmitting}
                >
                    Publish Ad
                </button>
            </form>
        </div>
    );
}
