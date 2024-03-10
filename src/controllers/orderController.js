const createHttpError = require("http-errors");
const Order = require("../model/oreder");
const { validateOrderData, validateEditedData } = require("../controllers/service/validateOrderData"); //orderValidate = require("../controllers/service/validateOrderData");
require("dotenv").config();
//const EmailMessage = require("../model/emailMessage");
const emailSend = require("./service/sendEmail");
const EmailMessage = require('./service/massageGenarator');




const adminAuth = require('../middleware/adminMiddleware')

exports.createOrder = async (req, res, next) => {

    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const VehicleID = req.body.VehicleID;
    const vehicleName = req.body.vehicleName;
    const vehiclePrice = req.body.vehiclePrice;
    const quantity = req.body.quantity;
    const customerAddress = req.body.customerAddress;
    const billingAddress = req.body.billingAddress;

    var items = [];



    try {


        const isvalidate = validateOrderData(req);


        if (isvalidate) {


            items.push({
                vehicleID: VehicleID,
                vehicleName: vehicleName,
                quantity: quantity
            })

            // herre calculate Totale Charge of order
            const totalPrice = quantity * vehiclePrice;






            const order = await new Order({
                customerName,
                customerEmail,
                quantity,
                customerAddress,
                billingAddress,
                totalPrice,
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


            res.send(result);





        };

    } catch (error) {
        throw createHttpError(400, error);
    }
};


exports.editOrder = async (req, res, next) => {

    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const VehicleID = req.body.VehicleID;
    const vehicleName = req.body.vehicleName;
    const vehiclePrice = req.body.vehiclePrice;
    const quantity = req.body.quantity;
    const customerAddress = req.body.customerAddress;
    const billingAddress = req.body.billingAddress;
    const orderID = req.body.orderID;
    const totalPrice = req.body.totalPrice;
    const massage = req.body.chatBox;
    const newStatus = req.body.status;
    const id = req.body.id



    try {
        validateEditedData(req);
        if (isvalidate) {


            const order = await Order.findById(id);


         

                // adminAuth(req, res, next);
                // if (adminAuth) {
                //     // update status
                //     if (newStatus != order.status) {
                //     var status = newStatus;

                //     }
                //     // update massage
                //     chatBox.push({
                //         massage: massage
                //     })



                // }
            


            // update vehicle data 
            const updateOrde = await Order.findByIdAndUpdate(id, { 
                customerName,
                customerEmail,
                quantity,
                customerAddress,
                billingAddress,
                totalPrice,
                status,
                chatBox,
                vehicleName
            });

            if (updateOrde.status != newStatus) {

                const subject = "Octo care sale order update"
                
                const emailMessage = new EmailMessage(result);

                // send email to customer
                const CustomerEmailBody = emailMessage.CustomerEmail();
                await emailSend(customerEmail, subject, CustomerEmailBody);

            }  

        }


    } catch (error) {

        next();

    }

}

