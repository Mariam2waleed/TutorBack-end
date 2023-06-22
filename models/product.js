const mongoose = require('mongoose');


const product = mongoose.Schema({
  name: {type : String, required: true},
  price : Number,
  desc : String
})

module.exports = mongoose.model('PRODUCT', product);

