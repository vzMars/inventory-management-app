const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
});

module.exports = mongoose.model('Genre', GenreSchema);
