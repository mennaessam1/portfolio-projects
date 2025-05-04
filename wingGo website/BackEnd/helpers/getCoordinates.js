const axios = require('axios');

const getCoordinates = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    try {
        const response = await axios.get(url);
        if (response.data.length === 0) {
            throw new Error('No coordinates found for the given address');
        }
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
    } catch (error) {
        throw new Error('Unable to fetch coordinates from Nominatim');
    }
};

module.exports = getCoordinates;