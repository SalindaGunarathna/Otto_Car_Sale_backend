const jwt = require("jsonwebtoken")
const createHttpError = require('http-errors');
const User = require("../model/user");
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY
const SECRET_KEY_BASE64 = process.env.SECRET_KEY_NEW

const secretKey = Buffer.from(SECRET_KEY_BASE64, 'base64');

const customerAuth = async (req, res, next) => {
    try {

        const token = req.header('Authorization').replace('Bearer ', "")
        
        try
        {
            const decode = jwt.verify(token, secretKey) 
            console.log(decode)
        }
        catch(error)
        {
            console.log(error)
            throw createHttpError(401, 'Unauthorized - Invalid token');  
            
        }
        // Extract userId and role from the decoded token
        const userId = decoded.userId;
        const roles = decoded.role;

        // Check if the user has the "Admin" role
        const isCustomer = roles.some(role => role.authority === 'USER');
        if (!isCustomer) {
            throw createHttpError(403, 'Forbidden -User role required');
        }
        req.userId = userId
        req.userRole = roles
        next()    

        next()

    } catch (error) {
        next(error)

    }
}


module.exports = customerAuth
