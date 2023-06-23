const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['student', 'tutor', 'admin'],
  },
  password: {
    type: String,
    required: true,
  },
  school_system: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (value) {
          return value.length === 2;
        },
        message: 'Coordinates must contain exactly two elements (longitude and latitude).',
      },
    },
  },
  phone_number: {
    type: String,
    required: true,
    minlength: 11,
  },
  age: {
    type: Number,
    required: true,
  },
  jwtToken: {
    type: String,
  },
  image: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const lastUser = await this.constructor.findOne({}, {}, { sort: { id: -1 } });
    const newId = (lastUser && lastUser.id + 1) || 1;
    this.id = newId;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
