const createHttpError = require('http-errors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('../model/admin');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const path = require('path');
const fs = require('fs');

const { google } = require('googleapis');
const { version } = require('os');

const { uploadImageToDrive, deleteFile } = require("./fileUploadContrller")




exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        if (!email || !password) {
            throw createHttpError(400, "missing email or password")
        }
        try {
            var admin = await Admin.findByCredentials(req.body.email, req.body.password)
        } catch (error) {
            throw createHttpError(400, "Admin not found ")
        }

        const token = await admin.generateAuthToken()
        res.send({ admin, token })

    } catch (error) {
        next(error)
    }
};


exports.forgotPassword = async (req, res, next) => {


    const email = req.body.email
    if (!email) {
        throw createHttpError(400, "missing email address")
    }

    const password = process.env.PASSWORD
    const Sendmail = process.env.EMAIL
    try {
        const admin = await Admin.findOne({ email: email })
        var userId = admin._id;
        if (!admin) {
            throw createHttpError(400, "missing admin ")
        }

        const token = await admin.generateAuthToken()

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: Sendmail,
                pass: password
            }
        });

        var mailOptions = {
            from: Sendmail,
            to: 'salindalakshan99@gmail.com',
            subject: 'Sending Email using Node.js',
            text: `http://localhost:3000/ResetPassword/${userId}/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


        res.send({ token, userId })


    } catch (error) {
        next(error)
    }
};

exports.resetPassword = async (req, res, next) => {
    const { id, token } = req.params
    const newPassword = req.body.password


    const verify = jwt.verify(token, "mysecret")

    if (verify) {

        hasspasword = await bcrypt.hash(newPassword, 12)

        const user = await Admin.findByIdAndUpdate({ _id: id }, { password: hasspasword })

        console.log(user)
        res.send("success")


    }

};


//Crete new Admin  Controller function
exports.create = async (req, res, next) => {

    const { firstName, email, password } = req.body;  
    try {
        if (!firstName || !email || !password) {
            throw createHttpError(400, "please provide all required information");
        }
        const { profile } = req.files; 

         const {fileID,fileUploadPath} =await uploadImageToDrive(profile); 

         console.log(fileUploadPath)
        // set profile Url  path to store in data base      
        // create new admin
        const admin = new Admin({
            firstName,
            email,
            password,
            profile: fileUploadPath,
            profileID: fileID
        });

        const result = await admin.save();
        res.status(201).send(result);
         
       
        

     
    } catch (error) {
        next(error);
    }
};


