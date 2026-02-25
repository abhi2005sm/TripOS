import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const geocodeBase = 'https://maps.googleapis.com/maps/api/geocode/json';
const placeDetailsBase = 'https://maps.googleapis.com/maps/api/place/details/json';

export const reverseGeocode = async (lat, lng) => {
    if (!GOOGLE_MAPS_API_KEY) {
        throw new Error('Google Maps API key not configured');
    }

    const { data } = await axios.get(geocodeBase, {
        params: {
            latlng: `${lat},${lng}`,
            key: GOOGLE_MAPS_API_KEY,
        },
    });

    if (data.status !== 'OK') {
        throw new Error(data.error_message || 'Geocoding failed');
    }

    const result = data.results[0];
    return {
        address: result.formatted_address,
        placeId: result.place_id,
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
    };
};

export const getPlaceDetails = async (placeId) => {
    if (!GOOGLE_MAPS_API_KEY) {
        throw new Error('Google Maps API key not configured');
    }

    const { data } = await axios.get(placeDetailsBase, {
        params: {
            place_id: placeId,
            fields: 'name,formatted_address,geometry,place_id',
            key: GOOGLE_MAPS_API_KEY,
        },
    });

    if (data.status !== 'OK') {
        throw new Error(data.error_message || 'Place details failed');
    }

    const result = data.result;
    return {
        name: result.name,
        address: result.formatted_address,
        placeId: result.place_id,
        lat: result.geometry?.location?.lat,
        lng: result.geometry?.location?.lng,
    };
};
