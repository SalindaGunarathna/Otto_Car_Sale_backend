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
    maxlength: 100,
    required: true,
  },
  customerID: {
    type:String,
    maxlength: 100,
    required: true,
  },
  customerEmail: {
    type: String,
    maxlength: 100,
    required: true,
  },
  customerMobileNumber: {
    type: String,
    maxlength: 100,
    required: true,
    
  },
  items: [{
    vehicleBrand: {
      type: String,
      maxlength: 100,
      required: true,
    },
    vehicleModel: {
      type: String,
      maxlength: 100,
      required: true,
    },
    vehiclePriceRange: {
      type: Number,
      maxlength: 100,
      required: true,
    },
    vehicleType: {
      type: String,
    },
    vehicleColor: {
      type: String,
      maxlength: 100,
      
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,maxlength: 15,
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
    maxlength: 100,
  },
  chatBox: [{
    message: { type: String },
    //customer: { type: String },
    //owner: { type: String }
  }]
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
