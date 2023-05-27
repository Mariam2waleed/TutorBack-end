const mongoose = require('mongoose');


const tutorSchema = new mongoose.Schema({
  name: String,
  email: String,
  bio: String,
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;