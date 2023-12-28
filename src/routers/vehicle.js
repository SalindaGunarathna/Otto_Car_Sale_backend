const express = require('express');
const router = express.Router();
const adminAuth  = require('../middleware/adminMiddleware')

const Vehicle =  require('../controllers/vehicleController');


router.post("/addVehicle", Vehicle.addvehicle);

router.delete("/deleteVehi/:vehicleID",adminAuth,Vehicle.deleteVehicle)

router.get("/retrieveVehicles",Vehicle.retrieveVehicle)

router.get("/similarVehicles",Vehicle.smilerTypeVehicle)

router.get("/findOneVehicle/:vehicleID",Vehicle.findOneVehicle)


module.exports = router;