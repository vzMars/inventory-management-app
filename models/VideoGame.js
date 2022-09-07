const mongoose = require('mongoose');

const VideoGameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'available',
    enum: ['available', 'sold'],
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Video Game', VideoGameSchema);
