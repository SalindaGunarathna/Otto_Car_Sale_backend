const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    vehicleId: { type: String, required:false, unique:false, maxlenght: 50 },
    vehiclePrice: { type: String, required:false, unique:false, maxlenght: 50 },

    chassisNumber: { type: String, required:false, maxlength: 50 }, 
    // Chassis number for reference
    engineNo: { type: String, required:false, maxlength: 50 },

    vehicleState: { type: String, required:false, maxlength: 50 },
     // State where the vehicle is registered of not
    companyName: { type: String, required:false, maxlength: 50 },
     // Name of the owning company
    numberOfDoors: { type: Number, required:false,min:1,max:10 },
     // Number of doors on the vehicle
    color: { type: String, required:false, maxlength: 50 },

    seatingCapacity: { type: Number, required:false,min:1,max:80 },
     // Maximum number of passengers
    condition: { type: String, required:false },
     // Vehicle condition (e.g., excellent, good, fair)
    dimensions: { // Object to store length, height, and width
        length: { type: Number, required:false,min:1,max:20 }, // Vehicle length in meters
        height: { type: Number, required:false,min:1,max:20 }, // Vehicle height in meters
        width: { type: Number, required:false,min:1,max:20 }, // Vehicle width in meters
    },
    cylinderCapacity: { type: Number, required:false,min:0,max:10000 },
     // Engine cylinder capacity 
    fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'],
        maxlenght: 20
    },
    manufacturedCountry: { type: String, required:false, maxlenght: 50 },
     // Country of origin
    assembled: { type: Boolean, required:false, maxlenght: 50 },
     // Whether the vehicle was locally assembled
    vehicleType: {
        type: String,
        enum:['car', 'bike', 'van', 'truck', 'cab'],
        maxlenght:20,
        required:false
    }, // Category of the vehicle (e.g., truck, van, car)
    brand: { type: String, required:false,maxlenght:50 },
    style: { type: String,maxlenght:50 },
    model: { type: String ,maxlenght:50},
    manufacturedYear: { type: Number,min: 1900, max: new Date().getFullYear() },
    album: [{

        photoURL: { type: String },
        photID: { type: String }

    }],
});



const Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;