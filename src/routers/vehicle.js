const express = require('express');
const router = express.Router();
const adminAuth  = require('../middleware/adminMiddleware')

const Vehicle =  require('../controllers/vehicleController');


router.post("/addVehicle",adminAuth, Vehicle.addvehicle);

router.delete("/deleteVehi/:vehicleID",adminAuth,Vehicle.deleteVehicle)

router.post("/retrieveVehicles/:token",Vehicle.retrieveVehicle) //retrieve vehicles by filtering to customer by serching

router.post("/similarVehicles",Vehicle.smilerTypeVehicle)

router.get("/findOneVehicle/:vehicleID",Vehicle.findOneVehicle)

router.get("/retrieveAllVehicles",Vehicle.retrieveAllVehicle)

router.put("/editVehicle/",adminAuth,Vehicle.updateVehicle)

router.post("/uploadImage/:vehicleID",adminAuth,Vehicle.uploadImage)  


module.exports = router;  