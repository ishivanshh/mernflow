const rideModel = require("../models/ride.models.js");
const mapService = require("./maps.service.js");
const crypto = require('crypto');


async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

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

    console.log(distanceTime);

     const fare = {
    auto: Math.round(
        baseFare.auto +
        (distanceTime.distanceInKm * perKmRate.auto)
    ),

    car: Math.round(
        baseFare.car +
        (distanceTime.distanceInKm * perKmRate.car)
    ),

    motorcycle: Math.round(
        baseFare.moto +
        (distanceTime.distanceInKm * perKmRate.moto)
    )
};

    return fare;


}
module.exports.getFare = getFare;


function getOtp(num){
    function generateOtp(num){
        const otp = crypto.randomInt(Math.pow(10, num-1),Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({

    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);



    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(4),
        fare: fare[ vehicleType ]
    })

    return ride;
}

module.exports.confirmRide = async({ rideId, captain }) => {
    if(!rideId){
        throw new Error('ride id is required');
    }
    if(!captain){
        throw new Error('captain is required');
    }

    const ride = await rideModel.findOneAndUpdate({
        _id : rideId
    }, {
        status : 'accepted',
        captain : captain._id
    }, {
        new : true
    }).select('+otp').populate('user').populate('captain');

    if(!ride){
        throw new Error('Ride not found');
    }

    return ride;
}


module.exports.startRide = async ({ rideId , otp , captain}) => {
    if(!rideId || !otp){
        throw new Error ('ride id and otp are required!')
    }
    if(!captain){
        throw new Error ('captain is required!')
    }

    const ride = await rideModel.findOne({
        _id : rideId
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('ride not found')
    }
    if(ride.status !== 'accepted'){
        throw new Error('ride not accepted')
    }
    if(ride.otp !== otp){
        throw new Error('invalid otp')
    }
    const startedRide = await rideModel.findOneAndUpdate({
        _id : rideId
    }, {
        status : 'ongoing'
    }, {
        new : true
    }).populate('user').populate('captain').select('+otp');

    return startedRide;
}


module.exports.endRide = async ({ rideId , captain}) => {
     if(!rideId){
        throw new Error ('ride id and otp are required!')
    }

     const ride = await rideModel.findOne({
        _id : rideId,
        captain : captain._id
    }).populate('user').populate('captain').select('+otp');

     if(!ride){
        throw new Error('ride not found')
    }
    if(ride.status !== 'ongoing'){
        throw new Error('ride not ongoing')
    }

    await rideModel.findByIdAndUpdate({
        _id : rideId
    },
    {
        status : 'completed'
    })
    return ride;
}