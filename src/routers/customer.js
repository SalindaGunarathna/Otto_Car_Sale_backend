const express = require('express');
const router = express.Router();

const Customer = require('../controllers/customerController');

router.post('/login',Customer.login);
router.post('/',Customer.create);
router.post('/forgot',Customer.forgotPassword);
router.post('/reset/:id/:token',Customer.resetPassword);


module.exports = router;