const User = require('../models/User')

// 1. Get logged-in user's profile
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(user)
}

// 2. Get user's watchlist
exports.getWatchlist = async (req, res) => {
  const user = await User.findById(req.user.id)
  res.json(user.watchlist)
}

// 3. Add to watchlist
exports.addToWatchlist = async (req, res) => {
  const { movieId } = req.body
  const user = await User.findById(req.user.id)

  if (user.watchlist.includes(movieId)) {
    return res.status(400).json({ message: 'Movie already in watchlist' })
  }

  user.watchlist.push(movieId)
  await user.save()

  res.json(user.watchlist)
}

// 4. Remove from watchlist
exports.removeFromWatchlist = async (req, res) => {
  const { movieId } = req.params
  const user = await User.findById(req.user.id)

  user.watchlist = user.watchlist.filter((id) => id != movieId)
  await user.save()

  res.json(user.watchlist)
}
