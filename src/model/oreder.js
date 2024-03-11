const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jwt = require('jsonwebtoken');
const { stripLow } = require('validator');



const orderSchema = new mongoose.Schema({

  orderedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  customerName: {
    type:String,
    
    required: true,
  },
  customerID: {
    type:String,
    
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerMobileNumber: {
    type: String,
    required: true,
    
  },
  items: [{
    vehicleBrand: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    vehiclePriceRange: {
      type: Number,
      required: true,
    },
    vehicleType: {
      type: String,
    },
    vehicleColor: {
      type: String,
      
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  }],
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    required: true,
    default: 'pending',
  },
  customerAddress: {
    type: String,
    required: true,
  },
  chatBox: [{
    message: { type: String },
    //customer: { type: String },
    //owner: { type: String }
  }]
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
