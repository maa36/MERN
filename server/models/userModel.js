const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String, required: true, 
    // unique: true, index: true, dropDups: true,
  },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

const userModel = module.exports = mongoose.model('User', userSchema);

module.exports.get = function (callback, limit) {
    userModel.find(callback).limit(limit); 
 }