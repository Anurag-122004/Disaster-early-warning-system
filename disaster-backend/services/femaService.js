const axios = require('axios');

let cachedData = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // Cache duration in milliseconds (e.g., 5 minutes)

const fetchDisasterData = async () => {
    const currentTime = new Date().getTime();

    // Check if cached data is available and still valid
    if (cachedData && (currentTime - lastFetchTime < CACHE_DURATION)) {
        console.log('Returning cached data');
        return cachedData;
    }

    try {
        const response = await axios.get('https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries');
        console.log('Fetched data from FEMA API');
        cachedData = response.data; // Cache the data
        lastFetchTime = currentTime; // Update the last fetch time
        return cachedData; // Returns JSON data
    } catch (error) {
        console.error('Error fetching data from FEMA API:', error.message);
        throw error;
    }
};

module.exports = { fetchDisasterData };