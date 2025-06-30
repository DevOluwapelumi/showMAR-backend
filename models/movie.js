const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  popularity: {
    type: Number,
    default: 0,
  },
  posterUrl: {
    type: String,
  },
  description: {
    type: String,
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Movie', movieSchema)
