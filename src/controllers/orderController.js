const createHttpError = require("http-errors");
const Order = require("../model/oreder");
const { validateOrderData, validateEditedData } = require("../controllers/service/validateOrderData"); //orderValidate = require("../controllers/service/validateOrderData");
require("dotenv").config();
//const EmailMessage = require("../model/emailMessage");
const emailSend = require("./service/sendEmail");
const EmailMessage = require('./service/massageGenarator');




const adminAuth = require('../middleware/adminMiddleware')

exports.createOrder = async (req, res, next) => {

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



    var items = [];



    try {


        const isvalidate = validateOrderData(req);


        if (isvalidate) {


            items.push({
                vehicleBrand: vehicleBrand,
                vehicleModel: vehicleModel,
                vehiclePriceRange: vehiclePriceRange,
                vehicleType: vehicleType,
                vehicleColor: vehicleColor,
                quantity: quantity
            });

            // herre calculate Totale Charge of order

            const order = await new Order({
                customerName,
                customerEmail,
                customerMobileNumber,
                quantity,
                customerAddress,
                items
            })

            var result = await order.save();

            const subject = "Octo care sale new vehicle request"
            const ownerEMAIL = "salinda.eng@gmail.com";

            const emailMessage = new EmailMessage(result);



            // send email to owner
            const OwnerEmailBody = emailMessage.OwnerEmail();
            await emailSend(ownerEMAIL, subject, OwnerEmailBody);


            // send email to customer
            const CustomerEmailBody = emailMessage.CustomerEmail();
            await emailSend(customerEmail, subject, CustomerEmailBody);


            res.send(result);





        };

    } catch (error) {
        throw createHttpError(400, error);
    }
};


exports.editOrder = async (req, res, next) => {

    const id = req.params.id;
    const {
        newStatus,
        massage
    } = req.body;


    try {
        const order = await Order.findById(id);
        const customerEmail = order.customerEmail

        if (!order) {
            throw createHttpError(404, "order not found");
        } else {
            if (order.status !== newStatus) {
                order.status = newStatus

            }
            if (massage) {

                console.log(massage)

                order.chatBox.push({
                    message: massage
                });
            }


            const updateorder = await order.save();

            const subject = "Octo care sale ordder status updated"

            const emailMessage = new EmailMessage(updateorder);
            // send email to customer
            const CustomerEmailBody = emailMessage.CustomerEmail();
            await emailSend(customerEmail, subject, CustomerEmailBody);

            res.send(updateorder);
        }

    } catch (error) {
        throw createHttpError(400, error);
    }


}

