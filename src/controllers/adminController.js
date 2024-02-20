const createHttpError = require("http-errors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
require("dotenv").config();
const Admin = require("../model/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

const { google } = require("googleapis");
const { version } = require("os");

const {
  uploadImageToDrive,
  deleteFile,
} = require("./service/fileUploadContrller");


const emailSend = require("./service/sendEmail");

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    if (!email || !password) {
      throw createHttpError(400, "missing email or password");
    }
    try {
      var admin = await Admin.findByCredentials(
        req.body.email,
        req.body.password
      );
    } catch (error) {
      throw createHttpError(400, "Admin not found ");
    }

    const token = await admin.generateAuthToken();
    res.send({ admin, token });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const email = req.body.email;
  if (!email) {
    throw createHttpError(400, "missing email address");
  }


  try {
    const admin = await Admin.findOne({ email: email }); 
    var userId = admin._id;
    var username = admin.firstName
    ;
    if (!admin) {
      throw createHttpError(400, "missing admin ");
    }

    const token = await admin.generateAuthToken();
    const subject = "Octo Care sale System Reset password"
    const text = ` 
    Deare ${username}
    you can reset your Octo care sale user account  password 
    Please click on the below link to reset your password
    http://localhost:3000/ResetPassword/${userId}/${token}
    
    do not shear this link 
    
    thak you 
    Octo care sale `


     emailSend(email,subject,text); 


    res.send({ token, userId });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const newPassword = req.body.password;

  const verify = jwt.verify(token, "mysecret");

  if (verify) {
    hasspasword = await bcrypt.hash(newPassword, 12);

    const user = await Admin.findByIdAndUpdate(
      { _id: id },
      { password: hasspasword }
    );

    console.log(user);
    res.send("success");
  }
};

//Crete new Admin  Controller function
exports.create = async (req, res, next) => {
  const { firstName, email, password,lastName } = req.body;
  try {
    if (!firstName || !email || !password) {
      throw createHttpError(400, "please provide all required information");
    }
    const { profile } = req.files;

    const { fileID, fileUploadPath } = await uploadImageToDrive(profile);

    console.log(fileUploadPath);
    // set profile Url  path to store in data base
    // create new admin
    const admin = new Admin({
      firstName,
      email,
      password,
      lastName,
      profile: fileUploadPath,
      profileID: fileID,
    });

    const result = await admin.save();
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};
