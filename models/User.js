const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

// Password hash middleware
UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

// Helper method for validating user's password.
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const match = await bcrypt.compare(candidatePassword, this.password);
  return match;
};

module.exports = mongoose.model('User', UserSchema);
