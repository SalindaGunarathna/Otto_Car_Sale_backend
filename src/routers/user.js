const express = require('express');
const router = express.Router();

const adminAuth  = require('../middleware/adminMiddleware')

const User = require('../controllers/userController');

router.post('/login',User.login);
router.post('/adminregister',User.adminRegistration);
router.post('/customerregister',User.customerRegistration);
router.post('/forgot',User.forgotPassword);
router.post('/reset/:id/:token',User.resetPassword);


module.exports = router;