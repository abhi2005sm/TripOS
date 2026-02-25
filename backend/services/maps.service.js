import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

/**
 * Get coordinates and place details from address or place name
 * @param {string} address 
 */
export const getPlaceDetails = async (address) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
                params: {
                    address: address,
                    key: GOOGLE_MAPS_API_KEY,
                },
            }
        );

        if (response.data.results.length === 0) {
            throw new Error('Location not found');
        }

        const result = response.data.results[0];
        return {
            name: result.formatted_address,
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
            placeId: result.place_id,
        };
    } catch (error) {
        console.error('Maps API Error:', error);
        throw new Error('Failed to fetch location data');
    }
};

/**
 * Reverse geocoding
 */
export const getAddressFromCoords = async (lat, lng) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
                params: {
                    latlng: `${lat},${lng}`,
                    key: GOOGLE_MAPS_API_KEY,
                },
            }
        );

        return response.data.results[0]?.formatted_address;
    } catch (error) {
        console.error('Maps API Error:', error);
        throw new Error('Failed to fetch address data');
    }
};
