const express = require('express');
const router = express.Router();

const adminAuth  = require('../middleware/adminMiddleware')
const customerAuth  = require('../middleware/customerMiddleware')


const User = require('../controllers/userController');

router.post('/login',User.login);
router.post('/adminregister',User.adminRegistration);
router.post('/customerregister',User.customerRegistration);
router.post('/forgot',User.forgotPassword);
router.post('/reset/:id/:token',User.resetPassword);
router.post("/adminlogout",adminAuth,User.logout);
router.post("/customerlogout",customerAuth,User.logout);
router.post("/updateuseraccountadmin",adminAuth,User.updateUserAccount);
router.post("/updateuseraccountcustomer",customerAuth,User.updateUserAccount);
router.get("/adminprofile",adminAuth,User.userProfile);
router.get("/customerprofile",customerAuth,User.userProfile);




module.exports = router;