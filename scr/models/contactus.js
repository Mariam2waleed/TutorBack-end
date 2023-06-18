const mongoose = require('mongoose');


const ContactUS = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
  });


  module.exports = mongoose.model('ContactUS', ContactUS);
