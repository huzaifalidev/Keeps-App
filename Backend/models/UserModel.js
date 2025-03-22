const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
  userId:{
    type:String,
    required:true,
    unique:true,
    default: function () {
      const num = Math.floor(Math.random() * 900000) + 100000;
      return "user-"+num;
    },
  },
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    trim:true,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
  },
},{
timeStamps:true,
});

module.exports = mongoose.model('User', userSchema);