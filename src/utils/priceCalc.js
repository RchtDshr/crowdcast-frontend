// Constants for pricing (same as before)
const BASE_IMAGE_PRICE = 180; //image stays on screen for 5 seconds
const VIDEO_PRICE_PER_SECOND = 30;
const MIN_VIDEO_DURATION = 5;
let adTypePrice=0;

const locationPrices = {
    "Railway Stations": 30,
    "Malls": 50,
    "Airports": 80,
    "Public Transit": 30,
    "Gyms and Fitness Centers": 40,
    "Universities and Colleges": 40,
    "Restaurants and Cafes": 30,
    "Healthcare Facilities": 20,
    "Events and Expos": 60,
    "Community Centers": 20,
    "Public Libraries": 20
};

const ageGroupMultipliers = {
    "1": 1.0, "2": 1.4, "3": 1.5, "4": 1.3, "5": 1.3, "6": 1.1, "7": 1.0
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
            adTypePrice=0;
            adTypePrice += BASE_IMAGE_PRICE;
        } else if (type.startsWith('video')) {
            try {adTypePrice=0;
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