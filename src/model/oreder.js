const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jwt  = require('jsonwebtoken')



const orderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
    unique: true,
  },
  orderedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    required: true,
  },
  items: [{
    Vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vehicle',
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
  note :{
    type: String,
    required: false,
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports =Order;
