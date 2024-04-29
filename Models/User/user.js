const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
      type: String,
      max: 50,
      unique: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      maxlength: [1024, "Password cannot exceed 1024 characters"],
      select: false,
    },
   username:{
    type: String, default:null

   },
   Description :{
    type: String, default:null
   },
    
});

module.exports = mongoose.model("User", userSchema);