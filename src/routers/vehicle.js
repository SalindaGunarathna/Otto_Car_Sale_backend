const express = require('express');
const router = express.Router();


const Vehicle =  require('../controllers/vehicleController');


router.post("/addVehicle", Vehicle.addvehicle);

module.exports = router;