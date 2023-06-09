const mongoose= require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema ({
    id: {type: Number, uniqe: true},
    fname: {type: String, require: true},
    lname: {type: String, require: true},
    email: {type: String, require: true, unique:true, minlength: 5, maxlength: 255},
    gender: {type: String, enum: ['male', 'female']},
    role: {type: String, require: true,  enum: ['student', 'teacher', 'admin']},
    password: {type: String, require: true, minlength:8, maxlength: 1024},
    school_system: {type: String, require: true},
     //////Menna
    location: {
      type: {type: String, default: "Point", enum: ["Point"]},
      coordinates: {
        type: [Number], // Array of numbers
        required: true,
        validate: {
          validator: function (value) {
            return value.length === 2; // Require exactly two elements
          },
          message:
            "Coordinates must contain exactly two elements (longitude and latitude).",
           },
        },
    },
    age: {type: Number, require: true},
    profileImage: {type: String},
    phone_number: {type: Number, require: true, minlength: 11},
    jwtToken: {type: String},
}))

function userValidate(user) {
    const Schema = {
        email: Joi.String().min(5).max(255).require(),
        password: Joi.String().min(8).max(58).require(),
    }
}

exports.User = User;
exports.userValidate = userValidate;