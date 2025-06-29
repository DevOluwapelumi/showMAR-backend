const User = require('../models/User')

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get Watchlist
exports.getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.json(user.watchlist)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Add Movie to Watchlist
exports.addToWatchlist = async (req, res) => {
  const { movieId } = req.body
  try {
    const user = await User.findById(req.user.id)

    const exists = user.watchlist.some((id) => id == movieId)
    if (exists) {
      return res.status(400).json({ message: 'Movie already in watchlist' })
    }

    user.watchlist.push(movieId)
    await user.save()

    res.status(201).json({ message: 'Movie added to watchlist', watchlist: user.watchlist })
  } catch (err) {
    res.status(500).json({ message: 'Failed to add movie', error: err.message })
  }
}

// Remove Movie from Watchlist
exports.removeFromWatchlist = async (req, res) => {
  const { movieId } = req.params
  try {
    const user = await User.findById(req.user.id)

    user.watchlist = user.watchlist.filter((id) => id != movieId)
    await user.save()

    res.json({ message: 'Removed from watchlist', watchlist: user.watchlist })
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove movie', error: err.message })
  }
}
