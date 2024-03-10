const mongoose = require('mongoose');

class EmailMessage {


  

    constructor(order) {
        var order;

        this.order = order;
        console.log(this.order)

    }

    CustomerEmail() {
        return `


        Dear ${this.order.customerName},
        
        Thank you for your order! We're excited to let you know that your order has been successfully placed.

       your order now status is: ${this.order.status}
        
        Order Details:
        - Order Number: ${this.order._id}

        - Items:
       
        - Vehicle model: ${this.order.items[0].vehicleModel}
        - Vehicle brand: ${this.order.items[0].vehicleBrand}
        - Vehicle type: ${this.order.items[0].vehicleType}
        - Vehicle color: ${this.order.items[0].vehicleColor}
        - Vehicle price: ${this.order.items[0].vehiclePriceRange}
        - Quantity: ${this.order.items[0].quantity}

        - Customer name: ${this.order.customerName}
        - Customer Email: ${this.order.customerEmail}
        - Customer Mobile Number: ${this.order.customerMobileNumber}
        - Delivery Address: ${this.order.customerAddress}
        
        We will process your order as soon as possible. 
        
        If you have any questions or need further assistance, feel free to contact us .
        
        Thank you for choosing us!
        
        Best Regards,
        Octo Care sale
        `;
    }


    OwnerEmail() {

        return `


        Dear sir,
        
        You have received a new vehicle order!

        order now status is: ${this.order.status}
        
        Order Details:
        - Order Number: ${this.order._id}

        - Items:
    
        - Vehicle model: ${this.order.items[0].vehicleModel}
        - Vehicle brand: ${this.order.items[0].vehicleBrand}
        - Vehicle type: ${this.order.items[0].vehicleType}
        - Vehicle color: ${this.order.items[0].vehicleColor}
        - Vehicle price: ${this.order.items[0].vehiclePriceRange}

        - Customer name: ${this.order.customerName}
        - Customer Email: ${this.order.customerEmail}
        - Customer Mobile Number: ${this.order.customerMobileNumber}
        - Delivery Address: ${this.order.customerAddress}


        
        
        Please review the order details and proceed with processing it.

       If you have any questions or need further information,
       please do not hesitate to contact the customer at ${this.order.customerEmail}.

       click the link below to view the order details:
       {{url}}

       Thank you for your attention.
        
        Thank you for choosing us!
        
        Best Regards,
        Octo Care sale
        `;

    }
}



module.exports = EmailMessage;