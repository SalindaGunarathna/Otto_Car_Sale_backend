const express = require('express');
const router = express.Router();


const Order = require('../controllers/orderController');




 router.post('/createOrder',Order.createOrder);
 router.post('/editOrder/:id',Order.editOrder);

 router.get('/retrieveAllOrders',Order.retrieveAll);
router.get("/retrievCustomerOrders/:id",Order.retrievCustomerOrders)



// router.get('/retrieveOneOrder/:orderID',Order.retrieveOneOrder);
// router.delete('/deleteOrder/:orderID',Order.deleteOrder);


 module.exports = router