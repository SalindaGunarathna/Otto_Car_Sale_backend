const express = require('express');
const router = express.Router();
const adminAuth  = require('../middleware/adminMiddleware')

const Vehicle =  require('../controllers/vehicleController');


router.post("/addVehicle", Vehicle.addvehicle);

router.delete("/deleteVehi/:vehicleID",Vehicle.deleteVehicle)

router.post("/retrieveVehicles/:token",Vehicle.retrieveVehicle) //retrieve vehicles by filtering to customer by serching

router.post("/similarVehicles",Vehicle.smilerTypeVehicle)

router.get("/findOneVehicle/:vehicleID",Vehicle.findOneVehicle)

router.get("/retrieveAllVehicles",Vehicle.retrieveAllVehicle)

router.post("/editVehicle/",Vehicle.updateVehicle)

router.post("/uploadImage/:vehicleID",Vehicle.uploadImage)  


module.exports = router;  