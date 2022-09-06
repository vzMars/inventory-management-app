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
  console: {
    type: String,
    required: true,
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
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
});

module.exports = mongoose.model('Video Game', VideoGameSchema);
