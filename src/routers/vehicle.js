const express = require('express');
const router = express.Router();


const Vehicle =  require('../controllers/vehicleController');


router.post("/addVehicle", Vehicle.addvehicle);

router.delete("/deleteVehi/:vehicleID",Vehicle.deleteVehicle)

module.exports = router;