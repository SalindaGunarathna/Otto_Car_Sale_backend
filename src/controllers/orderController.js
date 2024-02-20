const createHttpError = require("http-errors");
const Order = require("../model/oreder");
const orderValidate = require("../controllers/service/validateOrderData");
require("dotenv").config();
const EmailMessage = require("../model/emailMessage");
const emailSend = require("./service/sendEmail");

exports.createOrder = async (req, res, next) => {

    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const VehicleID = req.body.VehicleID;
    const vehicleName = req.body.vehicleName;
    const quantity = req.body.quantity;
    const customerAddress = req.body.customerAddress;
    const billingAddress = req.body.billingAddress;



    try {
        const isvalidate = orderValidate.validateOrderData(req);


        if (isvalidate) {


            items.push({
                vehicleID: VehicleID,
                vehicleName: vehicleName,
                quantity: quantity
            })

            // herre should calculate price of order


            const order = await new Order({
                customerName,
                customerEmail,
                quantity,
                customerAddress,
                billingAddress,
                items            
            })

            var result = order.save();

            const subject = "Octo care sale new order"
            const EMAIL = process.env.PERSIONAL_EMAIL;

            const emailMessage = new EmailMessage(result);

            

            // send email to owner
            const OwnerEmailBody = emailMessage.OwnerEmail();
            await emailSend(EMAIL, subject, OwnerEmailBody);


            // send email to customer
            const CustomerEmailBody = emailMessage.CustomerEmail();
            await emailSend(customerEmail, subject, CustomerEmailBody);





        };

    } catch (error) {
        throw createHttpError(400, error);
    }
};

