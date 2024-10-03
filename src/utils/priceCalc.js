// Constants for pricing (same as before)
const BASE_IMAGE_PRICE = 200; //image stays on screen for 5 seconds
const VIDEO_PRICE_PER_SECOND = 40;
const MIN_VIDEO_DURATION = 5;
let adTypePrice=0;

const locationPrices = {
    "Railway Stations": 50,
    "Malls": 100,
    "Airports": 150,
    "Public Transit": 40,
    "Gyms and Fitness Centers": 40,
    "Universities and Colleges": 50,
    "Restaurants and Cafes": 40,
    "Healthcare Facilities": 40,
    "Events and Expos": 150,
    "Community Centers": 30,
    "Public Libraries": 30
};

const ageGroupMultipliers = {
    "1": 1.0, "2": 1.5, "3": 1.6, "4": 1.3, "5": 1.4, "6": 1.1, "7": 1.0
};




async function calculateAdPrice(formData) {
    // Extract and parse data from FormData
    const priceDataArray = JSON.parse(formData.get('adDetailsArray') || '[]');
    const fileData = JSON.parse(formData.get('file') || '{}');
    const { duration ,type} = fileData;


    // Calculate the prices for each combination in the priceDataArray
    const priceData = [];
    for (const { location, ageGroup, gender, ageGroupName, fileUpload } of priceDataArray) {
        // Calculate base price from selected location
        const locationBasePrice = locationPrices[location] || 0;

        // Calculate age group multiplier
        const ageMultiplier = ageGroupMultipliers[ageGroup] || 1;

        // Calculate price based on ad type (image or video
        let maxDuration = duration;


        if (type.startsWith('image')) {
            adTypePrice += BASE_IMAGE_PRICE;
        } else if (type.startsWith('video')) {
            try {
            } catch (error) {
                console.error("Error getting video duration:", error);
                // Use a default duration if there's an error
                maxDuration = Math.max(maxDuration, MIN_VIDEO_DURATION);
            }
        }

        // Apply video pricing if applicable
        if (maxDuration > 0) {
            adTypePrice += maxDuration * VIDEO_PRICE_PER_SECOND;
        }

        adTypePrice = Math.round(adTypePrice * 100) / 100;

        // Calculate final price
        const finalPrice = Math.ceil((locationBasePrice + adTypePrice) * ageMultiplier);

        priceData.push({
            location,
            ageGroup,
            ageGroupName,
            gender,
            fileUpload:fileUpload,
            price: finalPrice,
        });
    }

    return priceData;
}

// Export the function to be used in other files
export default calculateAdPrice;