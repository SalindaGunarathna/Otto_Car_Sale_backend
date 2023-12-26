
const createHttpError = require('http-errors');

const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('../model/admin');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const path = require('path');
const fs = require('fs');

const { google } = require('googleapis');
const { version } = require('os');

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URL = process.env.REDIRECT_URL
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

// Authenticate API 
const authenticateAPI = async () => {

    try {
        // Authenticate google API 
        const oauth2client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URL
        )

        // Authenticate client 
        const drive = google.drive({
            version: 'v3',
            auth: oauth2client
        })

        oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN })

        return drive;

    } catch (error) {
        return error;
    }

}


// upload file 
const uploadImageToDrive = async (file) => {
    try {

        if (!file) {
            throw createHttpError(404, "image not found");
        }
        if (!file.mimetype.startsWith('image')) {
            throw createHttpError(400, 'Only images are allowed');
        }


        // set the local file path
        let filepath = __dirname + "../../../public/file/" + file.name

        file.mv(filepath) // save file local location

        // call the authenticateAPI function for google API Authentication 
        const drive = await authenticateAPI();

        // Upload the file to Google Drive
        const response = await drive.files.create({
            requestBody: {
                name: file.name,
                mimeType: file.mimetype,
            },
            media: {
                mimeType: file.mimetype,
                body: fs.createReadStream(filepath)
            }
        })

        //  use this file id to uniquely identify uploaded file 
        const fileID = response.data.id


        // get file url from drive storage
        try {
            const access = await drive.permissions.create({
                fileId: fileID,
                requestBody: {
                    role: 'reader',
                    type: 'anyone',
                }
            })
            var result_url = await drive.files.get({
                fileId: fileID,
                fields: 'webViewLink'
            })

        } catch (error) {
            next(error)
        }

        // set file Url  path to store in data base 
        const fileUploadPath = result_url.data.webViewLink


        // delete Temporary  local file 
        fs.unlink(filepath, (err) => {
            if (err) {
                console.error("Unable to delete local image file:", err);
            } else {
                console.log("Local image file deleted successfully.");
            }
        });

        return { fileID, fileUploadPath }

    } catch (error) {
        next(error);
    }
};

// delete file 
const deleteFile = async (file_Id) => {

    const drive = await authenticateAPI();
    try {
        const response = await drive.files.delete({
            fileId: file_Id
        })


        console.log(`delete success full ${response.status}`)

        return response.status;
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    uploadImageToDrive, deleteFile
};