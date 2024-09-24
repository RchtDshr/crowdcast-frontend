// priceCalc.js

// Constants for pricing (same as before)
const BASE_IMAGE_PRICE = 1000;
const VIDEO_PRICE_PER_SECOND = 50;
const MIN_VIDEO_DURATION = 50;

const locationPrices = {
    "Railway Stations": 60,
    "Malls": 100,
    "Airports": 200,
    "Public Transit": 60,
    "Gyms and Fitness Centers": 40,
    "Universities and Colleges": 60,
    "Restaurants and Cafes": 50,
    "Healthcare Facilities": 50,
    "Events and Expos": 150,
    "Community Centers": 50,
    "Public Libraries": 40
};

const ageGroupMultipliers = {
    "1": 0.8, "2": 0.9, "3": 1.2, "4": 1.3, "5": 1.1, "6": 1.0, "7": 0.9
};

const genderMultipliers = {
    "M": 1.3,
    "F": 1.4
};

// Function to get video duration
function getVideoDuration(file) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = function () {
            window.URL.revokeObjectURL(video.src);
            resolve(video.duration);
        }

        video.onerror = function () {
            reject("Error loading video file");
        }

        video.src = URL.createObjectURL(file);
    });
}

async function calculateAdPrice(formData) {
    // Extract and parse data from FormData
    const selectedAgeGroups = JSON.parse(formData.get('ageGroups') || '[]');
    const selectedLocations = JSON.parse(formData.get('locations') || '[]');
    const selectedGenders = JSON.parse(formData.get('genders') || '[]');

    // Handle files
    const files = [];
    for (let [key, value] of formData.entries()) {
        if (key.startsWith('file')) {
            files.push(value);
        }
    }

    // Calculate base price from selected locations
    const locationBasePrice = selectedLocations.reduce((total, location) => {
        return total + (locationPrices[location] || 0);
    }, 0);

    // Calculate age group multiplier
    const ageMultiplier = selectedAgeGroups.length > 0
        ? selectedAgeGroups.reduce((total, ageGroup) => {
            return total + (ageGroupMultipliers[ageGroup] || 1);
        }, 0)
        : 1;

    // Calculate gender multiplier
    const genderMultiplier = selectedGenders.length > 0
        ? selectedGenders.reduce((total, gender) => {
            return total + (genderMultipliers[gender] || 1);
        }, 0) / (selectedGenders.length == 2 ? 1.8 : selectedGenders.length)
        : 1;

    // Calculate price based on ad type (image or video)
    let adTypePrice = 0;
    let maxDuration = 0;

    for (const file of files) {
        if (file.type.startsWith('image')) {
            adTypePrice += BASE_IMAGE_PRICE;
        } else if (file.type.startsWith('video')) {
            try {
                const duration = await getVideoDuration(file);
                maxDuration = Math.max(maxDuration, duration);
            } catch (error) {
                console.error("Error getting video duration:", error);
                // Use a default duration if there's an error
                maxDuration = Math.max(maxDuration, MIN_VIDEO_DURATION);
            }
        }
    }

    // Apply video pricing if applicable
    if (maxDuration > 0) {
        adTypePrice += Math.max(maxDuration, MIN_VIDEO_DURATION) * VIDEO_PRICE_PER_SECOND;
    }

    // Calculate final price
    const finalPrice = Math.ceil((locationBasePrice + adTypePrice) * ageMultiplier * genderMultiplier);

    return {
        basePrice: locationBasePrice + adTypePrice,
        locationBasePrice,
        finalPrice: finalPrice,
        ageMultiplier,
        genderMultiplier,
        maxDuration,
        adType: files.length > 0 ? (files[0].type.startsWith('image') ? 'image' : 'video') : 'unknown'
    };
}

// Export the function to be used in other files
export default calculateAdPrice;