import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function AdDetails() {
    const [ads, setAds] = useState(null);  // Since we are fetching a single object now, it's not an array
    const [error, setError] = useState(null);

    // Function to fetch ads
    const fetchAds = async () => {
        try {
            // Retrieve the token from localStorage or sessionStorage
            const token = localStorage.getItem('token');  // Make sure to store the token here during login

            // If no token is available, handle it accordingly
            if (!token) {
                throw new Error('No token found. Please log in.');
            }

            // Make the GET request to fetch the user's ads
            const response = await axios.get('http://localhost:5000/api/getdetails', {
                headers: {
                    Authorization: `Bearer ${token}`  // Add the JWT token in Authorization header
                }
            });

            // Set the ads from the response (which is now an object)
            setAds(response.data.ads);
        } catch (error) {
            // Handle any errors
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    // Fetch ads on component mount
    useEffect(() => {
        fetchAds();
    }, []);

    return (
        <div>
            {/* Handle loading state */}
            {!ads && !error && <p>Loading...</p>}
            
            {/* Handle errors */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Handle case where no ads are posted yet */}
            {ads && Object.keys(ads).length === 0 && <p>No ads posted yet.</p>}

            {/* Render ads details */}
            {ads && Object.keys(ads).length > 0 && (
                <div className='p-4 h-full grid grid-cols-2 gap-2'>
                    {/* Ad name and credits */}
                    <div className="box col-span-2">Currently showing ad:
                        <div className="flex justify-between items-center">
                            <span className='text-2xl font-bold text-primary mt-2'> {ads.adName} </span>
                            <p className='text-sm'>
                                Credits used:
                                <span className='ml-2 text-2xl font-bold text-primary'>{ads.creditsDeducted}</span>
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
                                        <li>{age}</li>
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
                </div>
            )}
        </div>
    );
}
