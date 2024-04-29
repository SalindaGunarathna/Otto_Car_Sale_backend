const mongoose = require('mongoose');
const Vehicle = require('../vehicle');

require('dotenv').config();

describe('Vehicle Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should save a new vehicle', async () => {
    const vehicleData = {
      vehicleId: '123456',
      vehiclePrice: '50000',
      chassisNumber: '12345ABC',
      engineNo: 'ABC123',
      vehicleState: 'Active',
      companyName: 'Example Company',
      numberOfDoors: 4,
      color: 'Red',
      seatingCapacity: 5,
      condition: 'Good',
      dimensions: {
        length: 4,
        height: 2,
        width: 2,
      },
      cylinderCapacity: 2000,
      fuelType: 'Petrol',
      manufacturedCountry: 'Country',
      assembled: true,
      vehicleType: 'car',
      brand: 'Toyota',
      style: 'Sedan',
      model: 'Corolla',
      manufacturedYear: 2022,
      album: [{ photoURL: 'example.com/photo1' }],
    };

    const savedVehicle = await Vehicle.create(vehicleData);

    expect(savedVehicle.vehicleId).toBe(vehicleData.vehicleId);
    expect(savedVehicle.vehiclePrice).toBe(vehicleData.vehiclePrice);
    expect(savedVehicle.chassisNumber).toBe(vehicleData.chassisNumber);
    
  });

 

  
});
