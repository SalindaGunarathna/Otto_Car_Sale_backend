const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    vehicleId: { type: String, required: false, unique: false }, 
    chassisNumber: { type: String, required: false }, // Chassis number for reference
    engineNo: { type: String, required: false}, 
    vehicleState: { type: String, required: false }, // State where the vehicle is registered of not
    companyName: { type: String, required: false }, // Name of the owning company
    numberOfDoors: { type: Number, required: false }, // Number of doors on the vehicle
    color: { type: String, required: false},
    seatingCapacity: { type: Number, required: false }, // Maximum number of passengers
    condition: { type: String, required: false }, // Vehicle condition (e.g., excellent, good, fair)
    dimensions: { // Object to store length, height, and width
        length: { type: Number, required: false }, // Vehicle length in meters
        height: { type: Number, required: false }, // Vehicle height in meters
        width: { type: Number, required: false }, // Vehicle width in meters
    },
    cylinderCapacity: { type: Number, required: false }, // Engine cylinder capacity in liters
    fuelType: { type: String, required: false }, 
    manufacturedCountry: { type: String, required: false }, // Country of origin
    assembled: { type: Boolean, required: false }, // Whether the vehicle was locally assembled
    vehicleType: { type: String, required: false }, // Category of the vehicle (e.g., truck, van, car)
    brand: { type: String, required: false },
    style :{type :String },
    model:{type:String},
    manufacturedYear:{type :String},
    album:[ { 
        
        photoURL :{type: String},
        photID :{type: String}
    
    }], 
});



const Vehicle  = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;