const createHttpError = require("http-errors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const Vehicle = require("../model/vehicle");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../model/admin");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;



const VehicleQueryBuilder = require("../service/vehicleQueryBullder")

const validateVehicleData = require("../validaters/validateVehicleData");


const {
  createImageAlbum,
} = require("../service/imageAlbumController"); 

// add new vehicle
exports.addvehicle = async (req, res, next) => {
  const {
    vehicleId,
    chassisNumber,
    engineNo,
    vehicleState,
    companyName,
    numberOfDoors,
    color,
    seatingCapacity,
    condition,
    length,
    height,
    width,
    vehiclePrice,
    fuelType,
    manufacturedCountry,
    assembled,
    vehicleType,
    brand,
    style,
    model,
    manufacturedYear,
    images
  } = req.body;

  try {

    var validate = await validateVehicleData(req.body);

    if (images && images.length > 0) {

      var album = await createImageAlbum(images);
      validate.album = album
    } else {
      validate.album = null
    }

    const vehicle = new Vehicle({
      vehicleId,
      chassisNumber,
      engineNo,
      vehicleState,
      companyName,
      numberOfDoors,
      color,
      seatingCapacity,
      condition,
      vehiclePrice,
      fuelType,
      manufacturedCountry,
      assembled,
      vehicleType,
      brand,
      style,
      model,
      manufacturedYear,
      dimensions: {
        length,
        height,
        width,
      },
      album,
    });

    const result = await vehicle.save();

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

//remove vehicle
exports.deleteVehicle = async (req, res, next) => {
  const id = req.params.id;
  try {
    const vehicle = await Vehicle.findOneAndDelete({ _id: id });

    if (!vehicle) {
      throw createHttpError(404, "vehicle not found ");
    } else {
      res.status(200).send(`Vehicle with ID ${vehicle.vehicleId} deleted successfully`);
    }
  } catch (error) {
    next(error);
  }
};


// update vehicle
exports.updateVehicle = async (req, res, next) => {

  const id = req.params.id;
  const {
    vehicleId,
    chassisNumber,
    engineNo,
    vehicleState,
    companyName,
    numberOfDoors,
    color,
    seatingCapacity,
    condition,
    length,
    height,
    width,
    engineDisplacement,
    fuelType,
    manufacturedCountry,
    assembled,
    vehicleType,
    brand,
    images
  } = req.body;


  try {
    const oldVehicle = await Vehicle.findOne({ _id: id });

    if (!oldVehicle) {
      throw createHttpError(404, "vehicle not Found ");
    } else {

      var album = [];

      if (images && images.length > 0) {

        album = await createImageAlbum(images);

      } else {
        album = null
      }

      oldVehicle.vehicleId = vehicleId;
      oldVehicle.chassisNumber = chassisNumber;
      oldVehicle.engineNo = engineNo;
      oldVehicle.vehicleState = vehicleState;
      oldVehicle.companyName = companyName;
      oldVehicle.numberOfDoors = numberOfDoors;
      oldVehicle.color = color;
      oldVehicle.seatingCapacity = seatingCapacity;
      oldVehicle.condition = condition;
      oldVehicle.length = length;
      oldVehicle.height = height;
      oldVehicle.width = width;
      oldVehicle.engineDisplacement = engineDisplacement;
      oldVehicle.fuelType = fuelType;
      oldVehicle.manufacturedCountry = manufacturedCountry;
      oldVehicle.assembled = assembled;
      oldVehicle.vehicleType = vehicleType;
      oldVehicle.brand = brand;
      oldVehicle.dimensions = {
        length,
        height,
        width,
      };
      oldVehicle.album = album;

      const result = await oldVehicle.save();
      res.send({ result, album });
    }
  } catch (error) {
    next(error);
  }
};

// Suggest vehicle
exports.smilerTypeVehicle = async (req, res, next) => {
  const fuelType = req.body.fuelType;
  const vehicleType = req.body.vehicleType;
  const seatingCapacity = req.body.seatingCapacity;

  try {
    const similarTypeVehicles = await Vehicle.find({
      seatingCapacity: seatingCapacity,
      vehicleType: vehicleType,
      fuelType: fuelType,
    });

    res.send(similarTypeVehicles);
  } catch (error) {
    next(error);
  }
};

// retrieve one Vehicle by searching

exports.findOneVehicle = async (req, res, next) => {
  const id = req.params.id;

  try {
    const selectedVehicle = await Vehicle.find({ _id: id });

    res.send(selectedVehicle);
  } catch (error) {
    next(error);
  }
};

// retrieve vehicles by filtering by serching
exports.retrieveVehicle = async (req, res, next) => {

  const { vehicleType, brand, model, style, fuelType, manufacturedYear } =
    req.body;

  // const token = req.params.token;
  console.log(req.body);

  try {
    const vehicleQueryBuilder = new VehicleQueryBuilder()
      .setVehicleType(vehicleType)
      .setBrand(brand)
      .setModel(model)
      .setStyle(style)
      .setfuelType(fuelType)
      .setManufacturedYear(manufacturedYear);

    const query = vehicleQueryBuilder.build();

    const attributeList =
      "vehicleId   vehicleState companyName numberOfDoors color seatingCapacity condition dimensions  fuelType manufacturedCountry assembled vehicleType  brand  style model manufacturedYear dimensions album";

    try {
      var verifyAdmin = jwt.verify(token, SECRET_KEY);

      var vehicles = await Vehicle.find(query);
    } catch {

      console.log(query);
      var vehicles = await Vehicle.find(query, attributeList);
    }

    res.send(vehicles);
  } catch (error) {
    next(error);
  }
};

exports.retrieveAllVehicle = async (req, res, next) => {
  const token = req.params.token;

  const attributeList =
    "vehicleId   vehicleState companyName numberOfDoors color seatingCapacity condition dimensions  fuelType manufacturedCountry assembled vehicleType  brand  style model manufacturedYear dimensions album";

  try {
    try {
      var verifyAdmin = jwt.verify(token, SECRET_KEY);

      var vehicles = await Vehicle.find({});
    } catch {


      var vehicles = await Vehicle.find({}, attributeList);
    }
    const separatedVehicles = {
      car: [],
      bike: [],
      van: [],
      truck: [],
      cab: [],
    };

    vehicles.forEach((vehicle) => {
      switch (vehicle.vehicleType) {
        case "Car":
          separatedVehicles.car.push(vehicle);
          break;
        case "Bike":
          separatedVehicles.bike.push(vehicle);
          break;
        case "Van":
          separatedVehicles.van.push(vehicle);
          break;
        case "Truck":
          separatedVehicles.truck.push(vehicle);
          break;
        case "Cab":
          separatedVehicles.cab.push(vehicle);
          break;
        default:
          break;
      }
    });

    res.send(separatedVehicles);
  } catch (error) {
    next(error);
  }
};


