const createHttpError = require('http-errors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const Vehicle = require('../model/vehicle');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const {uploadImageToDrive,deleteFile} = require("./fileUploadContrller")



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
        engineDisplacement,
        fuelType,
        manufacturedCountry,
        assembled,
        vehicleType,
        brand,
        

    } = req.body;

    const album = [];

    try {

        if (!vehicleId || !engineNo) {
            
            throw createHttpError(400, "please provide all required information")
        }
        const { image } = req.files
        const { fileID, fileUploadPath } = await uploadImageToDrive(image);

        console.log(fileID)

        album.push({
            photoURL: fileUploadPath,
            photID: fileID
        })

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
            engineDisplacement,
            fuelType,
            manufacturedCountry,
            assembled,
            vehicleType,
            brand,
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

       const file_id =  vehicle.album[0].photID

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
            const { fileID, fileUploadPath } = await uploadImageToDrive(image);

            album.push({
                photoURL: fileUploadPath,
                photID: fileID
            })

            const file_id  = oldVehicle.album[0].fileID

            const deleteStatus = await deleteFile(file_id)

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
            // Add new photos to the album array
            oldVehicle.album = album;
            const result = await oldVehicle.save();



            res.send({result,deleteStatus})

        }




    } catch (error) {
        next(error);
    }
};
