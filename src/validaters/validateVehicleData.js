
const createHttpError = require('http-errors');
var express = require('express');


const   validateVehicleData = (body) => {
    const {
      vehicleId,
      vehiclePrice,
      engineNo,
      vehicleState,
      companyName,
      numberOfDoors,
      color,
      seatingCapacity,
      condition,
      fuelType,
      manufacturedCountry,
      vehicleType,
      brand,
      style,
      model,
    } = body;
  
    if (
      !vehicleId // ||
      // !engineNo ||
      // !vehicleState ||
      // !companyName ||
      // !numberOfDoors ||
      // !color ||
      // !seatingCapacity ||
      // !condition ||
      // !fuelType ||
      // !manufacturedCountry ||
      // !vehicleType ||
      // !brand ||
      // !style ||
      // !model ||
      // !vehiclePrice
      
    ) {
      throw createHttpError(400, "please provide all required information");
    }


    return true;
  
    
  }


  module.exports = validateVehicleData;