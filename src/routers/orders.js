const express = require('express');
const router = express.Router();

const adminAuth  = require('../middleware/adminMiddleware')
const customerAuth  = require('../middleware/customerMiddleware')
const Order = require('../controllers/orderController');




 router.post('/createOrder',Order.createOrder);
 router.put('/editOrder/:id',Order.editOrder);

 router.get('/retrieveAllOrders',Order.retrieveAll);
router.get("/retrievCustomerOrders/:id",customerAuth,Order.retrievCustomerOrders)



 router.get('/retrieveOneOrder/:id',Order.retrieveOneOrder);
 router.delete('/deleteOrder/:id',Order.deleteOrder);


 module.exports = router