const mongoose = require('mongoose');
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

///////////////////////// User //////////////////////////////////
const UserModel = new mongoose.Schema({
  // id: { type: String, default: uuidv4, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true, minlength: 5,  maxlength: 255 },
  gender: { type: String, enum: ['male', 'female'] },
  role: { type: String, required: true, enum: ['student', 'teacher', 'admin'] },
  password: { type: String, required: true, minlength: 8, maxlength: 1024 },
  school_system: { type: String, required: true },
  location: {
    type: { type: String, default: 'Point', enum: ['Point'] },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (value) {
          return value.length === 2;
        },
        message:
        'Coordinates must contain exactly two elements (longitude and latitude).',
      },
    },
  },
  age: { type: Number, required: true },
  profileImage: { type: String },
  phone_number: { type: Number, required: true, minlength: 11 },
  jwtToken: { type: String },
  isAdmin: { type: Boolean, default: true }
});

///////////////////////// User Validation //////////////////////////////////
function userValidate(user) {
  const schema = Joi.object({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    email: Joi.string().min(5).max(255).required().email(),
    gender: Joi.string().valid('male', 'female'),
    role: Joi.string().valid('student', 'teacher', 'admin').required(),
    password: Joi.string().min(8).max(1024).required(),
    school_system: Joi.string().required(),
    location: Joi.object({
      type: Joi.string().valid('Point').default('Point'),
      coordinates: Joi.array().items(Joi.number()).required().length(2),
    }),
    age: Joi.number().required(),
    profileImage: Joi.string(),
    phone_number: Joi.number().min(11).required(),
    jwtToken: Joi.string(),
  });
  return schema.validate(user);
}

///////////////////////// Teacher //////////////////////////////////
// const TeacherModel = new mongoose.Schema({
//   state: { type: Schema.Types.ObjectId, required: true, ref: 'Subject' },
//   user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
//   rating: { type: Number },
//   certificate: [{ type: String }],
// })

///////////////////////// Student //////////////////////////////////
// const StudentModel = new mongoose.Schema({

// })




module.exports = {
  User: mongoose.model('User', UserModel),
  userValidate: userValidate,

  // Teacher: mongoose.model('Teacher', TeacherModel),
  // Student: mongoose.model('Student', StudentModel),
};
