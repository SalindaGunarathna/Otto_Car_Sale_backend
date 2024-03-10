

class VehicleQueryBuilder {
    constructor() {
        this.query = {};
    }

    setVehicleType(vehicleType) {
        if (vehicleType) {
            this.query.vehicleType = vehicleType;

            console.log(this.query);
            console.log("vehicle type");
        }
        return this;
    }

    setBrand(brand) {
        if (brand) {
            this.query.brand = brand;
        }
        return this;
    }

    setModel(model) {
        if (model) {
            this.query.model = model;
        }
        return this;
    }

    setStyle(style) {
        if (style) {
            this.query.style = style;
        }
        return this;
    }

    setfuelType(fuelType) {
        if (fuelType) {
            this.query.fuelType = fuelType;
        }
        return this;
    }
    setManufacturedYear(manufacturedYear){
        if(manufacturedYear){
            this.query.manufacturedYear =manufacturedYear
        }
        return this ;
    }

    build() {
        return this.query;
    }
}
module.exports = VehicleQueryBuilder;
