import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Upload, X } from 'lucide-react';
import calculateAdPrice from '../utils/priceCalc';
import axios from 'axios';
import ConfirmAdModal from '../Components/ConfirmAdModal';
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
    const [adName, setAdName] = useState('');
    const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedGenders, setSelectedGenders] = useState([]);
    const [isAgeGroupOpen, setIsAgeGroupOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState(null);
    const [priceData, setPriceData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isUploading, setIsUploading] = useState(false);


    const ageGroupRef = useRef(null);
    const locationRef = useRef(null);
    const fileInputRef = useRef(null);

    const toggleAgeGroupDropdown = () => setIsAgeGroupOpen(!isAgeGroupOpen);
    const toggleLocationDropdown = () => setIsLocationOpen(!isLocationOpen);

    const handleAgeGroupChange = (e) => {
        const { value, checked } = e.target;
        const selectedGroup = ageGroups.find(group => group.value === value);

        setSelectedAgeGroups((prev) =>
            checked
                ? [...prev, { value: selectedGroup.value, label: selectedGroup.label }]
                : prev.filter((v) => v.value !== value)
        );
    };

    const handleLocationChange = (e) => {
        const { value, checked } = e.target;
        setSelectedLocations((prev) =>
            checked ? [...prev, value] : prev.filter((v) => v !== value)
        );
    };

    const handleGenderChange = (gender) => {
        setSelectedGenders((prev) =>
            prev.includes(gender)
                ? prev.filter((g) => g !== gender)
                : [...prev, gender]
        );
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            await uploadFile(selectedFile);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type.startsWith('image/') || droppedFile.type.startsWith('video/'))) {
            await uploadFile(droppedFile);
        }
    };

    const handleReupload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the file input
            fileInputRef.current.click();
        }
    };

    const handleRemoveFile = async () => {
        try {
            if (file && file.publicId) {
                await axios.post('http://localhost:5000/api/remove', { publicId: file.publicId });
            }
            setFile(null);
            setErrors((prev) => ({ ...prev, file: undefined }));
        } catch (error) {
            console.error('Error removing file:', error);
        }
    };

    const uploadFile = async (fileToUpload) => {
        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', fileToUpload);

            if (file && file.publicId) {
                // If there's an existing file, remove it first
                await axios.post('http://localhost:5000/api/remove', { publicId: file.publicId });
            }

            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setFile({
                name: fileToUpload.name,
                type: fileToUpload.type,
                publicId: response.data.publicId,
                url: response.data.url,
                resourceType: response.data.resourceType,
                duration: response.data.duration ? response.data.duration : 5
            });

            setErrors((prev) => ({ ...prev, file: undefined }));
        } catch (error) {
            console.error('Error uploading file:', error);
            setErrors((prev) => ({ ...prev, file: 'Error uploading file' }));
        } finally {
            setIsUploading(false);
        }
    };

    const validateForm = () => {
        const newErrors = [];

        if (!adName.trim()) newErrors.push("Advertisement name is required");
        if (selectedAgeGroups.length === 0) newErrors.push("Please select at least one age group");
        if (selectedGenders.length === 0) newErrors.push("Please select at least one gender");
        if (selectedLocations.length === 0) newErrors.push("Please select at least one location");
        if (!file) newErrors.push("Please upload a file");

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleCalculatePrice = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newFormData = new FormData(e.target);

        const adDetailsArray = [];
        selectedLocations.forEach((location) => {
            selectedAgeGroups.forEach((ageGroup) => {
                selectedGenders.forEach((gender) => {
                    adDetailsArray.push({
                        location: location,
                        ageGroup: ageGroup.value,
                        ageGroupName: ageGroup.label,
                        gender: gender,
                        fileUpload: file.url

                    });
                });
            });
        });
        newFormData.append('file', JSON.stringify(file));
        newFormData.append('adDetailsArray', JSON.stringify(adDetailsArray));

        setFormData(newFormData);
        newFormData.forEach((value, key) => {
            console.log(key + ': ' + value);
        });


        try {
            const price = await calculateAdPrice(newFormData);
            setPriceData(price);

            setIsModalOpen(true);
        } catch (error) {
            console.error('Error calculating price:', error);
            // Handle error (e.g., show an error message)
        }
    };

    // Retrieve the token from localStorage (or sessionStorage)
    const token = localStorage.getItem('token'); // or wherever you store your JWT

    const handleConfirmSubmit = async () => {
        try {
            const adsData = JSON.stringify(priceData);
            const adNameData = JSON.stringify(adName);

            const response = await axios.post('http://localhost:5000/api/create-ad',
                {
                    ads: adsData,
                    adName: adNameData,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );

            if (response.status === 200) {
                console.log('Ad submitted successfully:', response.data);
                setIsModalOpen(false);
                toast.success('Ad created successfully!', {
                     position: "bottom-center"
                });
            } else {
                console.error('Failed to submit ad');
                toast.error('Failed to submit ad', {
                     position: "bottom-center"
                });
            }
        } catch (error) {
            console.error('Error submitting ad:', error);
            toast.error('An error occurred while submitting the ad', {
                 position: "bottom-center"
            });
        }
    };



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ageGroupRef.current && !ageGroupRef.current.contains(event.target)) {
                setIsAgeGroupOpen(false);
            }
            if (locationRef.current && !locationRef.current.contains(event.target)) {
                setIsLocationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (

        <div className='p-4 z-0 w-[79vw]'>
            <form onSubmit={handleCalculatePrice}>

                <div className='grid grid-cols-2 gap-2'>
                    {/* ad name */}
                    <div className='box col-span-2'>
                        Advertisement name:
                        <input
                            type="text"
                            name="adName"
                            value={adName}
                            required
                            onChange={(e) => setAdName(e.target.value)}
                            className="w-full text-sm bg-white px-2 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Enter Advertisement Name..."
                        />
                    </div>

                    {/* upload ad */}
                    <div className="box">
                        Upload Advertisement:
                        <div
                            className={`w-full h-32 border-2 mt-2 border-dashed ${errors.file ? 'border-red-500' : 'border-gray-300'} rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors duration-300 flex flex-col items-center justify-center`}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={handleReupload}
                        >
                            {isUploading ? (
                                <div className="flex flex-col items-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                    <p className="text-sm text-gray-500 mt-2">Uploading...</p>
                                </div>
                            ) : (
                                <>
                                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">
                                        {file ? 'Click to reupload or drag and drop a new file' : 'Drag and drop file here or click to browse'}
                                    </p>
                                </>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                name='adFile'
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        {file && (
                            <div className="mt-2">
                                <p className="text-sm font-semibold mb-2">Selected file:</p>
                                <div className="relative">
                                    {file.type.startsWith('image/') ? (
                                        <img
                                            src={file.url}
                                            alt={file.name}
                                            className="w-full h-56 object-cover rounded-md"
                                        />
                                    ) : (
                                        <video
                                            src={file.url}
                                            className="w-full h-64 object-cover rounded-md"
                                            controls
                                        />
                                    )}
                                    <button
                                        type="button"
                                        onClick={handleRemoveFile}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-300"
                                    >
                                        <X size={16} />
                                    </button>
                                    <p className="text-xs mt-1 truncate">{file.name}</p>
                                </div>
                            </div>
                        )}
                        {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
                    </div>

                    {/* select locations */}
                    <div className="box relative" ref={locationRef}>
                        Select Location/s:
                        <button
                            type="button"
                            onClick={toggleLocationDropdown}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                        >
                            {selectedLocations.length > 0 ? selectedLocations.join(', ') : 'Select Location/s'}
                        </button>

                        {isLocationOpen && (
                            <div className="absolute mt-2 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto z-10">
                                {locations.map(location => (
                                    <label key={location.value} className="block px-4 py-2">
                                        <input
                                            type="checkbox"
                                            value={location.value}
                                            onChange={handleLocationChange}
                                            checked={selectedLocations.includes(location.value)}
                                            className="mr-2"
                                            required
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

                    {/* select age */}
                    <div className="box relative flex flex-col justify-between items-start gap-4" ref={ageGroupRef}>
                        <div className="age w-full">
                            Select Target Age Group/s:
                            <button
                                type="button"
                                onClick={toggleAgeGroupDropdown}
                                className="shadow z-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                            >
                                {selectedAgeGroups.length > 0 ? selectedAgeGroups.map(group => group.label).join(', ') : 'Select Age Group/s'}

                            </button>

                            {isAgeGroupOpen && (
                                <div className="absolute mt-2 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto z-10">
                                    {ageGroups.map(group => (
                                        <label key={group.value} className="block px-4 py-2">
                                            <input
                                                type="checkbox"
                                                value={group.value}
                                                onChange={handleAgeGroupChange}
                                                checked={selectedAgeGroups.some(selected => selected.value === group.value)}
                                                className="mr-2"
                                                required
                                            />
                                            {group.label}
                                        </label>
                                    ))}
                                </div>
                            )}
                            <ul className='grid grid-cols-3 gap-2 mt-3'>
                                {selectedAgeGroups.map((ageGroup, index) => (
                                    <li key={index} className='bg-primary flex justify-center items-center gap-2 text-md text-white py-2 px-4 rounded-[10rem] shadow-md'>
                                        {ageGroup.label} <CheckCircle />
                                    </li>
                                ))}
                            </ul>

                        </div>

                    </div>

                    <div className="gender box">
                        <div>
                            <label className="form-label day">
                                Choose Target Gender/s:
                            </label>
                            <div className="gender-selector space-x-2 ">
                                {['M', 'F'].map((gender) => (
                                    <button
                                        key={gender}
                                        type="button"
                                        className={`border-2 border-dashed ${selectedGenders.includes(gender) ? 'bg-primary border-primary text-white' : 'border-gray-300'
                                            } rounded-lg px-4 py-2 text-md text-center cursor-pointer hover:border-primary transition-colors duration-300 mt-2`}
                                        onClick={() => handleGenderChange(gender)}
                                    >
                                        {gender}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {errors.length > 0 && (
                    <div className="bg-red-100 border mt-2 border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                <button type="submit" className="submit-button btn mt-2">
                    Calculate Price and Preview
                </button>
            </form>
            {isModalOpen && (
                <ConfirmAdModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleConfirmSubmit}
                    priceData={priceData}
                />
            )}
            <ToastContainer />
        </div>
    );
}