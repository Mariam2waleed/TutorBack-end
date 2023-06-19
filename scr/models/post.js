const mongoose = require('mongoose');


const post = mongoose.Schema({
  name: {type : String, required: true},
  price : Number,
  desc : String
})

module.exports = mongoose.model('POST', post);

