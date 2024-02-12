const createHttpError = require('http-errors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const Vehicle = require('../model/vehicle');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Admin = require('../model/admin')
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY

const { uploadImageToDrive, deleteFile } = require("./fileUploadContrller")

const VehicleQueryBuilder = require('./vehicleQueryBullder');


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

        fuelType,
        manufacturedCountry,
        assembled,
        vehicleType,
        brand,
        style,
        model,
        manufacturedYear



    } = req.body;

    const album = [];

    try {

        if (!vehicleId || !engineNo) {

            throw createHttpError(400, "please provide all required information")
        }

        console.log(req.files)

        const images = req.files.image

        console.log(`images:${images} `)

        if (images && images.length > 0) {
            for (const image of images) {
                const { fileID, fileUploadPath } = await uploadImageToDrive(image);
                album.push({
                    photoURL: fileUploadPath,
                    photID: fileID
                });
            }
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
            length,
            height,
            width,

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
            album


        });


        const result = await vehicle.save()

        res.status(201).send(result)

    } catch (error) {
        next(error);
    }
};

//remove vehicle 
exports.deleteVehicle = async (req, res, next) => {

    const vehicleID = req.params.vehicleID
    try {
        const vehicle = await Vehicle.findOneAndDelete({ vehicleId: vehicleID })

        const file_id = vehicle.album[0].photID

        const deleteStatus = await deleteFile(file_id)
        if (!vehicle) {
            throw createHttpError(404, "vehicle not found ")

        }
        else {

            res.status(200).send(vehicle)
        }
    } catch (error) {
        next(error);
    }
}

// update vehicle 

exports.updateVehicle = async (req, res, next) => {

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

    } = req.body;

    const album = [];

    try {

        const oldVehicle = await Vehicle.findOne({ vehicleId: vehicleId })

        if (!oldVehicle) {
            throw createHttpError(404, "vehicle not Found ")
        }
        else {

            if (!vehicleId || !engineNo) {
                throw createHttpError(400, "please provide all required information")
            }
            const { image } = req.files

            if (image) {
                var { fileID, fileUploadPath } = await uploadImageToDrive(image);
            }

            if (fileID) {

                album.push({
                    photoURL: fileUploadPath,
                    photID: fileID
                })
                const file_id = oldVehicle.album[0].fileID

                var deleteStatus = await deleteFile(file_id)
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
            res.send({ result, deleteStatus })

        }
    } catch (error) {
        next(error);
    }
};

// Suggest vehicle

exports.smilerTypeVehicle = async (req, res, next) => {
    const fuelType = req.body.fuelType
    const vehicleType = req.body.vehicleType
    const seatingCapacity = req.body.seatingCapacity

    try {

        const similarTypeVehicles = await Vehicle.find({ seatingCapacity: seatingCapacity, vehicleType: vehicleType, fuelType: fuelType })

        res.send(similarTypeVehicles)

    } catch (error) {
        next(error)

    }

}

// retrieve one Vehicle by searching

exports.findOneVehicle = async (req, res, next) => {
    const vehicle_ID = req.params.vehicleID

    try {
        const selectedVehicle = await Vehicle.find({ vehicleId: vehicle_ID });


        res.send(selectedVehicle)
    } catch (error) {
        next(error)

    }
}

// retrieve vehicles by filtering 
exports.retrieveVehicle = async (req, res, next) => {
    const {
        vehicleType,
        brand,
        model,
        style,
        condition,
        manufacturedYear
    } = req.body;

    const token = req.params.token

    try {
        const vehicleQueryBuilder = new VehicleQueryBuilder()
            .setVehicleType(vehicleType)
            .setBrand(brand)
            .setModel(model)
            .setStyle(style)
            .setCondition(condition)
            .setManufacturedYear(manufacturedYear);

        const query = vehicleQueryBuilder.build();

        const attributeList = 'vehicleId   vehicleState companyName numberOfDoors color seatingCapacity condition dimensions  fuelType manufacturedCountry assembled vehicleType  brand  style model manufacturedYear dimensions album'

        try {
            var verifyAdmin = jwt.verify(token, SECRET_KEY)

            var vehicles = await Vehicle.find(query);

        } catch {
            var vehicles = await Vehicle.find(query, attributeList);
        }

        res.send(vehicles);
    } catch (error) {
        next(error);
    }
};


exports.retrieveAllVehicle = async (req, res, next) => {

    const token = req.params.token

    const attributeList = 'vehicleId   vehicleState companyName numberOfDoors color seatingCapacity condition dimensions  fuelType manufacturedCountry assembled vehicleType  brand  style model manufacturedYear dimensions album'

    try {

        try {
            var verifyAdmin = jwt.verify(token, SECRET_KEY)

            var vehicles = await Vehicle.find({});

        } catch {
            var vehicles = await Vehicle.find({}, attributeList);
        }
        const separatedVehicles = {
            car: [],
            bike: [],
            van: [],
            truck: [],
            cab: []
        };

        vehicles.forEach(vehicle => {
            switch (vehicle.vehicleType) {
                case 'car':
                    separatedVehicles.car.push(vehicle);
                    break;
                case 'bike':
                    separatedVehicles.bike.push(vehicle);
                    break;
                case 'van':
                    separatedVehicles.van.push(vehicle);
                    break;
                case 'truck':
                    separatedVehicles.truck.push(vehicle);
                    break;
                case 'cab':
                    separatedVehicles.cab.push(vehicle);
                    break;
                default:
                    break;
            }
        });

        res.send(separatedVehicles)


    } catch (error) {
        next(error)

    }
}

// upload new image 
exports.uploadImage = async (req, res, next) => {

    const vehicleId = req.params.vehicleID

    const images = req.files.image
    if (images) {
        try {
            const vehicle = await Vehicle.findOne({ vehicleId: vehicleId })
            if (vehicle) {

                for (const image of images) {
                    const { fileID, fileUploadPath } = await uploadImageToDrive(image);
                    vehicle.album.push({
                        photoURL: fileUploadPath,
                        photID: fileID
                    });
                }

                const updateVehicle = await vehicle.save()

                res.status(200), send({
                    updateVehicle,
                    message: "Image uploaded successfully"
                })



            }


        } catch (error) {
            next(error)

        }

    } else {
        throw createHttpError(404, "req,files are empty")
    }


}
// retrieve vehicles from customer 