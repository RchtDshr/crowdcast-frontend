import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdTriggerTable from '../Components/AdTriggerTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ageGroups = [
    { value: "1", label: "3-9 years old" },
    { value: "2", label: "10-19 years old" },
    { value: "3", label: "20-29 years old" },
    { value: "4", label: "30-39 years old" },
    { value: "5", label: "40-49 years old" },
    { value: "6", label: "50-59 years old" },
    { value: "7", label: "60-70 years old" }
];

export default function AdDetails() {
    const [ads, setAds] = useState(null);
    const [TimelineEntries, setTimelineEntries] = useState([]);
    const [error, setError] = useState(null);

    const getAgeRange = (value) => {
        const group = ageGroups.find(group => group.value === value);
        return group ? group.label : 'Unknown';
    };

    const fetchAds = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please log in.');
            }
            const response = await axios.get('http://localhost:5000/api/getdetails', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAds(response.data.ads);
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    const fetchTimeline = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please log in.');
            }
            const response = await axios.get('http://localhost:5000/user/getUserTimeline', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTimelineEntries(response.data.data);
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('signInSuccess') === 'true') {
            setTimeout(() => {
                toast.success('Sign In Successful!', {
                    position: 'bottom-center',
                });
            }, 500);
            localStorage.removeItem('signInSuccess');
        }
        fetchAds();
        fetchTimeline();
    }, []);

    // Calculate total deducted credits
    const totalDeductedCredits = TimelineEntries.reduce(
        (total, entry) => total + (entry.deductedAmount || 0), 0
    );

    return (
        <div>
            <ToastContainer />
            {!ads && !error && <p>Loading...</p>}
            {error && <p className='text-red-600 p-4'>{error}</p>}
            {ads && Object.keys(ads).length === 0 && <p>No ads posted yet.</p>}

            {ads && Object.keys(ads).length > 0 && (
                <div className='h-full grid grid-cols-2 gap-2'>
                    <div className="box col-span-2">
                        Currently showing ad:
                        <div className="flex justify-between items-center">
                            <span className='text-2xl font-bold text-primary mt-2'>
                                {ads.adName ? ads.adName : "No ad made"}
                            </span>
                            <p className='text-sm'>
                                Credits used:
                                <span className='ml-2 text-2xl font-bold text-primary'>
                                    {totalDeductedCredits}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Age Groups */}
                    <div className="box flex flex-col justify-start items-start">
                        <p>Age Category/ies selected: </p>
                        <div className='selected-ages text-2xl text-primary font-bold'>
                            {ads.ageGroups && ads.ageGroups.length > 0 ? (
                                ads.ageGroups.map((age, index) => (
                                    <ul key={index}>
                                        <li>{getAgeRange(age)}</li>
                                    </ul>
                                ))
                            ) : (
                                <p>No age groups selected</p>
                            )}
                        </div>
                    </div>

                    {/* Locations */}
                    <div className="box flex flex-col justify-start items-start">
                        <p>Location/Device selected: </p>
                        <div className='selected-ages text-2xl text-primary font-bold'>
                            {ads.locations && ads.locations.length > 0 ? (
                                ads.locations.map((location, index) => (
                                    <ul key={index}>
                                        <li>{location}</li>
                                    </ul>
                                ))
                            ) : (
                                <p>No locations selected</p>
                            )}
                        </div>
                    </div>

                    {/* Genders */}
                    <div className="box flex flex-col justify-start items-start">
                        <p>Gender/s selected: </p>
                        <div className='selected-genders text-2xl text-primary font-bold'>
                            {ads.genders && ads.genders.length > 0 ? (
                                ads.genders.map((gender, index) => (
                                    <ul key={index}>
                                        <li>{gender === 'M' ? 'Male' : 'Female'}</li>
                                    </ul>
                                ))
                            ) : (
                                <p>No genders selected</p>
                            )}
                        </div>
                    </div>

                    <div className='box col-span-2'>
                        <AdTriggerTable TimelineEntries={TimelineEntries} />
                    </div>
                </div>
            )}
        </div>
    );
}
