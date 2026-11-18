let axios;
try {
  axios = require('axios');
} catch (err) {
  // Graceful fallback to native fetch if axios is not yet installed
  axios = {
    get: async (url, config) => {
      const res = await fetch(url, config);
      const data = await res.json();
      return { data, status: res.status };
    },
    post: async (url, body, config) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(config?.headers || {}) },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      return { data, status: res.status };
    }
  };
}

const captainModel = require('../model/captain.model');

// Helper to get the Ola Maps API key
const getApiKey = () => {
  return process.env.OLA_MAPS_API_KEY || process.env.OLA_MAP_API_KEY || process.env.OLA_API_KEY;
};

// 1. Get Latitude & Longitude Coordinates for a given Address
module.exports.getAddressCoordinate = async (address) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('OLA_MAPS_API_KEY is not set in .env');
  }

  const url = `https://api.olamaps.io/places/v1/geocode?address=${encodeURIComponent(address)}&api_key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (
      response.data &&
      (response.data.status === 'ok' || response.data.status === 'SUCCESS' || response.data.geocodingResults?.length)
    ) {
      const location = response.data.geocodingResults[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
        lat: location.lat,
        long: location.lng
      };
    } else {
      throw new Error('Unable to fetch coordinates for the given address');
    }
  } catch (error) {
    console.error('Error fetching coordinates from Ola Maps:', error.message);
    throw error;
  }
};

// 2. Get Distance & Duration between Origin and Destination
module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error('Origin and destination are required');
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('OLA_MAPS_API_KEY is not set in .env');
  }

  try {
    // Resolve origin coordinates if passed as string address
    let originCoords = origin;
    if (typeof origin === 'string') {
      originCoords = await module.exports.getAddressCoordinate(origin);
    }

    // Resolve destination coordinates if passed as string address
    let destCoords = destination;
    if (typeof destination === 'string') {
      destCoords = await module.exports.getAddressCoordinate(destination);
    }

    const originLat = originCoords.ltd || originCoords.lat;
    const originLng = originCoords.lng || originCoords.long;
    const destLat = destCoords.ltd || destCoords.lat;
    const destLng = destCoords.lng || destCoords.long;

    const url = `https://api.olamaps.io/routing/v1/directions?origin=${originLat},${originLng}&destination=${destLat},${destLng}&api_key=${apiKey}`;

    const response = await axios.get(url);

    if (
      response.data &&
      (response.data.status === 'SUCCESS' || response.data.status === 'ok' || response.data.routes?.length)
    ) {
      const leg = response.data.routes[0].legs[0];
      const distanceMeters = typeof leg.distance === 'object' ? leg.distance.value : leg.distance;
      const durationSeconds = typeof leg.duration === 'object' ? leg.duration.value : leg.duration;

      return {
        distance: {
          text: `${(distanceMeters / 1000).toFixed(1)} km`,
          value: distanceMeters
        },
        duration: {
          text: `${Math.ceil(durationSeconds / 60)} mins`,
          value: durationSeconds
        }
      };
    } else {
      throw new Error('No route found between origin and destination');
    }
  } catch (error) {
    console.error('Error fetching distance and time from Ola Maps:', error.message);
    throw error;
  }
};

// 3. Autocomplete Place Suggestions
module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error('Query input is required');
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('OLA_MAPS_API_KEY is not set in .env');
  }

  const url = `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(input)}&api_key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data && (response.data.status === 'ok' || response.data.status === 'SUCCESS' || response.data.predictions)) {
      return response.data.predictions || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching autocomplete suggestions from Ola Maps:', error.message);
    throw error;
  }
};

// 4. Find available Captains in Radius (in KM)
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius = 5) => {
  // Earth radius in kilometers
  const earthRadius = 6371;

  // Retrieve captains with location coordinates
  const captains = await captainModel.find({
    'location.lat': { $exists: true },
    'location.long': { $exists: true }
  });

  // Filter captains using the Haversine formula
  const nearbyCaptains = captains.filter((captain) => {
    const cLat = captain.location.lat;
    const cLng = captain.location.long;

    const dLat = ((cLat - ltd) * Math.PI) / 180;
    const dLng = ((cLng - lng) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((ltd * Math.PI) / 180) *
        Math.cos((cLat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance <= radius;
  });

  return nearbyCaptains;
};
