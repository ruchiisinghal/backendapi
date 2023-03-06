const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  otp:{
    type:password,
    required: true,
    
  }
});

module.exports = mongoose.model("User", userSchema);
