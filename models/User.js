const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
      name: { type: String }, // optional full name
    password: { type: String, required: true },
    favorites: [Number],
    watchlist: [Number],
    avatarUrl: { type: String, default: '' }, // path to avatar image
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
