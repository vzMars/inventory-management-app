const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  displayname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
UserSchema.statics.signup = async function (
  username,
  email,
  password,
  confirmPassword
) {
  if (!username || !email || !password || !confirmPassword) {
    throw Error('All fields must be filled');
  }

  if (!validator.isLength(username, { min: 3, max: 20 })) {
    throw Error(`Username is too ${username.length < 3 ? 'short' : 'long'}`);
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }

  if (password !== confirmPassword) {
    throw Error('Passwords do not match');
  }

  const existingUser = await this.findOne({
    $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
  });

  if (existingUser) {
    throw Error('Account with that email or username already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    displayname: username,
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: hash,
  });

  return user;
};

// Helper method for validating user's password.
UserSchema.methods.comparePassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

module.exports = mongoose.model('User', UserSchema);
