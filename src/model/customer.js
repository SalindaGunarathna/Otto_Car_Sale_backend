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

 

const UserShema = new Schema({
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

  role :{
    type:String,
    enum:["Admin","Customer"],
    required:true,

  },

  tokens: [{
    token: String
  }] 
});


UserShema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12)
  }
  if (!user.tokens || !Array.isArray(user.tokens)) {
    user.tokens = [];
  } 
  next();
})

userShema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  console.log(user)
  console.log(password)
  console.log(user.password)   

  if (!user) {
    throw new Error('Unable to login. User not found.');
  }

  const isMatch = await bcrypt.compare(password, user.password)

  console.log(isMatch)

  if (!isMatch) {
    throw new Error('Unable to login. Incorrect password.');
  }

  return User;
};

userShema.methods.generateAuthToken = async function () {
  const user = this;
  const token =  jwt.sign({_id : user._id.toString()},SECRET_KEY)
   user.tokens = user.tokens.concat({token})
   await user.save()

   console.log("user.tokens")

   return  token;   

}



const User = mongoose.model('Users', UserShema);
module.exports = User;
