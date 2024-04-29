const createHttpError = require("http-errors");

const mongoose = require("mongoose");
require("dotenv").config();
const Admin = require("../../model/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

const { google } = require("googleapis");
const { version } = require("os");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// Authenticate API

// upload file
const uploadImageToDrive = async (file) => {

  console.log("step 1");
  try {
    if (!file) {
      throw createHttpError(404, "image not found");
    }
    if (!file.mimetype.startsWith("image")) {
      throw createHttpError(400, "Only images are allowed");
    }

    console.log("step 2");

    // set the local file path
    let filepath = __dirname + "../../../../public/file/" + file.name;

    file.mv(filepath); // save file local location

    console.log(filepath);
   

    return { filepath };  
  } catch (error) {
    console.log(error)
  }
};

// delete file
const deleteFile = async (filepath) => {
 // const drive = await authenticateAPI();


 fs.unlink(filepath, (err) => {
  if (err) {
    console.error("Unable to delete local image file:", err);
  } else {
    console.log("Local image file deleted successfully.");
  }
});


  // try {
  //   const response = await drive.files.delete({
  //     fileId: file_Id,
  //   });

  //   console.log(`delete success full ${response.status}`);

  //   return response.status;
  // } catch (error) {
  //   res.send(error);
  // }
};

module.exports = {
  uploadImageToDrive,
  deleteFile,
};
