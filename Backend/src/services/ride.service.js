const rideModel = require('../model/ride.model');
const mapsService = require('./maps.service');
const crypto = require('crypto');

// 1. Calculate fare for auto, car, and moto based on distance and duration
async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error('Pickup and destination are required');
  }

  const distanceTime = await mapsService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5
  };

  const distanceKm = distanceTime.distance.value / 1000;
  const durationMin = distanceTime.duration.value / 60;

  const fare = {
    auto: Math.round(baseFare.auto + distanceKm * perKmRate.auto + durationMin * perMinuteRate.auto),
    car: Math.round(baseFare.car + distanceKm * perKmRate.car + durationMin * perMinuteRate.car),
    moto: Math.round(baseFare.moto + distanceKm * perKmRate.moto + durationMin * perMinuteRate.moto)
  };

  return fare;
}

module.exports.getFare = getFare;

// 2. Generate a secure numeric OTP
function getOtp(num = 4) {
  const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
  return otp;
}

module.exports.getOtp = getOtp;

// 3. Create a new Ride
module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('All fields are required');
  }

  const fare = await getFare(pickup, destination);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(4),
    fare: fare[vehicleType],
    status: 'pending'
  });

  return ride;
};
