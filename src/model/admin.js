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

 

const AdminSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength:60


  },
  lastName: {
    type: String,
    required: true,
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
  profileID: { type: String },
  tokens: [{
    token: String
  }] 
});


AdminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 12)
  }
  if (!admin.tokens || !Array.isArray(admin.tokens)) {
    admin.tokens = [];
  } 
  next();
})

AdminSchema.statics.findByCredentials = async (email, password) => {
  const admin = await Admin.findOne({ email });

  console.log(admin)
  console.log(password)
  console.log(admin.password)   

  if (!admin) {
    throw new Error('Unable to login. User not found.');
  }

  const isMatch = await bcrypt.compare(password, admin.password)

  console.log(isMatch)

  if (!isMatch) {
    throw new Error('Unable to login. Incorrect password.');
  }

  return admin;
};

AdminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token =  jwt.sign({_id : admin._id.toString()},SECRET_KEY)
   admin.tokens = admin.tokens.concat({token})
   await admin.save()

   console.log("admin.tokens")

   return  token;   

}



const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
