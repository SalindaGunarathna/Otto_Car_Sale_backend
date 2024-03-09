const jwt = require("jsonwebtoken")
const createHttpError = require('http-errors');
const Admin = require("../model/admin");
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY

const adminAuth = async (req, res, next) => {
    try {

        const token = req.header('Authorization').replace('Bearer ', "")
        const decode = jwt.verify(token, SECRET_KEY)

        const admin = await Admin.findOne(
            {
                _id: decode._id,
                "tokens.token": token,
            }
        )

        if (!admin) {
            throw createHttpError("this admin  not existing")
        }
        req.token = token
        req.admin = admin

        

        next()

    } catch (error) {
        next(error)

    }
}


module.exports = adminAuth
