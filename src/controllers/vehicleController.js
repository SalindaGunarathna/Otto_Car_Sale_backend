const createHttpError = require('http-errors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const Vehicle = require('../model/vehicle');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const uploadImageToDrive = require("./fileUploadContrller")

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

        if (!vehicleId || !engineNo ) {
            throw createHttpError(400, "please provide all required information")
        }
        const {image} = req.files
        const { fileID, fileUploadPath } = await uploadImageToDrive(image);

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


        const result  = await vehicle.save()

        res.status(201).send(result)

    } catch (error) {
        next(error);
    }
};