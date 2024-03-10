
const createHttpError = require("http-errors");


var ObjectId = require('mongoose').Types.ObjectId;

const validateOrderData = (req) => {

    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const VehicleID = req.body.VehicleID;
    const vehicleName = req.body.vehicleName;
    const vehiclePrice = req.body.vehiclePrice;
    const quantity = req.body.quantity;
    const customerAddress = req.body.customerAddress;
    const billingAddress = req.body.billingAddress;

    if (!customerName || !quantity || !customerAddress || !billingAddress ||
        !vehiclePrice || !vehicleName || !customerEmail || !VehicleID) {
        throw createHttpError(400, "missing data");
    } else {
        return true
    }

}



const validateEditedData = (req) => {
    const id = req.body.Id;
    const totalPrice = req.body.totalPrice;
   

    // validate basic details
    validateOrderData(req);

    isObjectIdValid = id => ObjectId.isValid(id) ? String(new ObjectId(id) === id) ? true : false : false;

    if (!isObjectIdValid(id) || !(0<totalPrice)) {
        throw createHttpError(400, "missing data");
    } else {
        return true
    }
    
}

module.exports = { validateOrderData, validateEditedData }; //exporting validateOrderData;