const mongoose = require('mongoose'); // Erase if already required
const validator = require('validator');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please provide us your firstname.']
  },
  lastname: {
    type: String,
    required: [true, 'Please provide us your lastname.']
  },
  email: {
    type: String,
    required: [true, 'Please provide us your email.'],
    unique: true,
    index: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide us valid email.']
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Please provide a password.'],
    minlength: [6, 'Password must be equal or more than 6 character.']
  },
  registeredAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date
  }
});

// Encrypt Password Before Saving In Database
userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare Password
userSchema.methods.comparePassword = (candidatePassword, userPassword) => {
  return bcrypt.compare(candidatePassword, userPassword);
};

//Export The Model
module.exports = mongoose.model('User', userSchema);
