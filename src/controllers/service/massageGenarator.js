

class EmailMessage {

    constructor(order) {

        this.order = order;

    }

    CustomerEmail() {
        return `


        Dear ${oreder.customerName},
        
        Thank you for your order! We're excited to let you know that your order has been successfully placed.

        check the update status of your order
        
        Order Details:
        - Order Number: ${this.order._id}
        - Items: ${this.order.items[0].vehicleName}
        - Quantity: ${this.order.items[0].quantity}
        - Total Amount: ${this.order.totalPrice}
        - Delivery Address: ${this.order.customerAddress}
        - Billing Address: ${this.order.billingAddress}
        - Order Date: ${this.order.orderedDate}
        - Status: ${this.order.status}
        
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
        
        You have received a new order!
        
        Order Details:
        - Order Number: ${this.order._id}
        - Items: ${this.order.items[0].vehicleName}
        - Quantity: ${this.order.items[0].quantity}
        - Total Amount: ${this.order.totalPrice}
        - Delivery Address: ${this.order.customerAddress}
        - Billing Address: ${this.order.billingAddress}
        
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