const express = require('express');
const router = express.Router();

const adminAuth  = require('../middleware/adminMiddleware')
const Order = require('../controllers/orderController');




 router.post('/createOrder',Order.createOrder);
 router.post('/editOrder/:id',Order.editOrder);

 router.get('/retrieveAllOrders',Order.retrieveAll);
router.get("/retrievCustomerOrders/:id",adminAuth,Order.retrievCustomerOrders)



// router.get('/retrieveOneOrder/:orderID',Order.retrieveOneOrder);
// router.delete('/deleteOrder/:orderID',Order.deleteOrder);


 module.exports = router