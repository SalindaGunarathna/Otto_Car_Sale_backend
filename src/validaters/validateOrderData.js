
const createHttpError = require("http-errors");


var ObjectId = require('mongoose').Types.ObjectId;

const validateOrderData = (req) => {

    const {
        customerName,
        vehicleBrand,
        vehicleModel,
        vehiclePriceRange,
        vehicleType,
        vehicleColor,
        quantity,
        customerEmail,
        customerAddress,
        customerMobileNumber
    } = req.body;

    if (
        !customerName ||
        !vehicleBrand ||
        !vehicleModel ||
        !vehiclePriceRange ||
        !vehicleType ||
        !vehicleColor ||
        !quantity ||
        !customerEmail ||
        !customerAddress||
        !customerMobileNumber

    ) {
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