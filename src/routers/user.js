const express = require('express');
const router = express.Router();

const User = require('../controllers/userController');

router.post('/login',User.login);
router.post('/',User.create);
router.post('/forgot',User.forgotPassword);
router.post('/reset/:id/:token',User.resetPassword);


module.exports = router;