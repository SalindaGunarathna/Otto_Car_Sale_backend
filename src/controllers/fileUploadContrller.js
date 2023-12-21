
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




//Crete new Admin  Controller function
const uploadImageToDrive = async (file) => {

    const CLIENT_ID = process.env.CLIENT_ID
    const CLIENT_SECRET = process.env.CLIENT_SECRET
    const REDIRECT_URL = process.env.REDIRECT_URL
    const REFRESH_TOKEN =process.env.REFRESH_TOKEN


   
    try {
        
       
        // Authenticate google API 
        const oauth2client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URL
        )
        
        // create temper local storage file path for file 
        let filepath = __dirname + "../../../public/file/" + file.name


        console.log(filepath)
        file.mv(filepath) // save file local location

        if (!file) {
            throw createHttpError(404, "image not found");
        }
        if (!file.mimetype.startsWith('image')) {
            throw createHttpError(400, 'Only images are allowed');  
        }

        
        // Authenticate client 
        const drive = google.drive({
            version: 'v3',
            auth: oauth2client
        })

        oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN })
        // save file in drive storage
        const response = await drive.files.create({
            requestBody: {
                name: file.name,
                mimeType: file.mimetype,
            },
            media: {
                mimeType: file.mimetype,
                body: fs.createReadStream(filepath),
            }
        })
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
        // create new admin


       
        
         
        // delete tem local file image 
        fs.unlink(filepath, (err) => {
            if (err) {
                console.error("Unable to delete local image file:", err);
            } else {
                console.log("Local image file deleted successfully.");
            }
        });

        return {fileID,fileUploadPath}

        

     
    } catch (error) {
        next(error);
    }
};


module.exports = uploadImageToDrive;