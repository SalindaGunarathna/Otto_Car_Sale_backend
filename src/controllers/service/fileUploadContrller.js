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
const authenticateAPI = async () => {
  try {
    // Authenticate google API
    const oauth2client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URL
    );

    // Authenticate client
    const drive = google.drive({
      version: "v3",
      auth: oauth2client,
    });

    console.log("run authonticate");

    oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });

    return drive;
  } catch (error) {
    return error;
  }
};

// upload file
const uploadImageToDrive = async (file) => {
  try {
    if (!file) {
      throw createHttpError(404, "image not found");
    }
    if (!file.mimetype.startsWith("image")) {
      throw createHttpError(400, "Only images are allowed");
    }

    // set the local file path
    let filepath = __dirname + "../../../../public/file/" + file.name;

    file.mv(filepath); // save file local location

    console.log(filepath);

    // call the authenticateAPI function for google API Authentication
    const drive = await authenticateAPI();

    console.log("run authonticate2");

    // Upload the file to Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.mimetype,
      },
      media: {
        mimeType: file.mimetype,
        body: fs.createReadStream(filepath), 
      },
    });

    //  use this file id to uniquely identify uploaded file
    const fileID = response.data.id;

    console.log(fileID);

    // get file url from drive storage
    try {
      const access = await drive.permissions.create({
        fileId: fileID,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
      var result_url = await drive.files.get({
        fileId: fileID,
        fields: "webViewLink",
      });
    } catch (error) {
      console.log(error);   
      //next(error)
    }

    // set file Url  path to store in data base
    const fileUploadPath = result_url.data.webViewLink;

    console.log(fileUploadPath);

    // delete Temporary  local file
    // fs.unlink(filepath, (err) => {
    //   if (err) {
    //     console.error("Unable to delete local image file:", err);
    //   } else {
    //     console.log("Local image file deleted successfully.");
    //   }
    // });
    console.log(fileID)

    return { fileID, fileUploadPath };  
  } catch (error) {
    console.log(error)
  }
};

// delete file
const deleteFile = async (file_Id) => {
  const drive = await authenticateAPI();
  try {
    const response = await drive.files.delete({
      fileId: file_Id,
    });

    console.log(`delete success full ${response.status}`);

    return response.status;
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  uploadImageToDrive,
  deleteFile,
};
