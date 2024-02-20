
const createHttpError = require("http-errors");

const validateOrderData = (req)=>{
    const customerName = req.body.customerName;
    const items = req.body.VehicleID;
    const quantity =req.body.quantity;
    const customerAddress = req.body.customerAddress;
    const billingAddress = req.body.billingAddress;

    if(!customerName || !items || !quantity || !customerAddress || !billingAddress ){
        throw createHttpError(400, "missing data");
    }else{
        return true
    }

}

module.exports = validateOrderData;