const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')

require('dotenv').config(); 

const SECRET_KEY = process.env.SECRET_KEY


function validatePassword(value) {
   
 
  return  validator.isStrongPassword(value, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1, 
    minNumbers: 0,
    minSymbols: 1,
    returnScore: false 
  });
}

const passwordValidator = {
  validator: validatePassword,
  message: 'Password must be at least 8 characters with at least one uppercase and lowercase letter, and one special character (@#$%&).'
};

 

const CustomerShema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength:60


  },
  lastName: {
    type: String,
    required: false,
    maxlength:60

  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: false,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      massage: "please enter your email address"
    }


  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: [passwordValidator]
  },
  profile: { type: String },
  orders :[{ type: String}],

  profileID: { type: String },

  tokens: [{
    token: String
  }] 
});


CustomerShema.pre("save", async function (next) {
  const customer = this;
  if (customer.isModified("password")) {
    customer.password = await bcrypt.hash(customer.password, 12)
  }
  if (!customer.tokens || !Array.isArray(customer.tokens)) {
    customer.tokens = [];
  } 
  next();
})

CustomerShema.statics.findByCredentials = async (email, password) => {
  const customer = await Customer.findOne({ email });

  console.log(customer)
  console.log(password)
  console.log(customer.password)   

  if (!customer) {
    throw new Error('Unable to login. User not found.');
  }

  const isMatch = await bcrypt.compare(password, customer.password)

  console.log(isMatch)

  if (!isMatch) {
    throw new Error('Unable to login. Incorrect password.');
  }

  return customer;
};

CustomerShema.methods.generateAuthToken = async function () {
  const customer = this;
  const token =  jwt.sign({_id : customer._id.toString()},SECRET_KEY)
   customer.tokens = customer.tokens.concat({token})
   await customer.save()

   console.log("customer.tokens")

   return  token;   

}



const Customer = mongoose.model('Customers', CustomerShema);
module.exports = Customer;
