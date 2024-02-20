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
  customerEmail: {
    type: String,
    required: true,
  },
  items: [{
    vehicleID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vehicle',
      required: true,
    },
    vehicleName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  }],
  totalPrice: {
    type: Number,
    required: true,
  },
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
  billingAddress: {
    type: String,
    required: true,
  },
  chatBox: [{
    customer: { type: String },
    owner: { type: String }
  }]
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
